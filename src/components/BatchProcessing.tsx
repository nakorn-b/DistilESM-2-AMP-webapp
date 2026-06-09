import { useRef, useState, type ChangeEvent } from 'react';
import type { Analysis } from '../types';

interface BatchProcessingProps {
  recentAnalyses: Analysis[];
  handleBatchPredict: (file: File) => {};
  isPredicting?: boolean;
}

const BatchProcessing = ({ recentAnalyses, handleBatchPredict, isPredicting }: BatchProcessingProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleExportResults = () => {
    if (recentAnalyses.length === 0) return;

    const headers = ['Analysis ID', 'Sequence Metadata', 'Classification', 'Confidence Score', 'Timestamp'];
    const csvRows = recentAnalyses.map(item => [
      item.id,
      `"${item.name}"`,
      item.predictedClass,
      (item.ampProbability * 100).toFixed(2) + '%',
      item.timestamp
    ]);

    const csvContent = [headers, ...csvRows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `amp_analysis_results_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-4 mb-4 sm:mb-6 text-primary shrink-0">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-outline-variant">
          <span className="material-symbols-outlined text-2xl">folder_zip</span>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-sans">Batch Analysis</h2>
          <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-bold opacity-40 uppercase tracking-[0.15em] font-sans">High-Throughput Sequence Classification</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
        <div className="lg:col-span-4 bg-white border border-outline-variant rounded-lg p-6 flex flex-col shadow-sm lg:h-full min-h-0 shrink-0 lg:shrink">
          <div className="text-center mb-6 shrink-0">
            <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center mb-3 mx-auto border border-outline-variant/10">
              <span className="material-symbols-outlined text-2xl text-tertiary">cloud_upload</span>
            </div>
            <div className="text-sm font-bold text-primary tracking-tight uppercase mb-0.5 font-sans">Dataset Upload</div>
            <p className="text-[9px] text-on-surface-variant font-bold opacity-40 uppercase tracking-widest font-sans">Select Peptide CSV File</p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv" 
            className="hidden" 
          />
          
          <div 
            onClick={handleBrowseClick}
            className={`cursor-pointer mb-6 p-5 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 group shrink-0 ${
              selectedFile 
                ? 'border-tertiary/40 bg-tertiary/5' 
                : 'border-outline-variant hover:border-tertiary/40 hover:bg-surface-container-low'
            }`}
          >
            {selectedFile ? (
              <>
                <span className="material-symbols-outlined text-tertiary text-xl">description</span>
                <span className="text-[10px] font-bold text-primary truncate max-w-full px-2 font-sans">{selectedFile.name}</span>
                <button className="text-[8px] font-bold text-tertiary uppercase tracking-widest hover:underline font-sans">Change File</button>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl text-on-surface-variant/30 group-hover:text-tertiary transition-colors">upload_file</span>
                <span className="text-[9px] font-bold text-on-surface-variant/50 group-hover:text-primary transition-colors uppercase tracking-[0.15em] font-sans">Browse Filesystem</span>
              </>
            )}
          </div>
          
          <div className="space-y-6 mb-8 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar lg:max-h-none max-h-[300px]">
            <div className="space-y-4">
              <div className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-[0.2em] mb-4 font-sans">Input Specification</div>
              
              <ul className="space-y-4">
                <li className="flex items-center text-center  gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">check_circle</span>
                 
                    <p className="text-[11px] text-primary font-bold uppercase tracking-wider font-sans">Standard CSV</p>
                  
                </li>

                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary text-sm mt-0.5">check_circle</span>
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-primary font-bold uppercase tracking-wider font-sans">Required Column</p>
                    <p className="text-[10px] text-on-surface-variant/70 font-bold leading-normal uppercase font-sans">Must include "sequence" header</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <button 
            disabled={!selectedFile || isPredicting}
            className={`btn w-full h-10 shrink-0 rounded-lg font-bold text-[11px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 font-sans ${
              selectedFile && !isPredicting
                ? 'btn-primary' 
                : 'bg-surface-container-highest text-on-surface/20 cursor-not-allowed border border-outline-variant'
            }`}
            onClick={() => selectedFile && handleBatchPredict(selectedFile)}
          >
            {isPredicting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                Analyzing Dataset...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                Start Batch Analysis
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-8 bg-white border border-outline-variant rounded-lg shadow-sm flex flex-col overflow-hidden lg:h-full min-h-[400px]">
          <div className="px-8 py-5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-lowest/30 shrink-0">
            <div className="text-[10px] font-bold text-primary opacity-40 tracking-[0.2em] uppercase font-sans">Analysis History</div>
            <button 
              onClick={handleExportResults}
              disabled={recentAnalyses.length === 0}
              className="h-9 px-5 rounded-lg bg-primary text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              <span className="material-symbols-outlined text-xs">download</span>
              Export Results
            </button>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-primary/40 tracking-[0.15em] uppercase border-b border-outline-variant/30 font-sans">Sequence Metadata</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-primary/40 tracking-[0.15em] uppercase border-b border-outline-variant/30 font-sans">Classification</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-primary/40 tracking-[0.15em] uppercase border-b border-outline-variant/30 text-right font-sans">Confidence Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {recentAnalyses.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`transition-colors group ${index % 2 === 1 ? 'bg-surface-container-low/30' : 'bg-white'} hover:bg-tertiary/[0.04]`}
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 shrink-0"></div>
                        <div className="flex flex-col">
                          <span 
                            className="font-mono text-[11px] font-bold text-primary truncate max-w-[200px] md:max-w-[300px]"
                            title={item.name}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded border text-[9px] font-bold tracking-widest uppercase font-sans ${item.predictedClass === 'Antimicrobial' ? 'bg-tertiary/5 text-tertiary border-tertiary/20' : 'bg-on-surface-variant/5 text-on-surface-variant border-outline-variant/50'}`}>
                        {item.predictedClass}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="font-mono text-[11px] font-bold text-primary tabular-nums">{(item.ampProbability * 100).toFixed(2)}%</span>
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
