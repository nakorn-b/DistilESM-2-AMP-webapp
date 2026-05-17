import React, { useState } from 'react'
import type { Analysis, Page } from './types'
import './App.css'
import Home from './components/Home'
import SinglePrediction from './components/SinglePrediction'
import BatchProcessing from './components/BatchProcessing'
import ModelMetadata from './components/ModelMetadata'
import ResearchAuthors from './components/ResearchAuthors'

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

  const handlePredict = () => {
    if (!sequence) return
    setIsPredicting(true)
    setTimeout(() => {
      const prob = 0.984;
      setResults({
        id: 'AMP_' + Math.floor(Math.random() * 10000).toString().padStart(5, '0'),
        name: 'Analysis_' + Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substr(0, 16),
        status: 'Completed',
        ampProbability: prob,
        predictedClass: 'Antimicrobial',
      })
      setIsPredicting(false)
    }, 1500)
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
        return <BatchProcessing recentAnalyses={recentAnalyses} />;
      case 'metadata':
        return <ModelMetadata />;
      case 'authors':
        return <ResearchAuthors />;
    }
  }

  return (
    <div className="h-dvh flex flex-col font-sans text-on-surface overflow-hidden bg-surface-container-lowest/40">
      {/* Navigation - Fixed Top */}
      <header className="shrink-0 border-b border-outline-variant bg-white/80 backdrop-blur-lg z-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">D</div>
            <div className="font-black text-xl tracking-tighter text-primary italic uppercase">Distil<span className="text-tertiary not-italic">ESM</span></div>
          </button>
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => setActivePage('single')}
              className={`nav-link ${activePage === 'single' ? 'active' : ''}`}
            >
              Predict
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
              Model
            </button>
            <button 
              onClick={() => setActivePage('authors')}
              className={`nav-link ${activePage === 'authors' ? 'active' : ''}`}
            >
              Research
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">API Keys</button>
            <button className="btn btn-primary h-11 px-6 rounded-xl shadow-lg shadow-primary/20 text-xs font-black uppercase tracking-widest">Docs</button>
          </div>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className={`flex-1 ${activePage === 'home' ? 'overflow-hidden' : 'overflow-y-auto'} w-full bg-white/40`}>
        <div key={activePage} className={`${activePage === 'home' ? 'h-full' : 'min-h-full'} flex flex-col page-fade-in`}>
          {renderPage()}
        </div>
      </main>

      {/* Compact Footer - Fixed Bottom */}
      <footer className="shrink-0 bg-white border-t border-outline-variant py-4 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 text-center sm:text-left">
            <div className="font-black text-[10px] text-primary tracking-[0.2em] uppercase">DistilESM-2-AMP</div>
            <span className="text-on-surface-variant/20 hidden sm:inline">|</span>
            <p className="text-[10px] text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">
              © 2026 Lab of Computational Proteomics.
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Biobank</a>
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
