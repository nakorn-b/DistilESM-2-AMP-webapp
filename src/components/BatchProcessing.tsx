import type { Analysis } from '../types';

interface BatchProcessingProps {
  recentAnalyses: Analysis[];
}

const BatchProcessing = ({ recentAnalyses }: BatchProcessingProps) => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-10 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-8 text-primary shrink-0">
        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-outline-variant">
          <span className="material-symbols-outlined text-2xl">folder_zip</span>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Batch Analysis</h2>
          <p className="text-[10px] text-on-surface-variant font-bold opacity-40 uppercase tracking-[0.15em]">High-Throughput Sequence Classification</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 flex-1">
        <div className="lg:col-span-4 bg-white border border-outline-variant rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:border-tertiary transition-colors group">
          <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-inner border border-outline-variant/10">
            <span className="material-symbols-outlined text-3xl text-tertiary">cloud_upload</span>
          </div>
          <div className="text-base font-black mb-1.5 text-primary tracking-tight uppercase">Import Dataset</div>
          <button className="text-tertiary font-black mb-6 hover:underline text-[9px] tracking-widest uppercase opacity-60">Browse Filesystem</button>
          
          <div className="space-y-2 mb-8 flex-1">
            <div className="text-[9px] text-on-surface-variant/50 font-black uppercase tracking-[0.15em] mb-1">Requirements</div>
            <div className="text-[10px] text-on-surface-variant font-bold leading-relaxed space-y-1">
              <p>Supported: <span className="text-primary">CSV, FASTA</span></p>
              <p>Max Batch: <span className="text-primary">50,000 Residues</span></p>
            </div>
          </div>

          <button className="btn btn-primary w-full h-12 rounded-xl font-black text-[10px] tracking-[0.2em] shadow-lg shadow-primary/10 uppercase">
            Initialize Upload
          </button>
        </div>

        <div className="lg:col-span-8 bg-white border border-outline-variant rounded-2xl shadow-sm flex flex-col overflow-hidden h-[600px]">
          <div className="px-8 py-5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-lowest/30 shrink-0">
            <div className="text-[10px] font-black text-primary opacity-40 tracking-[0.2em] uppercase">Inference History</div>
            <button className="h-9 px-5 rounded-lg bg-primary text-white text-[10px] font-black tracking-widest uppercase flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-xs">download</span>
              Export Results
            </button>
          </div>
          <div className="overflow-auto flex-1 p-1">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                <tr>
                  <th className="px-6 py-4 text-[9px] font-jakarta font-black text-primary opacity-30 tracking-[0.2em] uppercase">Inference ID</th>
                  <th className="px-6 py-4 text-[9px] font-black text-primary opacity-30 tracking-[0.2em] uppercase">Classification</th>
                  <th className="px-6 py-4 text-[9px] font-jakarta font-black text-primary opacity-30 tracking-[0.2em] uppercase text-right">Confidence Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {recentAnalyses.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                        <span className="font-jakarta text-[10px] font-black text-primary uppercase tracking-tight">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded border text-[9px] font-black tracking-widest uppercase ${item.predictedClass === 'Antimicrobial' ? 'bg-tertiary/5 text-tertiary border-tertiary/20' : 'bg-on-surface-variant/5 text-on-surface-variant border-outline-variant/50'}`}>
                        {item.predictedClass}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-jakarta text-[11px] font-black text-primary">{(item.ampProbability * 100).toFixed(2)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchProcessing;
