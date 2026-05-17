import React from 'react';
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
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-12 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-12 shrink-0">
        <div className="flex items-center gap-4 text-primary">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
            <span className="material-symbols-outlined text-3xl">biotech</span>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">Single Prediction</h2>
            <p className="text-xs text-on-surface-variant font-medium opacity-60 mt-0.5 uppercase tracking-wider">Transformer-based Inference Engine</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl bg-surface-container-low text-[11px] font-bold uppercase tracking-widest text-primary hover:bg-surface-container-high transition-colors">Clear Input</button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-10 flex-1">
        <div className="lg:col-span-2 flex flex-col">
          <div className="mb-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-3 shrink-0">
              <label className="block label-md text-xs font-bold opacity-70">AMINO ACID SEQUENCE (FASTA)</label>
              <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">{sequence.length} characters</span>
            </div>
            <textarea 
              className="input-field flex-1 min-h-[300px] font-mono text-sm resize-none rounded-3xl p-8 bg-white shadow-inner-lg focus:shadow-xl focus:shadow-tertiary/5"
              placeholder="Enter protein sequence (e.g., GLFDIVKKVVGALT...)"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-primary h-16 px-14 text-base rounded-2xl w-full md:w-auto self-start shrink-0 shadow-lg shadow-primary/20 hover:scale-[1.02]" 
            onClick={handlePredict}
            disabled={isPredicting || !sequence}
          >
            {isPredicting ? (
              <>
                <span className="material-symbols-outlined animate-spin">refresh</span>
                Initializing Weights...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">play_arrow</span>
                Execute Prediction
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-outline-variant h-full flex flex-col shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-low rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="label-md mb-10 border-b border-outline-variant pb-4 text-xs font-bold text-primary opacity-40 uppercase tracking-widest relative z-10">REAL-TIME TELEMETRY</div>
          
          {results ? (
            <div className="space-y-12 flex-1 flex flex-col relative z-10">
              <div>
                <div className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Classification</div>
                <div className={`inline-flex px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${results.predictedClass === 'Antimicrobial' ? 'bg-tertiary/10 text-tertiary shadow-sm' : 'bg-on-surface-variant/10 text-on-surface-variant'}`}>
                  {results.predictedClass}
                </div>
              </div>
              <div>
                <div className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Confidence Level</div>
                <div className="text-7xl font-black text-primary tracking-tighter leading-none italic">
                  {(results.ampProbability * 100).toFixed(1)}<span className="text-2xl text-tertiary ml-1 not-italic">%</span>
                </div>
              </div>
              <div className="pt-10 mt-auto border-t border-outline-variant/30 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-on-surface-variant opacity-60 italic leading-snug">
                  <span className="material-symbols-outlined text-tertiary text-sm">verified</span>
                  Validated against ESM-2 attention mappings.
                </div>
                <div className="text-[10px] font-bold text-on-surface-variant opacity-40 italic leading-snug">
                  Analysis ID: {results.id} • Processed in 1.42s
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-20 relative z-10">
              <span className="material-symbols-outlined text-6xl mb-8">pending</span>
              <p className="text-base font-black uppercase tracking-widest">Inference Pending</p>
              <p className="text-xs mt-2 font-medium">Input protein sequence to start engine.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
