const ResearchAuthors = () => {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 py-12 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-12 text-primary shrink-0">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-outline-variant/30">
          <span className="material-symbols-outlined text-2xl">groups</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight uppercase font-sans">Research & Authorship</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Author Card 1 */}
        <div className="bg-white border border-outline-variant rounded-lg p-8 flex flex-col justify-between h-[320px] transition-all hover:border-tertiary/50 shadow-sm hover:shadow-md group">
          <div>
            <div className="text-[10px] font-bold text-tertiary uppercase tracking-[0.2em] mb-4 opacity-70 font-sans">Lead Developer</div>
            <h3 className="text-2xl font-bold mb-1 text-primary tracking-tight font-sans">Nakorn Boonprasong</h3>
            <p className="text-[10px] text-on-surface-variant font-bold opacity-60 uppercase tracking-widest leading-relaxed font-sans">
              Undergraduate Researcher, DataSoul Lab <br/>
              Dept. of Computer Science, Kasetsart University
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="h-px bg-outline-variant/30 w-full" />
            <div className="flex gap-3">
              <a href="mailto:nakorn.b@ku.th" className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
              <a href="https://nakornb-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
            </div>
          </div>
        </div>

        {/* Author Card 2 */}
        <div className="bg-white border border-outline-variant rounded-lg p-8 flex flex-col justify-between h-[320px] transition-all hover:border-tertiary/50 shadow-sm hover:shadow-md group">
          <div>
            <div className="text-[10px] font-bold text-tertiary uppercase tracking-[0.2em] mb-4 opacity-70 font-sans">Principal Investigator</div>
            <h3 className="text-2xl font-bold mb-1 text-primary tracking-tight font-sans">Asst. Prof. Dr. Thammakorn Saethang</h3>
            <p className="text-[10px] text-on-surface-variant font-bold opacity-60 uppercase tracking-widest leading-relaxed font-sans">
              Head of DataSoul Lab <br/>
              Dept. of Computer Science, Kasetsart University
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="h-px bg-outline-variant/30 w-full" />
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
            </div>
          </div>
        </div>

        {/* Publication Card */}
        <div className="bg-primary text-white p-8 rounded-lg h-[320px] flex flex-col justify-between relative overflow-hidden group border border-primary">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <span className="material-symbols-outlined text-lg">menu_book</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 font-sans">Technical Report</span>
            </div>
            <h4 className="text-lg font-bold leading-snug relative z-10 tracking-tight font-serif italic">
              "DistilESM-2-AMP: Efficient Transformer Distillation for High-Throughput Peptide Classification."
            </h4>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="h-px bg-white/10 w-full" />
            <div className="font-sans text-[9px] leading-relaxed text-white/40 uppercase tracking-widest">
              Boonprasong, N., Saethang, T. (2026). <br/>
              DataSoul Lab Technical Series.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 bg-surface-container-low/50 border border-outline-variant rounded-lg shadow-sm">
        <div className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em] mb-4 font-sans">Institutional Attribution</div>
        <p className="text-sm text-on-surface-variant leading-relaxed max-w-4xl font-medium font-serif">
          This research was conducted at the <strong>DataSoul Lab</strong>, Department of Computer Science, Faculty of Science, Kasetsart University. 
          The project focuses on the intersection of deep learning and proteomics to accelerate the discovery of therapeutic peptides.
        </p>
      </div>
    </div>
  );
};

export default ResearchAuthors;
