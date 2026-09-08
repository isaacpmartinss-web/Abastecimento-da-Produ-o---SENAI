import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { SpecificationView } from './components/SpecificationView';
import { PromptView } from './components/PromptView';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { Factory, Sparkles, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('specification');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'specification' && (
          <SpecificationView 
            onGoToPrompt={() => setActiveTab('prompt')}
            onGoToSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'prompt' && (
          <PromptView 
            onGoToSimulator={() => setActiveTab('simulator')}
            onGoToSpec={() => setActiveTab('specification')}
          />
        )}

        {activeTab === 'simulator' && (
          <InteractiveSimulator />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-700">AbastecPro &bull; Indústria 4.0 & Logística Lean</span>
            <span>&bull; Sistema E-Kanban & Abastecimento da Produção</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Just-in-Time (JIT)</span>
            <span>&bull;</span>
            <span>Milk Run</span>
            <span>&bull;</span>
            <span>Andon Digital</span>
            <span>&bull;</span>
            <span>Poka-Yoke</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
