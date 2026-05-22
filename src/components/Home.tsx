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

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10 w-full">
        <div className="text-center md:text-left">
          <div className="inline-flex px-3 py-1 bg-tertiary/5 text-tertiary text-[10px] font-black uppercase tracking-[0.25em] rounded border border-tertiary/20 mb-8">
            Distilled Transformers for Proteomics
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-[1] mb-8 tracking-tighter text-primary uppercase italic">
            AMP <span className="text-tertiary not-italic">Inference</span> Console.
          </h1>
          <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0 font-medium opacity-80">
            DistilESM-2-AMP provides state-of-the-art probabilistic insights into peptide sequences, identifying antimicrobial potential with unprecedented speed and precision.
          </p>
          <div className="flex flex-wrap gap-5 justify-center md:justify-start">
            <button 
              onClick={() => setActivePage('single')}
              className="btn btn-primary h-12 px-10 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-primary/10 transition-all"
            >
              Initialize Engine
            </button>
            <button className="btn bg-white h-12 px-10 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all">
              View Publication
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center md:justify-start gap-8 opacity-20 grayscale grayscale-100">
            <span className="text-[9px] font-black tracking-widest uppercase">Benchmarked:</span>
            <div className="font-black text-[11px] tracking-tighter uppercase">MIT BIOLAB</div>
            <div className="font-black text-[11px] tracking-tighter uppercase">OXFORD PROTEOMICS</div>
            <div className="font-black text-[11px] tracking-tighter uppercase">JBC RESEARCH</div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="rounded-2xl overflow-hidden border border-outline-variant shadow-2xl bg-white p-2">
            <div className="rounded-xl overflow-hidden bg-black/5">
              <img 
                src="/main-slowed.gif" 
                alt="Inference visualization" 
                className="w-full h-auto object-cover aspect-[4/3] mix-blend-multiply opacity-90"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
