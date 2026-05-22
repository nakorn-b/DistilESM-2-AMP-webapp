import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Analysis, Page } from './types'
import './App.css'
import Home from './components/Home'
import SinglePrediction from './components/SinglePrediction'
import BatchProcessing from './components/BatchProcessing'
import ModelMetadata from './components/ModelMetadata'
import ResearchAuthors from './components/ResearchAuthors'
import { inference_single_sequence } from './services/inference_service'

function App() {
  const [activePage, setActivePage] = useState<Page>('home')
  const [sequence, setSequence] = useState('')
  const [isPredicting, setIsPredicting] = useState(false)
  const [results, setResults] = useState<Analysis | null>(null)

  const [recentAnalyses] = useState<Analysis[]>([
    { id: 'AMP_00129', name: 'Sample_AMP_01', timestamp: '2026-05-16 10:24', status: 'Completed', ampProbability: 0.9921, predictedClass: 'Antimicrobial' },
    { id: 'AMP_00130', name: 'Test_Peptide_B', timestamp: '2026-05-15 14:12', status: 'Completed', ampProbability: 0.8742, predictedClass: 'Non-Antimicrobial' },
    { id: 'AMP_00131', name: 'Unknown_Sequence_X', timestamp: '2026-05-15 09:45', status: 'Completed', ampProbability: 0.9548, predictedClass: 'Antimicrobial' },
    { id: 'AMP_00132', name: 'Unknown_Sequence_Y', timestamp: '2026-05-15 08:30', status: 'Completed', ampProbability: 0.9122, predictedClass: 'Antimicrobial' },
  ])

  const handlePredict = async () => {
    if (!sequence) return;
    
    setIsPredicting(true);
    setResults(null);

    try {
      const data = await inference_single_sequence(sequence);
      
      // Map API response to our Analysis type
      // API returns { prediction: "AMP" | "Non-AMP", confidence: number }
      const isAMP = String(data.prediction).trim().toUpperCase() === "AMP";
      
      setResults({
        id: 'AMP_' + Math.floor(Math.random() * 10000).toString().padStart(5, '0'),
        name: 'Analysis_' + Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
        status: 'Completed',
        ampProbability: data.confidence,
        predictedClass: isAMP ? 'Antimicrobial' : 'Non-Antimicrobial'
      });
    } catch (error) {
      console.error('Inference failed:', error);
    } finally {
      setIsPredicting(false);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'single':
        return (
          <SinglePrediction 
            sequence={sequence} 
            setSequence={setSequence} 
            isPredicting={isPredicting} 
            handlePredict={handlePredict} 
            results={results} 
          />
        );
      case 'batch':
        return <BatchProcessing recentAnalyses={recentAnalyses} />;
      case 'metadata':
        return <ModelMetadata />;
      case 'authors':
        return <ResearchAuthors />;
    }
  }

  return (
    <div className="h-dvh flex flex-col font-sans text-on-surface overflow-hidden bg-surface-container-low/20">
      {/* Navigation - Fixed Top */}
      <header className="shrink-0 border-b border-outline-variant bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-primary/20 transition-transform">D</div>
            <div className="font-black text-lg tracking-[-0.05em] text-primary uppercase">Distil<span className="text-tertiary">ESM-2-AMP</span></div>
          </button>
          
          <nav className="hidden lg:flex items-center gap-2 h-full">
            <button 
              onClick={() => setActivePage('single')}
              className={`nav-link ${activePage === 'single' ? 'active' : ''}`}
            >
              Inference
            </button>
            <button 
              onClick={() => setActivePage('batch')}
              className={`nav-link ${activePage === 'batch' ? 'active' : ''}`}
            >
              Batch
            </button>
            <button 
              onClick={() => setActivePage('metadata')}
              className={`nav-link ${activePage === 'metadata' ? 'active' : ''}`}
            >
              Metadata
            </button>
            <button 
              onClick={() => setActivePage('authors')}
              className={`nav-link ${activePage === 'authors' ? 'active' : ''}`}
            >
              Research
            </button>
          </nav>

          <div className="flex items-center gap-6">
            <a 
              href="https://huggingface.co/NakornB/distilESM-2-AMP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-all opacity-50 hover:opacity-100"
            >
              Model Hub
            </a>
            <a 
              href="https://github.com/nakorn-b/distilESM-2-AMP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center h-9 px-5 rounded-lg bg-primary text-white text-[10px] font-black tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-sm shadow-primary/10"
            >
              Source & Docs
            </a>
          </div>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className={`flex-1 ${activePage === 'home' ? 'overflow-hidden' : 'overflow-y-auto'} w-full bg-white/30`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`${activePage === 'home' ? 'h-full' : 'min-h-full'} flex flex-col`}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Compact Footer - Fixed Bottom */}
      <footer className="shrink-0 bg-white border-t border-outline-variant py-3 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="font-black text-[9px] text-primary tracking-[0.25em] uppercase opacity-80">DistilESM-2-AMP</div>
            <p className="text-[9px] text-on-surface-variant font-bold opacity-30 uppercase tracking-[0.15em]">
              © 2026 Lab of Computational Proteomics. All Rights Reserved.
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors opacity-40 hover:opacity-100">Biobank</a>
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors opacity-40 hover:opacity-100">Terms</a>
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors opacity-40 hover:opacity-100">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
