const secondaryCards = [
  { id: 'pretraining', label: 'Pre-training', value: '8M', caption: 'UniRef50 Sequences' },
  { id: 'finetuning', label: 'Fine-tuning', value: '18,807', caption: 'Experimental AMPs' },
  { id: 'modelsize', label: 'Model Size', value: '14.56 MB', caption: 'On-Disk Checkpoint' },
  {
    id: 'parameters',
    label: 'Parameters',
    value: '3.81M',
    caption: 'Distilled Transformer',
    note: "Reduced from the ESM-2 teacher's 7.62M parameters via knowledge distillation",
  },
];

const architectureRows = [
  { id: 'embedding', label: 'Embedding', value: '320', unit: 'Hidden Size' },
  { id: 'attention', label: 'Attention', value: '20', unit: 'Heads' },
  { id: 'contextlength', label: 'Context', value: '512', unit: 'Amino Acids' },
  {
    id: 'layers',
    label: 'Layers',
    value: '3',
    unit: 'of 6, Distilled',
    note: 'Three-layer student distilled from the six-layer ESM-2 teacher',
  },
];

const TooltipLabel = ({ id, note, className, children }: { id: string; note?: string; className: string; children: React.ReactNode }) => (
  <>
    <span
      className={`${className} ${note ? 'border-b border-dotted border-on-surface-variant/50 cursor-help w-fit' : ''}`}
      tabIndex={note ? 0 : undefined}
      title={note}
      aria-describedby={note ? `${id}-definition` : undefined}
    >
      {children}
    </span>
    {note && <span id={`${id}-definition`} className="sr-only">{note}</span>}
  </>
);

const StatCard = ({ card }: { card: { id: string; label: string; value: string; caption: string; note?: string } }) => (
  <div className="bg-white p-6 sm:p-8 rounded-lg border border-outline-variant">
    <TooltipLabel id={card.id} note={card.note} className="block text-[10px] font-bold text-on-surface-variant mb-3 uppercase tracking-[0.2em] font-sans">
      {card.label}
    </TooltipLabel>
    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-primary tracking-tight tabular-nums font-sans">
      {card.value}
    </div>
    <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold uppercase tracking-widest font-sans">{card.caption}</p>
  </div>
);

const SpecRow = ({ row }: { row: { id: string; label: string; value: string; unit: string; note?: string } }) => (
  <div className="px-8 py-4 flex items-center justify-between gap-4">
    <TooltipLabel id={row.id} note={row.note} className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
      {row.label}
    </TooltipLabel>
    <span className="text-sm font-bold text-primary tabular-nums text-right whitespace-nowrap">
      {row.value}
      <span className="ml-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{row.unit}</span>
    </span>
  </div>
);

const ModelMetadata = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-10 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-10 text-primary shrink-0">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-outline-variant/50">
          <span className="material-symbols-outlined text-2xl">description</span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight uppercase leading-none font-sans">Technical Metadata</h2>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1 font-sans">Model Architecture & Benchmarks</span>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-outline-variant mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans">
        <div>
          <TooltipLabel id="mcc" note="Matthews Correlation Coefficient, averaged across 5 random seeds" className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-[0.2em]">
            Test MCC (n=5)
          </TooltipLabel>
          <p className="text-[10px] leading-relaxed text-on-surface-variant font-bold uppercase tracking-widest">Cross-Seed Robustness</p>
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-4xl sm:text-5xl font-bold text-primary tracking-tight tabular-nums">0.9495</span>
          <span className="text-sm font-bold text-on-surface-variant tracking-normal">±0.0066</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 shrink-0 mb-8">
        {secondaryCards.map((card) => (
          <StatCard key={card.id} card={card} />
        ))}
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-10 font-sans">
        <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-6">Architectural Overview</div>
        <p className="text-primary font-medium text-lg md:text-xl leading-[1.6] max-w-2xl font-serif mb-8">
          DistilESM-2-AMP is trained via knowledge distillation from the ESM-2 teacher (facebook/esm2_t6_8M_UR50D): a three-layer student is initialized from selected teacher weights and optimized with a weighted combination of masked-language-modeling and distillation loss, halving transformer depth and parameter count while retaining near-teacher classification performance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant border-t border-outline-variant">
          {architectureRows.map((row) => (
            <SpecRow key={row.id} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelMetadata;
