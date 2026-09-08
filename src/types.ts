export type ActiveTab = 'specification' | 'prompt' | 'simulator';

export interface SpecSection {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  icon: string;
  summary: string;
  content: {
    intro?: string;
    subsections: {
      title: string;
      desc: string;
      items?: string[];
      tags?: string[];
      highlight?: string;
    }[];
  };
}

export interface SupplyItem {
  id: string;
  code: string;
  name: string;
  category: 'Fixadores' | 'Eletrônicos' | 'Mecânicos' | 'Insumos / Químicos' | 'Embalagens';
  unit: string;
  currentStock: number;
  safetyStock: number;
  maxStock: number;
  location: string;
  qrCode: string;
}

export interface ProductionLine {
  id: string;
  name: string;
  station: string;
  sector: string;
  status: 'operational' | 'alert' | 'stopped';
  activeOrders: number;
}

export interface SupplyOrder {
  id: string;
  orderNumber: string;
  lineId: string;
  lineName: string;
  station: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  quantityRequested: number;
  unit: string;
  priority: 'normal' | 'urgente' | 'critico_parada';
  status: 'pendente' | 'em_separacao' | 'em_transito' | 'entregue' | 'cancelado';
  createdAt: string;
  estimatedDeliveryMinutes: number;
  requesterName: string;
  carrierName?: string;
  deliveredAt?: string;
}

export interface SimulationStats {
  totalOrders: number;
  deliveredCount: number;
  pendingCount: number;
  averageResponseMinutes: number;
  onTimeDeliveryRate: number;
  preventedStops: number;
}
