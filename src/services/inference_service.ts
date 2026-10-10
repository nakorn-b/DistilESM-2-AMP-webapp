import * as ort from 'onnxruntime-web';

// Files in public/ are served from the site root, so build the URL from BASE_URL
// rather than a source-relative path.
const MODEL_URL = `${import.meta.env.BASE_URL}model/model.onnx`;

// ESM-2 vocab, from public/model/vocab.txt (line number = token id).
const CLS_ID = 0;
const PAD_ID = 1;
const EOS_ID = 2;
const AA_TO_ID: Record<string, number> = {
    L: 4, A: 5, G: 6, V: 7, S: 8, E: 9, R: 10, T: 11, I: 12, D: 13,
    P: 14, K: 15, Q: 16, N: 17, F: 18, Y: 19, M: 20, H: 21, W: 22, C: 23,
};

// max_position_embeddings is 1026: 1024 residues + <cls> + <eos>.
const MAX_RESIDUES = 1024;

// Model output index 1 is AMP (verified against PyTorch on known AMPs).
const AMP_INDEX = 1;

let sessionPromise: Promise<ort.InferenceSession> | null = null;

function getSession() {
    sessionPromise ??= ort.InferenceSession.create(MODEL_URL);
    return sessionPromise;
}

function cleanSequence(sequence: string) {
    const cleaned = sequence.replace(/\s+/g, '').toUpperCase(); // remove all spaces
    if (!cleaned || !/^[ACDEFGHIKLMNPQRSTVWY]+$/.test(cleaned)) {
        throw new Error('Invalid Sequence: Input contains non-standard amino acids.');
    }
    return cleaned.slice(0, MAX_RESIDUES);
}

// Tokenizes sequences into [batch, maxLen] int64 tensors, right-padding with <pad>.
function encode(sequences: string[]) {
    const maxLen = Math.max(...sequences.map((s) => s.length)) + 2;
    const inputIds = new BigInt64Array(sequences.length * maxLen).fill(BigInt(PAD_ID));
    const attentionMask = new BigInt64Array(sequences.length * maxLen);

    sequences.forEach((seq, row) => {
        const ids = [CLS_ID, ...Array.from(seq, (aa) => AA_TO_ID[aa]), EOS_ID];
        ids.forEach((id, col) => {
            inputIds[row * maxLen + col] = BigInt(id);
            attentionMask[row * maxLen + col] = 1n;
        });
    });

    const dims = [sequences.length, maxLen];
    return {
        input_ids: new ort.Tensor('int64', inputIds, dims),
        attention_mask: new ort.Tensor('int64', attentionMask, dims),
    };
}

function softmax(logits: number[]) {
    const max = Math.max(...logits);
    const exps = logits.map((x) => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((x) => x / sum);
}

export async function predict(sequences: string[]) {
    const cleaned = sequences.map(cleanSequence);
    const session = await getSession();
    const { logits } = await session.run(encode(cleaned));

    const data = logits.data as Float32Array;
    const numLabels = logits.dims[1];
    return cleaned.map((_, row) => {
        const probs = softmax(Array.from(data.subarray(row * numLabels, (row + 1) * numLabels)));
        const ampProbability = probs[AMP_INDEX];
        return {
            prediction: ampProbability >= 0.5 ? 'AMP' : 'Non-AMP',
            confidence: ampProbability,
        };
    });
}

export async function inference_single_sequence(sequence_string: string) {
    const [result] = await predict([sequence_string]);
    return result;
}

// Splits one CSV line, honoring double-quoted fields that contain commas.
function parseCsvLine(line: string) {
    const fields: string[] = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"' && line[i + 1] === '"') { field += '"'; i++; }
            else if (ch === '"') inQuotes = false;
            else field += ch;
        } else if (ch === '"') inQuotes = true;
        else if (ch === ',') { fields.push(field); field = ''; }
        else field += ch;
    }
    fields.push(field);
    return fields;
}

// Sequences per session.run; keeps padding and memory bounded for large files.
const BATCH_SIZE = 32;

export async function inference_batch(file: File) {
    const lines = (await file.text()).split(/\r?\n/).filter((l) => l.trim());
    const header = parseCsvLine(lines[0] ?? '').map((h) => h.trim().toLowerCase());
    const column = header.indexOf('sequence');
    if (column === -1) {
        throw new Error('Invalid Batch: CSV must have a "sequence" column.');
    }

    const sequences = lines.slice(1).map((l) => parseCsvLine(l)[column]?.trim() ?? '');
    const results: { sequence: string; class: string; confidence: number }[] = [];
    for (let i = 0; i < sequences.length; i += BATCH_SIZE) {
        const chunk = sequences.slice(i, i + BATCH_SIZE);
        const predictions = await predict(chunk).catch((error: Error) => {
            if (!error.message.startsWith('Invalid Sequence')) throw error;
            throw new Error(`Invalid Batch: One or more sequences in rows ${i + 1}-${i + chunk.length} contain non-standard amino acids.`);
        });
        predictions.forEach((p, j) => {
            results.push({ sequence: chunk[j], class: p.prediction, confidence: p.confidence });
        });
    }
    return results;
}
