const apiURL = import.meta.env.VITE_INFERENCE_API_URL;

export async function inference_single_sequence(sequence_string: string) {
    const response = await fetch(`${apiURL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({sequence: sequence_string})
    });

    if (!response.ok) {
        if (response.status === 422) {
            throw new Error('Invalid Sequence: Input contains non-standard amino acids.');
        }
        throw new Error(`Inference failed with status: ${response.status}`);
    }

    let response_json = await response.json()
    console.log(response_json)
    return response_json
}

export async function inference_batch(file: File) {
    const formData = new FormData();
    formData.append('file', file)

    const response = await fetch(`${apiURL}/predict_batch`, {
        method: 'POST',
        body: formData
    })

    if (!response.ok) {
        if (response.status === 422) {
            throw new Error('Invalid Batch: One or more sequences contain non-standard amino acids.');
        }
        let errorData = await response.text()
        throw new Error(errorData || `Batch inference failed with status: ${response.status}`);
    }

    return response
}
