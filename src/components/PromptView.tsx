import React, { useState } from 'react';
import { PROMPT_TEMPLATES, PromptTemplate } from '../data/promptTemplates';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Terminal, 
  CheckCircle, 
  Bot, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PromptViewProps {
  onGoToSimulator: () => void;
  onGoToSpec: () => void;
}

export const PromptView: React.FC<PromptViewProps> = ({ onGoToSimulator, onGoToSpec }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('direto');
  const [copied, setCopied] = useState<boolean>(false);

  const currentTemplate: PromptTemplate = 
    PROMPT_TEMPLATES.find(t => t.id === selectedTemplateId) || PROMPT_TEMPLATES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTemplate.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([currentTemplate.promptText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-sistema-abastecimento-${currentTemplate.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950 text-amber-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Prompt Final Pronto para Execução
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Prompt Simples, Direto e Otimizado para IA
          </h2>
          <p className="mt-1.5 text-sm font-medium text-slate-900 leading-relaxed">
            Copie o prompt abaixo e cole diretamente em qualquer modelo de IA (Google Gemini, Claude, ChatGPT, Cursor, etc.). Ele contém toda a lógica funcional e sem excessos técnicos desnecessários para criar um aplicativo de abastecimento funcional e moderno.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-900 text-white shadow-md transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  <span>Prompt Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copiar Este Prompt (1 Clique)</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/30 hover:bg-white/40 text-slate-950 transition-all cursor-pointer backdrop-blur-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Template Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        {PROMPT_TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplateId;
          return (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplateId(tmpl.id)}
              className={`flex-1 min-w-[200px] text-left p-3 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{tmpl.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tmpl.tag}
                </span>
              </div>
              <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                {tmpl.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Prompt Editor / Display Box */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-slate-900 text-slate-300 px-5 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-semibold text-white">
              prompt_abastecimento_producao.txt
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({currentTemplate.promptText.length} caracteres • {currentTemplate.promptText.split(/\s+/).length} palavras)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap select-all selection:bg-amber-500 selection:text-slate-950">
          {currentTemplate.promptText}
        </div>
      </div>

      {/* Why This Prompt Works & Validation Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Por que este prompt gera resultados superiores na IA:</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Papel Definido com Precisão:</strong> O prompt estabelece imediatamente o arquétipo sênior em manufatura e logística industrial.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Sem Ruído Nem Críticas:</strong> Vai direto às funcionalidades essenciais sem instruções contraditórias ou excessos de configuração.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Ciclo Operacional Completo:</strong> Especifica o elo exato entre o solicitante (Operador da Linha) e o atendente (Almoxarifado/Milk Run).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Dados Pré-carregados Mandatórios:</strong> Garante que a IA já crie a aplicação com itens, linhas e pedidos prontos para uso.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Dicas para obter o melhor resultado:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Você pode colar este prompt diretamente no Google AI Studio, no ChatGPT ou no Claude. Se quiser testar antes como o fluxo operacional funciona na prática, experimente o simulador interativo embutido.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onGoToSpec}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              &larr; Ver Especificação Completa
            </button>
            <button
              onClick={onGoToSimulator}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
            >
              <span>Ver Simulador do App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
