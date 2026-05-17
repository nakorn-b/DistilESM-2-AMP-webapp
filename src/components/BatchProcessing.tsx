import React from 'react';
import type { Analysis } from '../types';

interface BatchProcessingProps {
  recentAnalyses: Analysis[];
}

const BatchProcessing = ({ recentAnalyses }: BatchProcessingProps) => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-12 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-12 text-primary shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
          <span className="material-symbols-outlined text-3xl">folder_zip</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight">Batch Processing</h2>
      </div>

      <div className="grid lg:grid-cols-4 gap-10 flex-1">
        <div className="card h-full min-h-[360px] flex flex-col items-center justify-center p-10 text-center border-dashed border-2 rounded-[2.5rem] bg-white shadow-sm shrink-0 lg:shrink group hover:border-tertiary transition-colors duration-500">
          <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <span className="material-symbols-outlined text-4xl text-tertiary">cloud_upload</span>
          </div>
          <div className="text-lg font-black mb-2 text-primary tracking-tight">Drop Metadata / CSV</div>
          <button className="text-tertiary font-black mb-6 hover:underline text-xs tracking-widest uppercase opacity-70">Browse Local Drive</button>
          <div className="text-[10px] text-on-surface-variant opacity-60 leading-relaxed mb-8 flex-1 font-bold tracking-wider">SUPPORTED: .CSV, .XLSX, .FASTA<br/>MAX BATCH: 50,000 PEPTIDES</div>
          <div className="w-full pt-8 border-t border-outline-variant/30 shrink-0">
            <button className="btn bg-primary text-white w-full h-14 rounded-2xl hover:bg-primary/90 font-black text-xs tracking-widest shadow-xl shadow-primary/10 uppercase">Upload & Initialize</button>
          </div>
        </div>

        <div className="lg:col-span-3 card rounded-[2.5rem] bg-white border-outline-variant shadow-sm flex flex-col h-full min-h-[460px] overflow-hidden">
          <div className="px-10 py-8 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-lowest shrink-0">
            <div className="label-md text-[10px] font-black text-primary opacity-40 tracking-[0.2em] uppercase">Historical Repository</div>
            <button className="h-10 px-6 rounded-xl bg-primary text-white text-[11px] font-black tracking-widest uppercase flex items-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-sm">download</span>
              Download Dataset
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-auto flex-1 bg-white p-2">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-primary opacity-30 tracking-[0.2em] uppercase border-b border-outline-variant/30">Target Sequence</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary opacity-30 tracking-[0.2em] uppercase border-b border-outline-variant/30">Inference result</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary opacity-30 tracking-[0.2em] uppercase border-b border-outline-variant/30 text-right">Probability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {recentAnalyses.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-8 py-6 text-[11px] font-mono font-bold text-on-surface-variant flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-outline-variant opacity-50"></div>
                      {item.id}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${item.predictedClass === 'Antimicrobial' ? 'bg-tertiary/10 text-tertiary' : 'bg-on-surface-variant/5 text-on-surface-variant opacity-60'}`}>
                        {item.predictedClass}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-mono font-black text-right text-primary">{(item.ampProbability).toFixed(4)}</td>
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
