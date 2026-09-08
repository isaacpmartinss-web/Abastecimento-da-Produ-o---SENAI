import { SpecSection } from '../types';

export const SPECIFICATION_SECTIONS: SpecSection[] = [
  {
    id: 'conceitos',
    number: 1,
    title: 'Conceitos Fundamentais do Sistema de Abastecimento',
    shortTitle: '1. Conceitos Fundamentais',
    icon: 'Factory',
    summary: 'Princípios do abastecimento Just-In-Time, E-Kanban, eliminação de gargalos e sincronização entre almoxarifado e linha produtiva.',
    content: {
      intro: 'Um Sistema de Abastecimento da Produção (Internal Supply Logistics / Line Feeding System) é a espinha dorsal operacional que conecta o armazém/supermercado de peças às estações de trabalho e células de montagem no chão de fábrica.',
      subsections: [
        {
          title: 'O que é o Sistema de Abastecimento',
          desc: 'É uma plataforma digital de orquestração logística interna que monitora a demanda de insumos na borda de linha (Point of Use - POU) e aciona fluxos contínuos de reposição, seja por consumo em tempo real ou por sinalização direta do operador.',
          items: [
            'Supermercado interno de componentes e armazéns pulmão',
            'Sistemas de rotas logísticas tipo Milk Run (trem rebocador com horários fixos)',
            'Sinalização visual e eletrônica (E-Kanban / Andon logístico)',
            'Integração direta com o plano mestre de produção (PCP) e ordens ativas'
          ]
        },
        {
          title: 'Objetivos Principais',
          desc: 'Garantir que os materiais certos cheguem ao posto de trabalho correto, na quantidade exata e no momento ideal (Lean / Just-in-Time).',
          items: [
            'Zero Parada de Linha: Evitar interrupções não planejadas por falta de componentes (stockout no posto)',
            'Redução de Estoque em Processo (WIP): Borda de linha limpa com apenas o estoque de segurança necessário',
            'Diminuição de Lead Time Logístico: Reduzir tempo de separação, transporte e confirmação de entrega',
            'Padronização de Rotas (Milk Run): Agrupar entregas em trajetos circulares otimizados',
            'Eliminação de Desperdícios: Eliminar movimentações desnecessárias do operador para buscar peças'
          ],
          highlight: 'Princípio Lean: O operador de montagem nunca deve abandonar seu posto para procurar ou transportar peças.'
        },
        {
          title: 'Importância Estratégica para a Indústria',
          desc: 'Em ambientes industriais modernos, a logística interna responde por até 30% do custo operacional da manufatura e impacta diretamente a disponibilidade no cálculo do OEE (Overall Equipment Effectiveness).',
          items: [
            'Elevação do OEE fabril ao mitigar paradas e microparadas logísticas',
            'Acuracidade de inventário por consumo rastreado ponto a ponto',
            'Transparência operacional com visão em tempo real de gargalos de fornecimento',
            'Ergonomia e segurança operacional ao organizar a circulação de carrinhos e empilhadeiras'
          ]
        }
      ]
    }
  },
  {
    id: 'funcionalidades',
    number: 2,
    title: 'Funcionalidades Essenciais da Aplicação',
    shortTitle: '2. Funcionalidades Essenciais',
    icon: 'Boxes',
    summary: 'Módulos cruciais de controle: estoque em tempo real, pedidos e E-Kanban, rastreamento Milk Run, alarmes Andon e relatórios de desempenho.',
    content: {
      intro: 'O aplicativo deve atender de ponta a ponta os três pilares operacionais: o Operador da Linha (solicitante), o Logístico/Abastecedor (atendente/separador) e a Gestão/PCP (supervisão).',
      subsections: [
        {
          title: '1. Gestão e Monitoramento de Estoque',
          desc: 'Controle de saldo no Almoxarifado Central, no Supermercado de Peças e no Ponto de Uso (borda de linha).',
          items: [
            'Visualização em tempo real de níveis de estoque com indicador visual (Verde: Seguro, Amarelo: Atenção, Vermelho: Crítico)',
            'Cálculo dinâmico de Estoque Mínimo, Ponto de Reposição e Lote Padrão de Abastecimento',
            'Histórico de movimentações, saídas para linha e devoluções de sobras de ordem de produção (OP)',
            'Localização precisa de prateleira, rua, módulo e nível no almoxarifado'
          ]
        },
        {
          title: '2. Criação e Gestão de Pedidos (E-Kanban)',
          desc: 'Mecanismo ágil para disparo de reposição sem atrito para o operador.',
          items: [
            'Chamada de Peça em 1 Toque (One-Click Supply) vinculada à estação de trabalho cadastrada',
            'Disparo automático por leitura de QR Code / Código de Barras da caixa vazia (Kanban físico para digital)',
            'Classificação por Nível de Criticidade: Normal (ciclo programado), Urgente (abaixo da reserva) e Linha Parada (alerta vermelho)',
            'Kanban visual interativo para a equipe logística (Pendente -> Em Separação -> Em Transporte -> Entregue)'
          ]
        },
        {
          title: '3. Rastreamento e Logística Interna (Milk Run)',
          desc: 'Acompanhamento do deslocamento físico dos materiais dentro do parque fabril.',
          items: [
            'Atribuição de ordens aos operadores de rebocador/carrinho com mapa ou sequência de paradas',
            'Agrupamento inteligente de pedidos por rota ou setor fabril para otimização de viagens',
            'Confirmação de entrega com biometria, leitura do crachá do operador ou bipagem do lote na estação',
            'Medição em tempo real do SLA e tempo decorrido desde o chamado'
          ]
        },
        {
          title: '4. Notificações e Sistema Andon Logístico',
          desc: 'Disparo de alertas visuais e sonoros instantâneos para priorização crítica.',
          items: [
            'Push notification para tablets de empilhadeiras e rebocadores ao surgir pedido urgente',
            'Painel Andon visual em telões no galpão logístico indicando linhas aguardando peça',
            'Escalação automática: se um chamado crítico não for atendido em 10 minutos, notifica a supervisão'
          ]
        },
        {
          title: '5. Relatórios e Indicadores de Desempenho (KPIs)',
          desc: 'Métricas para análise de causa-raiz e melhoria contínua (Kaizen).',
          items: [
            'Tempo Médio de Atendimento (Lead Time de Abastecimento: da requisição à entrega na estação)',
            'Taxa de Atendimento no Prazo (OTIF Interno - On-Time In-Full)',
            'Taxa de Ruptura de Linha (paradas evitadas vs. tempo de linha ociosa por falta de peça)',
            'Itens com maior índice de desabastecimento para reavaliação de lote mínimo no PCP'
          ]
        }
      ]
    }
  },
  {
    id: 'navegacao',
    number: 3,
    title: 'Estrutura de Navegação e Fluxo de Usuário',
    shortTitle: '3. Estrutura de Navegação',
    icon: 'Compass',
    summary: 'Arquitetura de informação, interfaces por perfil (Operador, Abastecedor, Supervisor) e jornada fluida de reabastecimento.',
    content: {
      intro: 'O sistema deve oferecer rotas de navegação simplificadas e adaptadas para dispositivos móveis robustos (coletores com leitor e tablets industriais) e desktops administrativos.',
      subsections: [
        {
          title: 'Perfis de Acesso e Menus Principais',
          desc: 'Cada papel operacional possui uma visão focada em sua responsabilidade imediata para evitar sobrecarga cognitiva.',
          items: [
            'Perfil Operador de Montagem: Menu simplificado com "Solicitar Peça", "Minhas Requisições", "E-Kanban da Célula" e "Chamar Andon"',
            'Perfil Abastecedor / Logístico: Fila de Separação (Picking), Modo Rota Milk Run, Bipador de Entrega e Inventário Rápido',
            'Perfil Supervisor / Gestão: Dashboard Geral, Gestão de Linhas & Postos, Cadastro de BOM (Lista Técnica), Relatórios e Auditoria'
          ]
        },
        {
          title: 'Telas Principais do Aplicativo',
          desc: 'Telas estruturadas para ambientes dinâmicos de fábrica com alto contraste e botões generosos.',
          items: [
            '1. Dashboard Operacional: Visão panorâmica do status das linhas de montagem (Verde/Amarelo/Vermelho)',
            '2. Painel Kanban de Ordens: Colunas drag-and-drop ou cartões organizados por urgência e tempo de espera',
            '3. Tela de Pedido Rápido: Seleção da estação atual + catálogo de peças associadas à linha com botão de ação rápida',
            '4. Tela de Picking & Rota: Lista de conferência de itens com código de localização no estoque e confirmação com scanner',
            '5. Central de Alertas e Andon: Visão em tempo real de chamados com risco iminente de desabastecimento',
            '6. Relatórios & Analytics: Gráficos de cumprimento de SLA, gargalos por turno e histórico exportável'
          ]
        },
        {
          title: 'Fluxo Ponta a Ponta do Usuário (Ciclo Fechado)',
          desc: 'A jornada típica desde a detecção da necessidade na bancada até a confirmação física.',
          items: [
            'Passo 1: Peça atinge nível amarelo na linha -> Operador toca em "Solicitar" ou bipa a caixa vazia',
            'Passo 2: O sistema cria a Ordem de Abastecimento e emite notificação para o Almoxarifado / Rota Milk Run',
            'Passo 3: Abastecedor aceita a ordem no coletor e realiza a separação física seguindo o endereço no estoque',
            'Passo 4: Abastecedor inicia o transporte com o carrinho/rebocador e o status muda para "Em Trânsito"',
            'Passo 5: Chegando ao posto de trabalho, o abastecedor bipa a estação; o operador confirma o recebimento',
            'Passo 6: Saldo de estoque é atualizado instantaneamente e a métrica de tempo de atendimento é registrada'
          ]
        }
      ]
    }
  },
  {
    id: 'componentes',
    number: 4,
    title: 'Componentes e Elementos de Interface',
    shortTitle: '4. Elementos de Interface (UI)',
    icon: 'LayoutGrid',
    summary: 'Design industrial ergonômico, botões de toque com luva (48px+), scanners integrados, formulários com autocompletar e filtros dinâmicos.',
    content: {
      intro: 'A interface deve ser desenhada para chão de fábrica: alta legibilidade sob iluminação industrial, suporte a telas touch resistivas/capacitivas usadas com luvas e resposta instantânea.',
      subsections: [
        {
          title: 'Botões e Ações Principais',
          desc: 'Componentes táteis dimensionados para evitar toques incorretos e acelerar comandos frequentes.',
          items: [
            'Botão de Ação Primária Flutuante (FAB) de "Nova Solicitação" ou "Escanear QR Code"',
            'Botão Andon de Emergência (Vermelho pulsante): aciona chamado de linha em risco iminente',
            'Botões de Ação Rápida com feedback sonoro e háptico (vibração ao confirmar no coletor)',
            'Interruptores de Status por clique ou swipe para avançar ordens (ex: arrastar para "Entregue")'
          ]
        },
        {
          title: 'Campos de Entrada e Formulários',
          desc: 'Minimização de digitação manual para prevenir erros operacionais (Poka-Yoke).',
          items: [
            'Campos com Scanner Nativo acoplado: acionamento direto da câmera ou do leitor laser do coletor Zebra/Honeywell',
            'Seletores de Quantidade por Incremento Pré-calculado (ex: botões "+1 caixa", "+5 caixas", lote fechado)',
            'Autocompletar inteligente pelo código da peça (Part Number) ou nome popular do item na fábrica',
            'Formulários divididos em no máximo 2 etapas (O que precisa? -> Qual quantidade?)'
          ]
        },
        {
          title: 'Cards e Indicadores de Status',
          desc: 'Sinalização visual imediata inspirada no sistema visual da Toyota (Visual Management).',
          items: [
            'Cards Kanban com barra lateral colorida indicando criticidade e tag de estação (ex: Posto A-04)',
            'Timer regressivo de SLA (ex: "Tempo restante: 06:45 min antes de risco de parada")',
            'Badges com contraste reforçado: Verde (Normal), Âmbar (Atenção), Vermelho Escuro (Urgente)',
            'Modo de tela cheia para visualização em totens ou Smart TVs nas linhas de produção'
          ]
        },
        {
          title: 'Filtros e Mecanismos de Busca',
          desc: 'Agilidade para encontrar itens em catálogos com centenas de peças.',
          items: [
            'Filtro rápido por Linha de Produção (ex: Linha 1 - Solda, Linha 2 - Montagem Final, Linha 3 - Testes)',
            'Filtro por Criticidade e Status da Ordem',
            'Barra de busca universal com busca instantânea por Part Number, fornecedor ou estação'
          ]
        }
      ]
    }
  },
  {
    id: 'dados',
    number: 5,
    title: 'Dados e Informações Processadas pelo Aplicativo',
    shortTitle: '5. Modelagem de Dados & KPIs',
    icon: 'Database',
    summary: 'Estruturas relacionais de estoque, lista de materiais (BOM), registros de ordens de serviço, métricas operacionais e auditoria.',
    content: {
      intro: 'O sistema deve orquestrar dados com precisão transacional, garantindo que não haja inconsistências entre o estoque físico e o digital.',
      subsections: [
        {
          title: 'Entidades Principais de Dados',
          desc: 'Modelos fundamentais para garantir a rastreabilidade completa de insumos.',
          items: [
            'Peça / Insumo: ID único, Código interno (SKU/Part Number), Descrição técnica, Categoria, Unidade de medida (un, kg, m, caixa), Endereço no armazém, Lote mínimo de embalagem',
            'Posto de Trabalho / Linha: ID, Nome da Linha, Estação/Célula, Setor fabril, Operador responsável no turno, Lista de peças permitidas no posto',
            'Ordem de Abastecimento: Número do protocolo, Posto de destino, Peça solicitada, Quantidade requisitada vs entregue, Nível de urgência, Timestamps (Criação, Aceite, Saída, Entrega), Responsáveis (Solicitante e Abastecedor)'
          ]
        },
        {
          title: 'Status do Fluxo de Pedidos',
          desc: 'Ciclo de vida determinístico de cada chamado de reposição.',
          items: [
            '1. "PENDENTE": Chamado emitido na linha, aguardando aceitação pela equipe de separação',
            '2. "EM SEPARAÇÃO": Abastecedor coletando os itens nas prateleiras do supermercado de peças',
            '3. "EM TRÂNSITO (ROTA)": Itens acomodados no carrinho/rebocador, em deslocamento para a célula',
            '4. "ENTREGUE": Peça conferida e deixada na gaveta/posto de uso da estação',
            '5. "CANCELADO": Requisição anulada com justificativa obrigatória (ex: erro de digitação)'
          ]
        },
        {
          title: 'Métricas e Indicadores Processados (KPIs)',
          desc: 'Cálculos contínuos para inteligência logística.',
          items: [
            'Lead Time Médio de Reposição (MTTR logístico): Tempo decorrido entre o clique da chamada e a entrega física',
            'Índice de Acuracidade de Atendimento (OTIF): % de ordens entregues na quantidade correta e antes do prazo limite',
            'Frequência de Solicitações Críticas por Posto: Identificação de estações que consomem mais rápido do que o padrão',
            'Taxa de Ruptura Zero: Número de dias ou turnos consecutivos sem interrupção de produção por falta de insumos'
          ]
        }
      ]
    }
  },
  {
    id: 'tecnicos',
    number: 6,
    title: 'Requisitos Técnicos Básicos e Arquitetura',
    shortTitle: '6. Requisitos Técnicos',
    icon: 'Cpu',
    summary: 'Stack multiplataforma, modo offline-first para galpões sem sinal Wi-Fi constante, autenticação rápida por crachá e integrações WMS/ERP.',
    content: {
      intro: 'O ambiente industrial impõe desafios técnicos severos: zonas de sombra de conectividade Wi-Fi, poeira, interferência eletromagnética e necessidade de baixa latência.',
      subsections: [
        {
          title: 'Plataforma Recomendada & Tecnologias',
          desc: 'Abordagem híbrida focada em confiabilidade e velocidade de desenvolvimento.',
          items: [
            'Frontend Web: React / Next.js com Tailwind CSS para dashboards administrativos e telas de monitoramento em totens',
            'App Mobile / Coletor: React Native ou Flutter com suporte total a coletores industriais Android (Zebra, Honeywell, Datalogic)',
            'Backend & API: Node.js (Express/Fastify) ou Python (FastAPI) com suporte a WebSockets (Socket.io) para atualizações instantâneas sem refresh',
            'Banco de Dados: PostgreSQL para integridade relacional transacional e Redis para fila de eventos e mensageria em tempo real'
          ]
        },
        {
          title: 'Capacidade Offline-First (Crítico para Indústria)',
          desc: 'O sistema nunca pode travar se o coletor passar por um corredor com sinal fraco.',
          items: [
            'Armazenamento local no dispositivo (SQLite / WatermelonDB / IndexedDB)',
            'Fila de sincronização em segundo plano (Background Sync) que dispara assim que o sinal for restabelecido',
            'Resolução de conflitos baseada no timestamp da ação física'
          ]
        },
        {
          title: 'Autenticação e Controle de Acesso (RBAC)',
          desc: 'Segurança ágil que não diminua a produtividade dos operadores.',
          items: [
            'Login rápido por leitura de crachá de proximidade (RFID/NFC) ou leitura de QR Code do crachá',
            'PIN numérico rápido de 4 dígitos para troca rápida de operador entre turnos',
            'Perfis de segurança bem delimitados: Operador (apenas solicita), Abastecedor (separa e transporta), Supervisor (edita parâmetros e aprova exceções)'
          ]
        },
        {
          title: 'Integração com Sistemas Legados (ERP / MES / WMS)',
          desc: 'Conectores padronizados para alimentar a inteligência fabril da empresa.',
          items: [
            'APIs RESTful e Webhooks para comunicação com SAP, TOTVS Protheus, Oracle ou sistemas MES proprietários',
            'Sincronização periódica da lista de materiais (BOM) e apontamento de consumo automático'
          ]
        }
      ]
    }
  }
];
