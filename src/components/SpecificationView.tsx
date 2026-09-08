import React, { useState } from 'react';
import { SPECIFICATION_SECTIONS } from '../data/specificationData';
import { 
  Factory, 
  Boxes, 
  Compass, 
  LayoutGrid, 
  Database, 
  Cpu, 
  Search, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  AlertTriangle,
  QrCode,
  Truck,
  Flame,
  BookmarkCheck
} from 'lucide-react';

interface SpecificationViewProps {
  onGoToPrompt: () => void;
  onGoToSimulator: () => void;
}

export const SpecificationView: React.FC<SpecificationViewProps> = ({ onGoToPrompt, onGoToSimulator }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('conceitos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory': return <Factory className="w-5 h-5 text-amber-500" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-sky-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald-500" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-indigo-500" />;
      case 'Database': return <Database className="w-5 h-5 text-violet-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-rose-500" />;
      default: return <Factory className="w-5 h-5" />;
    }
  };

  const activeSection = SPECIFICATION_SECTIONS.find(s => s.id === activeSectionId) || SPECIFICATION_SECTIONS[0];

  const handleCopySection = (section: typeof activeSection) => {
    const textToCopy = `=== ${section.shortTitle}: ${section.title} ===\n\n` +
      `${section.summary}\n\n` +
      (section.content.intro ? `${section.content.intro}\n\n` : '') +
      section.content.subsections.map(sub => 
        `## ${sub.title}\n${sub.desc}\n` +
        (sub.items ? sub.items.map(i => `  * ${i}`).join('\n') : '') +
        (sub.highlight ? `\n  [DESTAQUE LEAN]: ${sub.highlight}` : '')
      ).join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(section.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredSections = SPECIFICATION_SECTIONS.filter(sec => 
    sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.content.subsections.some(sub => 
      sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.items?.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="space-y-6">
      {/* Banner / Intro Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-500/5 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Engenharia de Manufatura & Logística Industrial (Lean/JIT)
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Guia Arquitetural: Sistema de Abastecimento da Produção
          </h2>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Estruturação prática em 6 pilares essenciais para desenvolvimento de software de controle de abastecimento interno de linhas, E-Kanban, Milk Run e prevenção de paradas de linha (Zero Stockout).
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToPrompt}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Ver Prompt Direto para IA
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onGoToSimulator}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Testar Simulador Interativo
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Nav / Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Navigation Checklist */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar em conceitos, métricas, UI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Capítulos Estruturados</span>
              <span>6 tópicos</span>
            </div>

            {filteredSections.map((section) => {
              const isSelected = section.id === activeSectionId;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border border-amber-500/30 text-slate-900 shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${isSelected ? 'bg-amber-100' : 'bg-slate-100'}`}>
                    {getIcon(section.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-amber-900' : 'text-slate-800'}`}>
                        {section.shortTitle}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {section.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Industrial Formula / Lean Highlight */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <BookmarkCheck className="w-4 h-4" />
              <span>Regra de Ouro do Abastecimento</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              O montador agrega valor montando. Toda vez que um operador sai da estação para buscar material no almoxarifado, a empresa perde produtividade direta e taxa de OEE.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Chapter Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            {/* Header of Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  {getIcon(activeSection.icon)}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Capítulo {activeSection.number} de 6
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeSection.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => handleCopySection(activeSection)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
              >
                {copiedId === activeSection.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Este Capítulo</span>
                  </>
                )}
              </button>
            </div>

            {/* Intro paragraph */}
            {activeSection.content.intro && (
              <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed">
                {activeSection.content.intro}
              </div>
            )}

            {/* Subsections */}
            <div className="space-y-6 mt-6">
              {activeSection.content.subsections.map((sub, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-colors">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    {sub.title}
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    {sub.desc}
                  </p>

                  {/* Bullet points */}
                  {sub.items && sub.items.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {sub.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlight callout if present */}
                  {sub.highlight && (
                    <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{sub.highlight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Visual Extras depending on section */}
            {activeSection.id === 'conceitos' && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-400" />
                  Diagrama: O Ciclo Puxado Just-In-Time (Linha de Abastecimento)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto flex items-center justify-center text-xs mb-2">1</div>
                    <span className="text-xs font-bold text-slate-800 block">Consumo na Linha</span>
                    <span className="text-[11px] text-slate-500">Operador consome peça e atinge o ponto de pedido</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-bold mx-auto flex items-center justify-center text-xs mb-2">2</div>
                    <span className="text-xs font-bold text-slate-800 block">Disparo E-Kanban</span>
                    <span className="text-[11px] text-slate-500">Notificação imediata no coletor do almoxarifado</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold mx-auto flex items-center justify-center text-xs mb-2">3</div>
                    <span className="text-xs font-bold text-slate-800 block">Picking & Milk Run</span>
                    <span className="text-[11px] text-slate-500">Separação rápida e rota programada de entrega</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold mx-auto flex items-center justify-center text-xs mb-2">4</div>
                    <span className="text-xs font-bold text-slate-800 block">Borda de Linha (POU)</span>
                    <span className="text-[11px] text-slate-500">Entrega conferida sem interromper a montagem</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection.id === 'componentes' && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-slate-400" />
                  Demonstração dos Componentes de Chão de Fábrica
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Big Touch Button */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 block mb-1">Botão Tátil com Luva (48px+)</span>
                      <span className="text-[11px] text-slate-500">Mínimo de área para toque sem falhas operacionais</span>
                    </div>
                    <button className="mt-3 w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2">
                      <Boxes className="w-4 h-4" />
                      SOLICITAR PEÇA (1 TOQUE)
                    </button>
                  </div>

                  {/* Emergency Andon Button */}
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50/30 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-red-900 block mb-1">Botão Andon de Emergência</span>
                      <span className="text-[11px] text-red-700">Aciona alarme de risco iminente de desabastecimento</span>
                    </div>
                    <button className="mt-3 w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 animate-pulse">
                      <Flame className="w-4 h-4" />
                      ANDON: LINHA PARADA
                    </button>
                  </div>

                  {/* QR Code / Barcode reader */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 block mb-1">Leitor Rápido de Caixa</span>
                      <span className="text-[11px] text-slate-500">Integração nativa com laser de coletores Zebra</span>
                    </div>
                    <button className="mt-3 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      BIPAR CAIXA KANBAN
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Footer Navigation */}
          <div className="flex items-center justify-between p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-600">
              Quer ver esse conceito rodando em uma aplicação funcional?
            </span>
            <div className="flex gap-2">
              <button
                onClick={onGoToPrompt}
                className="font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
              >
                Copiar Prompt para IA &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
