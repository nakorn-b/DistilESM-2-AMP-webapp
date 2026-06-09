const ModelMetadata = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-10 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-10 text-primary shrink-0">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-outline-variant/50">
          <span className="material-symbols-outlined text-2xl">description</span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight uppercase leading-none font-sans">Technical Metadata</h2>
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mt-1 font-sans">Model Architecture & Benchmarks</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0 mb-12">
        <div className="bg-white p-8 rounded-lg border border-outline-variant hover:border-tertiary/50 transition-all duration-300 group">
          <div className="text-[10px] font-bold text-tertiary mb-3 uppercase tracking-[0.2em] font-sans">Pre-training</div>
          <div className="text-4xl font-bold mb-2 text-primary tracking-tight tabular-nums group-hover:text-tertiary transition-colors font-sans">8M</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-60 uppercase tracking-widest font-sans">UniRef50 Sequences</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg border border-outline-variant hover:border-tertiary/50 transition-all duration-300 group">
          <div className="text-[10px] font-bold text-tertiary mb-3 uppercase tracking-[0.2em] font-sans">Fine-tuning</div>
          <div className="text-4xl font-bold mb-2 text-primary tracking-tight tabular-nums group-hover:text-tertiary transition-colors font-sans">18,000+</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-60 uppercase tracking-widest font-sans">Experimental AMPs</p>
        </div>

        <div className="bg-white p-8 rounded-lg border border-outline-variant hover:border-tertiary/50 transition-all duration-300 group">
          <div className="text-[10px] font-bold text-tertiary mb-3 uppercase tracking-[0.2em] font-sans">Model Size</div>
          <div className="text-4xl font-bold mb-2 text-primary tracking-tight tabular-nums group-hover:text-tertiary transition-colors font-sans">13.4 MB</div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-60 uppercase tracking-widest font-sans">650M Transformer</p>
        </div>

        <div className="bg-white p-8 rounded-lg border border-outline-variant hover:border-tertiary/50 transition-all duration-300 group">
          <div className="text-[10px] font-bold text-tertiary mb-3 uppercase tracking-[0.2em] font-sans">Test MCC (n=5)</div>
          <div className="text-4xl font-bold mb-2 text-primary tracking-tight tabular-nums flex items-baseline gap-1 group-hover:text-tertiary transition-colors font-sans">
            0.9760
            <span className="text-xs font-bold text-on-surface-variant/50 tracking-normal">±0.0025</span>
          </div>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold opacity-60 uppercase tracking-widest font-sans">Cross-Seed Robustness</p>
        </div>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-10 flex-1 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-4xl relative z-10">
          <div className="text-[10px] font-bold text-tertiary uppercase tracking-[0.3em] mb-6 font-sans">Architectural Overview</div>
          <p className="text-primary font-medium text-lg md:text-xl leading-[1.6] mb-12 max-w-2xl font-serif">
            DistilESM-2-AMP employs a specialized distillation method where the complex attention mechanisms of ESM-2 are compressed into efficient inference heads, optimized for rapid screening.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col gap-3">
              <div className="text-[10px] font-bold uppercase text-on-surface-variant/50 tracking-widest font-sans">Embedding</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-primary tabular-nums font-sans">384</span>
                <span className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-tight font-sans">Hidden Size</span>
              </div>
              <div className="h-1 bg-tertiary/10 w-full rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[30%]" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[10px] font-bold uppercase text-on-surface-variant/50 tracking-widest font-sans">Attention</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-primary tabular-nums font-sans">3</span>
                <span className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-tight font-sans">Heads</span>
              </div>
              <div className="h-1 bg-tertiary/10 w-full rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[25%]" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[10px] font-bold uppercase text-on-surface-variant/50 tracking-widest font-sans">Context</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-primary tabular-nums font-sans">1024</span>
                <span className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-tight font-sans">L-Max</span>
              </div>
              <div className="h-1 bg-tertiary/10 w-full rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[10px] font-bold uppercase text-on-surface-variant/50 tracking-widest font-sans">Layers</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-primary tabular-nums font-sans">6</span>
                <span className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-tight font-sans">Distilled</span>
              </div>
              <div className="h-1 bg-tertiary/10 w-full rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[18%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetadata;
