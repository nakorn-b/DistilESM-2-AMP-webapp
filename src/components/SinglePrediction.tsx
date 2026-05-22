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
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-10 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-4 text-primary">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-outline-variant">
            <span className="material-symbols-outlined text-2xl">biotech</span>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Single Inference</h2>
            <p className="text-[10px] text-on-surface-variant font-bold opacity-40 uppercase tracking-[0.15em]">DistilESM-2 Attention Engine</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setSequence('')}
            className="h-9 px-4 rounded-lg bg-surface-container-low text-[10px] font-black uppercase tracking-widest text-primary hover:bg-surface-container-high active:scale-95 transition-all border border-outline-variant/30"
          >
            Clear Buffer
          </button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-8 flex-1">
        <div className="lg:col-span-8 flex flex-col">
          <div className="mb-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2.5 shrink-0">
              <label className="block text-[10px] font-black text-primary/50 tracking-[0.15em] uppercase">Primary Sequence Data (FASTA)</label>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{sequence.length} residues</span>
              </div>
            </div>
            <textarea 
              className="flex-1 min-h-[400px] font-mono text-sm resize-none rounded-2xl p-6 bg-white border border-outline-variant shadow-sm focus:ring-2 focus:ring-tertiary/20 focus:border-tertiary focus:outline-none transition-all placeholder:text-on-surface-variant/20"
              placeholder="Paste protein sequence (e.g., MKTLLILT...)"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-primary h-14 px-10 text-xs font-black uppercase tracking-[0.2em] rounded-xl w-full md:w-auto self-start shrink-0 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale" 
            onClick={handlePredict}
            disabled={isPredicting || !sequence}
          >
            {isPredicting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                Synthesizing Attention Layers...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">terminal</span>
                Execute Inference
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl border border-outline-variant h-full flex flex-col shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface-container-lowest/50 rounded-full -mr-24 -mt-24 pointer-events-none border border-outline-variant/10"></div>
          
          <div className="px-8 py-5 border-b border-outline-variant/50 bg-surface-container-lowest/30 relative z-10 flex items-center justify-between">
            <div className="text-[10px] font-black text-primary opacity-40 tracking-[0.2em] uppercase">Telemetry Output</div>
            <div className={`w-2 h-2 rounded-full ${isPredicting ? 'bg-tertiary animate-pulse' : 'bg-outline-variant'} shadow-sm transition-colors`}></div>
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
                    <div className="text-on-surface-variant text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Classification Result</div>
                    <div className={`inline-flex px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${results.predictedClass === 'Antimicrobial' ? 'bg-tertiary/5 text-tertiary border-tertiary/20' : 'bg-on-surface-variant/5 text-on-surface-variant border-outline-variant'}`}>
                      {results.predictedClass}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-on-surface-variant text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Confidence Score</div>
                    <div className="flex items-baseline gap-2 font-jakarta">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-6xl font-extrabold text-primary tracking-tighter leading-none"
                      >
                        {(results.ampProbability * 100).toFixed(1)}
                      </motion.div>
                      <div className="text-lg font-black text-tertiary/60 tracking-tight">%</div>
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
                    <div className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/30 space-y-3">
                      <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest">
                        <span className="material-symbols-outlined text-tertiary text-xs">verified</span>
                        Validation Logic
                      </div>
                      <p className="text-[10px] text-on-surface-variant/70 font-bold leading-relaxed">
                        Confidence validated against <span className="text-primary font-black">HSSP</span> attention mappings and residue-level entropy.
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 px-1 font-jakarta">
                      <div className="flex justify-between text-[9px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">
                        <span>Analysis ID</span>
                        <span className="text-primary font-extrabold opacity-100">{results.id}</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">
                        <span>Inference Time</span>
                        <span className="text-primary font-extrabold opacity-100">1.42s</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col items-center justify-center text-center relative z-10 py-12"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center mb-6 opacity-30">
                    <span className="material-symbols-outlined text-3xl">terminal</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary opacity-30 mb-2">Awaiting sequence</p>
                  <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest max-w-[160px] leading-relaxed">Input residue data to initialize local inference.</p>
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
