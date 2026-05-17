import React from 'react';

const ModelMetadata = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-12 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-12 text-primary shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
          <span className="material-symbols-outlined text-3xl">description</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight">Model Metadata</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 shrink-0 mb-12">
        <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant shadow-sm">
          <div className="label-md text-[10px] font-black text-tertiary mb-4 uppercase tracking-[0.2em] opacity-60">Training Dataset</div>
          <div className="text-4xl font-black mb-3 text-primary tracking-tighter italic">14,200+</div>
          <p className="text-[11px] leading-relaxed text-on-surface-variant font-bold opacity-50">Curated experimental sequences from UniProt & APD3.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant shadow-sm">
          <div className="label-md text-[10px] font-black text-tertiary mb-4 uppercase tracking-[0.2em] opacity-60">Base Topology</div>
          <div className="text-4xl font-black mb-3 text-primary tracking-tighter italic">ESM-2</div>
          <p className="text-[11px] leading-relaxed text-on-surface-variant font-bold opacity-50">Fine-tuned evolutionary scale transformer (650M).</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant shadow-sm">
          <div className="label-md text-[10px] font-black text-tertiary mb-4 uppercase tracking-[0.2em] opacity-60">Validation MCC</div>
          <div className="text-4xl font-black mb-3 text-primary tracking-tighter italic">0.968</div>
          <p className="text-[11px] leading-relaxed text-on-surface-variant font-bold opacity-50">Matthews Correlation Coefficient (Global Accuracy).</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant shadow-sm">
          <div className="label-md text-[10px] font-black text-tertiary mb-4 uppercase tracking-[0.2em] opacity-60">Throughput</div>
          <div className="text-4xl font-black mb-3 text-primary tracking-tighter italic">120ms</div>
          <p className="text-[11px] leading-relaxed text-on-surface-variant font-bold opacity-50">Mean inference latency per 30-mer peptide.</p>
        </div>
      </div>

      <div className="bg-surface-container-low p-12 rounded-[3rem] border border-outline-variant shadow-inner flex-1 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="max-w-4xl mx-auto text-center md:text-left relative z-10">
          <div className="label-md mb-6 text-[10px] font-black text-primary opacity-40 uppercase tracking-[0.3em]">Architectural Overview</div>
          <p className="text-primary font-bold text-lg md:text-xl leading-relaxed mb-8">
            DistilESM-2-AMP employs a specialized distillation method where the complex attention mechanisms of ESM-2 are compressed into efficient inference heads.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-1">
              <div className="text-[10px] font-black uppercase text-tertiary tracking-widest">Embedding</div>
              <div className="text-sm font-black text-primary">Hidden Size: 1280</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[10px] font-black uppercase text-tertiary tracking-widest">Attention</div>
              <div className="text-sm font-black text-primary">Heads: 4 (Distilled)</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[10px] font-black uppercase text-tertiary tracking-widest">Context</div>
              <div className="text-sm font-black text-primary">L-Max: 1024 AA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetadata;
