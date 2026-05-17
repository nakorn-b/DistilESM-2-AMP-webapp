import React from 'react';
import type { Page } from '../types';

interface HomeProps {
  setActivePage: (page: Page) => void;
}

const Home = ({ setActivePage }: HomeProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white relative overflow-hidden h-full max-h-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-tertiary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 w-full">
        <div className="text-center md:text-left">
          <div className="inline-flex px-4 py-1.5 bg-tertiary/10 text-tertiary text-[11px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Distilled Transformers for Proteomics
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tighter text-primary">
            Accelerating <span className="text-tertiary">AMP</span> Discovery.
          </h1>
          <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
            DistilESM-2-AMP provides state-of-the-art probabilistic insights into peptide sequences, identifying antimicrobial potential with unprecedented speed and accuracy.
          </p>
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <button 
              onClick={() => setActivePage('single')}
              className="btn btn-premium h-14 px-10 text-base rounded-2xl"
            >
              Launch Analysis
            </button>
            <button className="btn btn-outline h-14 px-10 text-base rounded-2xl border-2 hover:bg-surface-container-low transition-colors">
              View Publication
            </button>
          </div>
          <div className="mt-10 flex items-center justify-center md:justify-start gap-8 opacity-40 grayscale contrast-125">
            <span className="text-xs font-black tracking-widest uppercase">Used by:</span>
            <div className="font-bold text-sm tracking-tighter">MIT BIOLAB</div>
            <div className="font-bold text-sm tracking-tighter">OXFORD PROTEOMICS</div>
            <div className="font-bold text-sm tracking-tighter">JBC RESEARCH</div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="rounded-[3rem] overflow-hidden border border-outline-variant shadow-2xl bg-white p-4">
            <div className="rounded-[2.2rem] overflow-hidden bg-black/5">
              <img 
                src="/main-slowed.gif" 
                alt="Scientist looking through a microscope" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
