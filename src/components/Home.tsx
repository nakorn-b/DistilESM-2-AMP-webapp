import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '../types';

interface HomeProps {
  setActivePage: (page: Page) => void;
}

const Home = ({ setActivePage }: HomeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Ultra-subtle ease for formal loading
  const easeQuiet = [0.2, 0, 0, 1];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white relative overflow-hidden h-full max-h-full font-sans">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16 grid md:grid-cols-12 gap-12 lg:gap-24 items-stretch relative z-10 w-full">
        
        {/* Left Column: Scholarly Narrative (6 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeQuiet }}
          className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left py-12 md:py-20"
        >
          {/* Dynamic Text Block - Centered/Balanced */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-5xl lg:text-[72px] font-bold tracking-[-0.03em] text-primary mb-2 leading-[1.05] font-sans">
                Antimicrobial Peptide <br />
                <span className="text-tertiary">Prediction Portal</span>
              </h1>
              <div className="h-[2px] w-20 bg-tertiary/10 mt-6" />
            </div>

            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-xl font-medium font-serif italic opacity-70">
              A high-fidelity inference system utilizing distilled transformer architectures for the probabilistic classification of peptide antimicrobial potential.
            </p>
          </div>

          {/* Action Area - Fixed Bottom */}
          <div className="flex flex-wrap gap-5 justify-center md:justify-start mt-14">
            <button 
              onClick={() => setActivePage('single')}
              className="btn btn-primary h-11 px-8 text-[10px] font-black uppercase tracking-[0.3em] rounded-md transition-all shadow-sm hover:bg-tertiary hover:shadow-md active:scale-[0.98] font-sans"
            >
              Start Analysis
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn bg-white h-11 px-8 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md border border-outline-variant hover:bg-surface-container-low transition-all text-on-surface/50 font-sans"
            >
              Methodology
            </button>
          </div>
        </motion.div>
        
        {/* Right Column: High-Fidelity Technical Figure (6 cols) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.998 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: easeQuiet, delay: 0.3 }}
          className="md:col-span-6 hidden md:flex flex-col py-12 md:py-20"
        >
          {/* GIF Container - Matches Text Block Height */}
          <div className="flex-1">
            <div className="relative h-full">
              {/* Clean presentation frame (Oxford/Academic style) */}
              <div className="p-3 md:p-5 bg-white h-full flex items-center justify-center relative border border-outline-variant/30 rounded-[2rem] shadow-xl shadow-primary/[0.08]">
                <div className="w-full h-full overflow-hidden rounded-[1.4rem]">
                  <img 
                    src="/main-slowed.gif" 
                    alt="DistilESM-2 model topology visualization" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Technical watermark for peer-review aesthetic */}
                <div className="absolute bottom-8 right-10 flex items-center gap-3 opacity-20 pointer-events-none">
                  <div className="text-[8px] font-mono tracking-widest uppercase">
                    esm2_d30_h12_v2.4
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacer - Matches Action Area height */}
          <div className="h-11 mt-14" />
        </motion.div>
      </div>

      {/* Methodology Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full border border-outline-variant/30"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-1">System Methodology</h2>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Technical Validation Summary v2.4</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 overflow-y-auto space-y-12">
                <section>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-tertiary mb-6">01 // Model Distillation</h3>
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-serif italic mb-6 opacity-80">
                    "DistilESM-2-AMP utilizes a specialized knowledge distillation framework designed for protein language models."
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 text-[11px] leading-relaxed">
                    <div className="space-y-4">
                      <div className="font-bold uppercase tracking-widest text-primary pb-2 border-b border-outline-variant/20">Architecture</div>
                      <p className="text-on-surface-variant font-medium">The teacher model (ESM-2, 33 layers, 650M parameters) is compressed into a 6-layer student transformer. This allows for near-instant inference in web environments without dedicated GPU acceleration.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="font-bold uppercase tracking-widest text-primary pb-2 border-b border-outline-variant/20">Optimization</div>
                      <p className="text-on-surface-variant font-medium">Layer-wise similarity loss and attention-map matching ensure that the student model retains the critical structural understanding of the parent transformer.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-tertiary mb-6">02 // Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Accuracy', value: '94.2%' },
                      { label: 'F1-Score', value: '0.91' },
                      { label: 'MCC', value: '0.82' },
                      { label: 'Speedup', value: '5.4x' }
                    ].map((stat) => (
                      <div key={stat.label} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20 text-center">
                        <div className="text-lg font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="p-6 bg-primary/5 border border-primary/10 rounded-xl">
                  <div className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-tertiary text-lg">info</span>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Manuscript Status</h4>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed">
                        Full benchmarking results and comparative analysis against traditional HMM and SVM-based classifiers are currently in preparation for formal publication.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 border-t border-outline-variant/30 flex justify-end items-center bg-surface-container-lowest">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-tertiary transition-all"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
