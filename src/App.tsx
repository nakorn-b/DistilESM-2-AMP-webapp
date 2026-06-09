import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import type { Analysis, Page } from './types'
import './App.css'
import Home from './components/Home'
import SinglePrediction from './components/SinglePrediction'
import BatchProcessing from './components/BatchProcessing'
import ModelMetadata from './components/ModelMetadata'
import ResearchAuthors from './components/ResearchAuthors'
import { inference_batch, inference_single_sequence } from './services/inference_service'

function App() {
  const [activePage, setActivePage] = useState<Page>('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [sequence, setSequence] = useState('')
  const [isPredicting, setIsPredicting] = useState(false)
  const [isBatchPredicting, setIsBatchPredicting] = useState(false)
  const [results, setResults] = useState<Analysis | null>(null)
  const [batchAnalyses, setBatchAnalyses] = useState<Analysis[]>([])

  const [recentAnalyses] = useState<Analysis[]>([])

  const navItems = [
    { id: 'single', label: 'Inference' },
    { id: 'batch', label: 'Batch' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'authors', label: 'Research' }
  ];

  const handlePredict = async () => {
    if (!sequence) return;
    
    // Client-side pre-validation
    const sequencePattern = /^[ACDEFGHIKLMNPQRSTVWY]+$/i;
    if (!sequencePattern.test(sequence.trim())) {
      toast.error('Invalid Sequence', {
        description: 'Only standard amino acids (ACDEFGHIKLMNPQRSTVWY) are permitted.'
      });
      return;
    }

    setIsPredicting(true);
    setResults(null);

    try {
      const data = await inference_single_sequence(sequence.trim());
      
      const isAMP = String(data.prediction).trim().toUpperCase() === "AMP";
      
      setResults({
        id: 'AMP_' + Math.floor(Math.random() * 10000).toString().padStart(5, '0'),
        name: 'Analysis_' + Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
        status: 'Completed',
        ampProbability: data.confidence,
        predictedClass: isAMP ? 'Antimicrobial' : 'Non-Antimicrobial'
      });
    } catch (error: any) {
      console.error('Inference failed:', error);
      toast.error('Inference Failed', {
        description: error.message || 'An unexpected error occurred during inference.'
      });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleBatchPredict = async (file: File) => {
    if (!file) return;
    setIsBatchPredicting(true);
    try {
      const response = await inference_batch(file)
      const data = await response.json();
      
      const mappedResults: Analysis[] = data.map((item: any, index: number) => ({
        id: `BATCH_${index.toString().padStart(3, '0')}`,
        name: item.sequence || `Seq_${index}`,
        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
        status: 'Completed',
        ampProbability: item.confidence,
        predictedClass: item.class === 'AMP' ? 'Antimicrobial' : 'Non-Antimicrobial'
      }));

      setBatchAnalyses(mappedResults);
      toast.success('Batch Processing Complete', {
        description: `${mappedResults.length} sequences successfully analyzed.`
      });
    } catch(error: any) {
      console.error('Batch inference failed:', error);
      toast.error('Batch Analysis Failed', {
        description: error.message || 'Please verify your CSV format and try again.'
      });
    } finally {
      setIsBatchPredicting(false);
    }
  }

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
        return (
          <BatchProcessing 
            recentAnalyses={batchAnalyses.length > 0 ? batchAnalyses : recentAnalyses} 
            handleBatchPredict={handleBatchPredict}
            isPredicting={isBatchPredicting}
          />
        );
      case 'metadata':
        return <ModelMetadata />;
      case 'authors':
        return <ResearchAuthors />;
    }
  }

  return (
    <div className="h-dvh flex flex-col font-sans text-on-surface overflow-hidden bg-surface-container-low/10">
      {/* Skip to Content Link - Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-tertiary focus:text-white focus:rounded-lg focus:font-bold focus:text-[10px] focus:uppercase focus:tracking-widest">
        Skip to main content
      </a>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] shadow-sm lg:hidden p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="font-bold text-xl tracking-tight text-primary uppercase">Menu</div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className="flex-1">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button 
                        onClick={() => {
                          setActivePage(item.id as Page);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
                          activePage === item.id 
                            ? 'bg-primary text-white' 
                            : 'text-on-surface-variant hover:bg-surface-container-low'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="pt-8 border-t border-outline-variant/30 space-y-4">
                <a 
                  href="https://huggingface.co/NakornB/distilESM-2-AMP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Model Hub
                </a>
                <a 
                  href="https://github.com/nakorn-b/distilESM-2-AMP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60"
                >
                  Documentation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navigation - Floating Header */}
      <header className="shrink-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="max-w-[1280px] mx-auto h-16 px-4 md:px-6 flex items-center justify-between bg-white/90 backdrop-blur-md border border-outline-variant/50 rounded-lg shadow-sm">
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center text-white font-bold text-[11px] transition-transform group-hover:scale-[1.02]">D</div>
            <div className="font-bold text-lg sm:text-xl tracking-tight text-primary uppercase">Distil<span className="text-tertiary">ESM-2-AMP</span></div>
          </button>
          
          <nav className="hidden lg:block h-full py-2">
            <ul className="flex items-center gap-1 h-full">
              {navItems.map((page) => (
                <li key={page.id} className="h-full">
                  <button 
                    onClick={() => setActivePage(page.id as Page)}
                    className={`nav-link h-full px-4 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center relative group overflow-hidden ${
                      activePage === page.id 
                        ? 'text-primary' 
                        : 'text-on-surface-variant/60 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {page.label}
                    {activePage === page.id && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1 bg-tertiary rounded-t-sm"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="https://huggingface.co/NakornB/distilESM-2-AMP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden xl:flex items-center h-9 px-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/40 hover:text-primary hover:bg-primary/5 transition-all"
            >
              Model Hub
            </a>
            <a 
              href="https://github.com/nakorn-b/distilESM-2-AMP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center h-10 px-5 rounded-lg bg-primary text-white text-[10px] font-bold tracking-widest uppercase hover:bg-tertiary active:scale-95 transition-all border border-white/10"
            >
              Source & Docs
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg hover:bg-surface-container-low flex items-center justify-center text-primary transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main scrollable area */}
      <main id="main-content" className={`flex-1 ${activePage === 'home' || activePage === 'batch' ? 'overflow-hidden lg:overflow-hidden overflow-y-auto' : 'overflow-y-auto'} w-full`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.005 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={`${activePage === 'home' || activePage === 'batch' ? 'lg:h-full min-h-full' : 'min-h-full'} flex flex-col`}
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
              © 2026 Nakorn Boonprasong. All Rights Reserved.
            </p>
          </div>
          
        </div>
      </footer>

      {/* Toast Notification System */}
      <Toaster 
        position="bottom-right" 
        expand={true} 
        richColors 
        theme="light"
        toastOptions={{
          style: {
            fontFamily: "'Public Sans', sans-serif",
            borderRadius: '12px',
          },
        }}
      />
    </div>
  )
}

export default App
