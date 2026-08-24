import { motion, AnimatePresence } from 'framer-motion';
import type { Analysis } from '../types';

interface SinglePredictionProps {
  sequence: string;
  setSequence: (sequence: string) => void;
  isPredicting: boolean;
  handlePredict: () => void;
  results: Analysis | null;
}

const SinglePrediction = ({ sequence, setSequence, isPredicting, handlePredict, results }: SinglePredictionProps) => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex-1 flex flex-col min-h-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 shrink-0">
        <div className="flex items-center gap-4 text-primary">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-outline-variant">
            <span className="material-symbols-outlined text-2xl">biotech</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-sans">Single Sequence Analysis</h2>
            <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-bold opacity-40 uppercase tracking-[0.15em] font-sans">DistilESM-2-AMP Inference Model</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setSequence('')}
            className="h-9 px-4 flex-1 sm:flex-initial rounded-lg bg-surface-container-low text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-surface-container-high active:scale-95 transition-all border border-outline-variant/30 font-sans"
          >
            Clear Sequence
          </button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
        <div className="lg:col-span-8 flex flex-col min-h-[400px] lg:h-full">
          <div className="mb-6 flex-1 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-2.5 shrink-0">
              <label className="block text-[10px] font-bold text-primary/50 tracking-[0.15em] uppercase font-sans">Primary Sequence Data (CSV)</label>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest font-sans">{sequence.length} residues</span>
              </div>
            </div>
            <textarea 
              className="flex-1 min-h-[300px] lg:min-h-[400px] font-mono text-sm resize-none rounded-lg p-6 bg-white border border-outline-variant shadow-sm focus:ring-2 focus:ring-tertiary/20 focus:border-tertiary focus:outline-none transition-all placeholder:text-on-surface-variant/20"
              placeholder="Paste protein sequence (e.g., MKTLLILT...)"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-primary h-12 sm:h-14 px-10 text-[11px] font-bold uppercase tracking-[0.2em] rounded-lg w-full sm:w-auto self-start shrink-0 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale mb-6 lg:mb-0 font-sans" 
            onClick={handlePredict}
            disabled={isPredicting || !sequence}
          >
            {isPredicting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                Analyzing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">terminal</span>
                Start Prediction
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-4 bg-white rounded-lg border border-outline-variant lg:h-full flex flex-col shadow-sm relative overflow-hidden min-h-[500px] lg:min-h-0">
          <div className="px-8 py-5 border-b border-outline-variant/50 bg-surface-container-lowest/30 relative z-10 flex items-center justify-between">
            <div className="text-[10px] font-bold text-primary opacity-40 tracking-[0.2em] uppercase font-sans">Analysis Output</div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col relative z-10">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-10 flex-1 flex flex-col"
                >
                  <div className="space-y-3">
                    <div className="text-on-surface-variant text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 font-sans">Classification Result</div>
                    <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border font-sans ${results.predictedClass === 'Antimicrobial' ? 'bg-tertiary/5 text-tertiary border-tertiary/20' : 'bg-on-surface-variant/5 text-on-surface-variant border-outline-variant'}`}>
                      {results.predictedClass}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-on-surface-variant text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 font-sans">Confidence Score</div>
                    <div className="flex items-baseline gap-2">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-6xl font-bold text-primary tracking-tight leading-none font-sans"
                      >
                        {(results.ampProbability * 100).toFixed(1)}
                      </motion.div>
                      <div className="text-lg font-bold text-tertiary/60 tracking-tight font-sans">%</div>
                    </div>
                    <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${results.ampProbability * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-tertiary" 
                      />
                    </div>
                  </div>

                  <div className="pt-8 mt-auto border-t border-outline-variant/30 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5 px-1">
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grow flex flex-col items-center justify-center text-center relative z-10 py-12"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center mb-6 opacity-30">
                    <span className="material-symbols-outlined text-3xl">terminal</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary opacity-30 mb-2 font-sans">Awaiting sequence</p>
                  <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest max-w-[160px] leading-relaxed font-sans">Input residue data to initialize local inference.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
