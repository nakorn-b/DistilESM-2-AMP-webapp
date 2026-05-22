const ModelMetadata = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-10 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-10 text-primary shrink-0">
        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-outline-variant/30">
          <span className="material-symbols-outlined text-2xl">description</span>
        </div>
        <h2 className="text-2xl font-black tracking-tight uppercase">Technical Metadata</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0 mb-8">
        <div className="bg-white p-8 rounded-xl border border-outline-variant hover:border-tertiary transition-colors">
          <div className="text-[10px] font-black text-tertiary mb-3 uppercase tracking-[0.2em] opacity-70">Training Dataset</div>
          <div className="text-4xl font-black mb-2 text-primary tracking-tighter italic font-jakarta">14,200+</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">Experimental Sequences</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl border border-outline-variant hover:border-tertiary transition-colors">
          <div className="text-[10px] font-black text-tertiary mb-3 uppercase tracking-[0.2em] opacity-70">Base Topology</div>
          <div className="text-4xl font-black mb-2 text-primary tracking-tighter italic font-jakarta">ESM-2</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">650M Transformer</p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-outline-variant hover:border-tertiary transition-colors">
          <div className="text-[10px] font-black text-tertiary mb-3 uppercase tracking-[0.2em] opacity-70">Validation MCC</div>
          <div className="text-4xl font-black mb-2 text-primary tracking-tighter italic font-jakarta">0.968</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">Global Accuracy Score</p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-outline-variant hover:border-tertiary transition-colors">
          <div className="text-[10px] font-black text-tertiary mb-3 uppercase tracking-[0.2em] opacity-70">Inference Mean</div>
          <div className="text-4xl font-black mb-2 text-primary tracking-tighter italic font-jakarta">120ms</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">Latency Per Sequence</p>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant rounded-xl p-10 flex-1 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        
        <div className="max-w-4xl relative z-10">
          <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-6">Architectural Overview</div>
          <p className="text-primary font-bold text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            DistilESM-2-AMP employs a specialized distillation method where the complex attention mechanisms of ESM-2 are compressed into efficient inference heads, optimized for rapid screening.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-black uppercase text-tertiary tracking-widest opacity-80">Embedding</div>
              <div className="text-sm font-black text-primary font-jakarta">Hidden Size: 1280</div>
              <div className="h-0.5 bg-tertiary/10 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-black uppercase text-tertiary tracking-widest opacity-80">Attention</div>
              <div className="text-sm font-black text-primary font-jakarta">Heads: 4 (Distilled)</div>
              <div className="h-0.5 bg-tertiary/10 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-black uppercase text-tertiary tracking-widest opacity-80">Context</div>
              <div className="text-sm font-black text-primary font-jakarta">L-Max: 1024 AA</div>
              <div className="h-0.5 bg-tertiary/10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetadata;
