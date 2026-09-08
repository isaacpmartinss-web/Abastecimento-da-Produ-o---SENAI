export interface PromptTemplate {
  id: string;
  title: string;
  tag: string;
  description: string;
  promptText: string;
}

export const MAIN_PROMPT_DIRECT = `Atue como um desenvolvedor sênior de software especialista em logística industrial e manufatura. Desenvolva um aplicativo completo e funcional de Sistema de Abastecimento da Produção (Internal Line Feeding / E-Kanban) voltado para chão de fábrica.

O aplicativo deve conectar a Linha de Produção (que solicita peças) ao Almoxarifado/Abastecedores (que separam e entregam materiais).

Construa a aplicação com as seguintes funcionalidades e características essenciais:

1. FLUXO OPERACIONAL EM TEMPO REAL:
- Tela do Operador da Linha: permite selecionar a estação de trabalho (ex: Linha 1 - Posto A) e solicitar componentes com 1 clique (chamada E-Kanban rápida), indicando a quantidade e a prioridade (Normal, Urgente ou Parada de Linha).
- Tela do Abastecedor / Almoxarifado: painel tipo Kanban com as colunas "Pendentes", "Em Separação", "Em Rota" e "Entregues", exibindo o endereço da peça na prateleira, timer de SLA e botão para avançar o status com confirmação.
- Sistema de Alerta Andon: destaque visual imediato para chamados urgentes com risco iminente de parada de produção.

2. GESTÃO DE ESTOQUE E ITENS:
- Monitoramento de saldo das peças essenciais com sinalização de nível de segurança (Verde: OK, Amarelo: Ponto de Pedido, Vermelho: Estoque Crítico).
- Catálogo de insumos com código (SKU/Part Number), descrição, unidade de medida, localização e lote padrão.
- Baixa automática no estoque ao confirmar a entrega na estação.

3. DASHBOARD E MÉTRICAS (KPIs):
- Painel com contadores de chamados ativos, pedidos entregues no turno, taxa de atendimento no prazo (SLA) e tempo médio de abastecimento (Lead Time).
- Histórico pesquisável de todas as movimentações realizadas.

4. INTERFACE E USABILIDADE:
- Layout moderno, intuitivo e com alto contraste, pensado para operadores com luvas ou dispositivos móveis em ambiente fabril (botões grandes, tipografia limpa, filtros rápidos por linha).
- Dados iniciais realistas pré-cadastrados (linhas de montagem, peças e ordens ativas) para que a aplicação seja 100% interativa e utilizável imediatamente.

Entregue o código completo, organizado e pronto para execução.`;

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'direto',
    title: 'Prompt Principal (Simples e Direto)',
    tag: 'Recomendado para Qualquer IA',
    description: 'O prompt limpo, objetivo e balanceado, sem ruídos técnicos desnecessários, projetado para gerar um app funcional e polido de primeira.',
    promptText: MAIN_PROMPT_DIRECT
  },
  {
    id: 'web_fullstack',
    title: 'Prompt Técnico Full-Stack (React + Node.js)',
    tag: 'Web & Painel Industrial',
    description: 'Especifica a stack técnica moderna com React, Tailwind, TypeScript e simulação de WebSockets para fábricas com totens e computadores de bordo.',
    promptText: `Atue como desenvolvedor Full-Stack especialista em sistemas MES/WMS industriais. Desenvolva uma aplicação web completa em React, TypeScript e Tailwind CSS para Gestão de Abastecimento da Produção (E-Kanban & Milk Run).

O sistema deve incluir:
1. Painel de Linhas de Produção: visão em cards das estações operacionais com botão rápido de solicitação de peças (One-Click Reorder).
2. Kanban Logístico do Almoxarifado: colunas interativas (Pendente, Separação, Em Trânsito, Concluído) com cronômetro de tempo de espera e indicador de criticidade.
3. Controle de Estoque na Borda de Linha: monitor de estoque mínimo com alertas visuais Poka-Yoke contra rupturas.
4. Painel Andon em Tempo Real: módulo visual de alerta sonoro/visual para avisar supervisores sobre linhas paradas por falta de insumo.
5. Indicadores Chave (OEE Logístico, Lead Time Médio, OTIF Interno) com gráficos e tabela de histórico com busca e filtros por data e linha.

Crie uma interface profissional com design ergonômico, código modular e dados pré-carregados para teste imediato.`
  },
  {
    id: 'mobile_coletor',
    title: 'Prompt Focado em Mobile / Coletores Industriais',
    tag: 'Coletores Zebra / Android',
    description: 'Orientado para desenvolvimento de aplicativo mobile focado em leitura de código de barras/QR Code e ergonomia para operadores em movimento.',
    promptText: `Desenvolva a interface e a lógica de um aplicativo mobile voltado para Coletores de Dados Industriais Android e operadores de logística interna (abastecedores de linha de montagem).

Requisitos fundamentais:
- Interface otimizada para uso em telas verticais de 5 polegadas com botões táteis grandes (mínimo 48px de altura para toque com luvas).
- Simulação de leitor de código de barras/QR Code para bipar a etiqueta da caixa vazia e confirmar a entrega no posto de trabalho.
- Rota de entrega (Milk Run): lista sequencial de paradas otimizadas por corredor e estação.
- Suporte a modo offline com sincronização automática de ordens.
- Telas: Login por crachá/PIN, Lista de Tarefas de Separação (Picking), Rota de Entrega e Notificações de Urgência.`
  }
];
