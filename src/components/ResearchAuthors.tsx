import React from 'react';

const ResearchAuthors = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-12 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-16 text-primary shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
          <span className="material-symbols-outlined text-3xl">groups</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight">Research & Publications</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="card p-10 flex flex-col justify-between h-[300px] rounded-[2.5rem] bg-white border border-outline-variant shadow-sm hover:shadow-xl transition-all duration-500">
          <div>
            <div className="text-[10px] font-black text-tertiary uppercase tracking-widest mb-4 opacity-60">Principal Investigator</div>
            <h3 className="text-2xl font-black mb-1 text-primary tracking-tight">Dr. Elena Rostova</h3>
            <p className="text-xs text-on-surface-variant font-bold opacity-50 uppercase tracking-wider">Proteomics Lead, LCP Lab</p>
          </div>
          <div className="flex gap-4 border-t border-outline-variant/30 pt-6">
            <a href="#" className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all duration-300">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a href="#" className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all duration-300">
              <span className="material-symbols-outlined">public</span>
            </a>
          </div>
        </div>
        <div className="card p-10 flex flex-col justify-between h-[300px] rounded-[2.5rem] bg-white border border-outline-variant shadow-sm hover:shadow-xl transition-all duration-500">
          <div>
            <div className="text-[10px] font-black text-tertiary uppercase tracking-widest mb-4 opacity-60">Computational Design</div>
            <h3 className="text-2xl font-black mb-1 text-primary tracking-tight">Dr. Marcus Thorne</h3>
            <p className="text-xs text-on-surface-variant font-bold opacity-50 uppercase tracking-wider">Sr. Research Scientist, ETH</p>
          </div>
          <div className="flex gap-4 border-t border-outline-variant/30 pt-6">
            <a href="#" className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all duration-300">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a href="#" className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all duration-300">
              <span className="material-symbols-outlined">public</span>
            </a>
          </div>
        </div>
        <div className="bg-primary text-white p-12 rounded-[3rem] h-[300px] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Journal of Biol. Chem.</span>
          </div>
          <h4 className="text-xl font-black leading-tight relative z-10 group-hover:text-tertiary transition-colors line-clamp-3 italic">
            "Transformer-based Prediction of Antimicrobial Peptides: A High-Throughput Computational Approach."
          </h4>
          <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
            <div className="font-mono text-[10px] leading-relaxed text-white/40">
              Rostova, E. (2024). J. Biol. Chem. DOI: 10.1016/j.jbc.2024.105421
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchAuthors;
