import { SupplyItem, ProductionLine, SupplyOrder } from '../types';

export const INITIAL_ITEMS: SupplyItem[] = [
  {
    id: 'item-1',
    code: 'FIX-M8-45',
    name: 'Parafuso Sextavado Flangeado M8x45 Inox',
    category: 'Fixadores',
    unit: 'caixa c/ 100',
    currentStock: 14,
    safetyStock: 10,
    maxStock: 50,
    location: 'Rua B - Prateleira 03 - Nível 2',
    qrCode: 'QR-FIX-M845'
  },
  {
    id: 'item-2',
    code: 'CH-SEN-IND',
    name: 'Sensor Indutivo PNP 24V M12 com Cabo 2m',
    category: 'Eletrônicos',
    unit: 'unidade',
    currentStock: 5,
    safetyStock: 8,
    maxStock: 30,
    location: 'Rua D - Armário 01 - Gaveta 4',
    qrCode: 'QR-CH-SENIND'
  },
  {
    id: 'item-3',
    code: 'MOT-PST-N23',
    name: 'Motor de Passo NEMA 23 Torque 2.2Nm',
    category: 'Mecânicos',
    unit: 'unidade',
    currentStock: 2,
    safetyStock: 6,
    maxStock: 20,
    location: 'Rua A - Prateleira 05 - Nível 1',
    qrCode: 'QR-MOT-PST'
  },
  {
    id: 'item-4',
    code: 'CAB-MAN-4X1',
    name: 'Cabo Manga Blindado 4x0.50mm² Industrial',
    category: 'Eletrônicos',
    unit: 'rolo 100m',
    currentStock: 8,
    safetyStock: 4,
    maxStock: 25,
    location: 'Rua C - Carretel 02',
    qrCode: 'QR-CAB-MAN'
  },
  {
    id: 'item-5',
    code: 'TRA-QUI-LOK',
    name: 'Trava Química de Roscas de Médio Torque (50g)',
    category: 'Insumos / Químicos',
    unit: 'frasco 50g',
    currentStock: 12,
    safetyStock: 5,
    maxStock: 40,
    location: 'Armário de Inflamáveis - Box 02',
    qrCode: 'QR-TRA-LOK'
  },
  {
    id: 'item-6',
    code: 'EMB-ESP-CX',
    name: 'Caixa de Papelão Microondulado com Colmeia Antiestática',
    category: 'Embalagens',
    unit: 'fardo c/ 25',
    currentStock: 18,
    safetyStock: 12,
    maxStock: 60,
    location: 'Rua F - Palete 04',
    qrCode: 'QR-EMB-CX'
  }
];

export const INITIAL_LINES: ProductionLine[] = [
  {
    id: 'line-1',
    name: 'Linha 1: Montagem Mecânica',
    station: 'Posto M-02 (Ajuste de Eixos)',
    sector: 'Setor Alfa',
    status: 'operational',
    activeOrders: 1
  },
  {
    id: 'line-2',
    name: 'Linha 2: Célula de Eletrônica',
    station: 'Posto E-04 (Chicote Elétrico)',
    sector: 'Setor Beta',
    status: 'alert',
    activeOrders: 1
  },
  {
    id: 'line-3',
    name: 'Linha 3: Integração & Testes',
    station: 'Posto T-01 (Bancada de Burn-in)',
    sector: 'Setor Gamma',
    status: 'operational',
    activeOrders: 0
  },
  {
    id: 'line-4',
    name: 'Linha 4: Embalagem Final',
    station: 'Posto P-03 (Paletização)',
    sector: 'Setor Delta',
    status: 'operational',
    activeOrders: 0
  }
];

export const INITIAL_ORDERS: SupplyOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'ABAST-2026-0491',
    lineId: 'line-2',
    lineName: 'Linha 2: Célula de Eletrônica',
    station: 'Posto E-04 (Chicote Elétrico)',
    itemId: 'item-2',
    itemCode: 'CH-SEN-IND',
    itemName: 'Sensor Indutivo PNP 24V M12 com Cabo 2m',
    quantityRequested: 4,
    unit: 'unidade',
    priority: 'critico_parada',
    status: 'pendente',
    createdAt: 'Hoje às 12:48',
    estimatedDeliveryMinutes: 5,
    requesterName: 'Carlos Mendonça (Op. Montador)',
  },
  {
    id: 'ord-102',
    orderNumber: 'ABAST-2026-0490',
    lineId: 'line-1',
    lineName: 'Linha 1: Montagem Mecânica',
    station: 'Posto M-02 (Ajuste de Eixos)',
    itemId: 'item-1',
    itemCode: 'FIX-M8-45',
    itemName: 'Parafuso Sextavado Flangeado M8x45 Inox',
    quantityRequested: 2,
    unit: 'caixa c/ 100',
    priority: 'urgente',
    status: 'em_separacao',
    createdAt: 'Hoje às 12:42',
    estimatedDeliveryMinutes: 8,
    requesterName: 'Renata Vasconcelos',
    carrierName: 'Lucas Ferraz (Rebocador 03)'
  },
  {
    id: 'ord-100',
    orderNumber: 'ABAST-2026-0489',
    lineId: 'line-3',
    lineName: 'Linha 3: Integração & Testes',
    station: 'Posto T-01 (Bancada de Burn-in)',
    itemId: 'item-4',
    itemCode: 'CAB-MAN-4X1',
    itemName: 'Cabo Manga Blindado 4x0.50mm² Industrial',
    quantityRequested: 1,
    unit: 'rolo 100m',
    priority: 'normal',
    status: 'entregue',
    createdAt: 'Hoje às 12:15',
    estimatedDeliveryMinutes: 12,
    requesterName: 'Marcos Silveira',
    carrierName: 'Lucas Ferraz (Rebocador 03)',
    deliveredAt: 'Hoje às 12:24'
  }
];
