import React, { useState, useMemo } from 'react';
import { SupplyItem, ProductionLine, SupplyOrder, SimulationStats } from '../types';
import { INITIAL_ITEMS, INITIAL_LINES, INITIAL_ORDERS } from '../data/mockSupplyData';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertTriangle, 
  Flame, 
  RefreshCw, 
  Package, 
  Layers, 
  Activity, 
  Check, 
  Filter, 
  ChevronRight,
  TrendingUp,
  MapPin,
  QrCode,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  // State for simulator
  const [orders, setOrders] = useState<SupplyOrder[]>(INITIAL_ORDERS);
  const [items, setItems] = useState<SupplyItem[]>(INITIAL_ITEMS);
  const [lines, setLines] = useState<ProductionLine[]>(INITIAL_LINES);

  // Filter & modal state
  const [selectedLineFilter, setSelectedLineFilter] = useState<string>('all');
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState<boolean>(false);
  const [andonActive, setAndonActive] = useState<boolean>(false);

  // New Order Form state
  const [formLineId, setFormLineId] = useState<string>(lines[0]?.id || '');
  const [formItemId, setFormItemId] = useState<string>(items[0]?.id || '');
  const [formQuantity, setFormQuantity] = useState<number>(1);
  const [formPriority, setFormPriority] = useState<'normal' | 'urgente' | 'critico_parada'>('urgente');

  // Simulator tabs
  const [simulatorSubTab, setSimulatorSubTab] = useState<'kanban' | 'estoque' | 'linhas'>('kanban');

  // Stats calculation
  const stats: SimulationStats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter(o => o.status === 'entregue').length;
    const pending = orders.filter(o => o.status === 'pendente' || o.status === 'em_separacao' || o.status === 'em_transito').length;
    return {
      totalOrders: total,
      deliveredCount: delivered,
      pendingCount: pending,
      averageResponseMinutes: 7.2,
      onTimeDeliveryRate: 97.4,
      preventedStops: 18
    };
  }, [orders]);

  // Advance order status
  const handleAdvanceStatus = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      if (order.status === 'pendente') {
        return {
          ...order,
          status: 'em_separacao',
          carrierName: 'Lucas Ferraz (Rebocador 03)'
        };
      } else if (order.status === 'em_separacao') {
        return {
          ...order,
          status: 'em_transito'
        };
      } else if (order.status === 'em_transito') {
        // Upon delivery, decrement warehouse stock and record delivery
        setItems(prevItems => prevItems.map(item => {
          if (item.id === order.itemId) {
            return {
              ...item,
              currentStock: Math.max(0, item.currentStock - order.quantityRequested)
            };
          }
          return item;
        }));

        return {
          ...order,
          status: 'entregue',
          deliveredAt: 'Agora mesmo'
        };
      }
      return order;
    }));
  };

  // Create new order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedLine = lines.find(l => l.id === formLineId) || lines[0];
    const selectedItem = items.find(i => i.id === formItemId) || items[0];

    const newOrder: SupplyOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `ABAST-2026-0${Math.floor(500 + Math.random() * 499)}`,
      lineId: selectedLine.id,
      lineName: selectedLine.name,
      station: selectedLine.station,
      itemId: selectedItem.id,
      itemCode: selectedItem.code,
      itemName: selectedItem.name,
      quantityRequested: formQuantity,
      unit: selectedItem.unit,
      priority: formPriority,
      status: 'pendente',
      createdAt: 'Agora mesmo',
      estimatedDeliveryMinutes: formPriority === 'critico_parada' ? 4 : formPriority === 'urgente' ? 8 : 15,
      requesterName: 'Operador da Estação'
    };

    setOrders([newOrder, ...orders]);
    setIsNewOrderModalOpen(false);

    if (formPriority === 'critico_parada') {
      setAndonActive(true);
      setTimeout(() => setAndonActive(false), 8000);
    }
  };

  // Reset simulator to initial
  const handleReset = () => {
    setOrders(INITIAL_ORDERS);
    setItems(INITIAL_ITEMS);
    setLines(INITIAL_LINES);
    setAndonActive(false);
  };

  // Filtered orders
  const filteredOrders = orders.filter(o => 
    selectedLineFilter === 'all' || o.lineId === selectedLineFilter
  );

  return (
    <div className="space-y-6">
      {/* Andon Notification Banner if triggered */}
      {andonActive && (
        <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg border-2 border-red-400 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-amber-300 animate-pulse" />
            <div>
              <span className="font-black text-sm uppercase tracking-wider block">
                ALERTA ANDON ACIONADO: LINHA COM RISCO DE PARADA!
              </span>
              <span className="text-xs text-red-100">
                Prioridade máxima despachada para o Rebocador/Almoxarifado. SLA: 4 minutos.
              </span>
            </div>
          </div>
          <button 
            onClick={() => setAndonActive(false)}
            className="px-3 py-1.5 bg-white text-red-700 font-bold rounded-lg text-xs hover:bg-red-50 cursor-pointer"
          >
            Reconhecer Alarme
          </button>
        </div>
      )}

      {/* Simulator Control & KPI Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Chamados Ativos</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">{stats.pendingCount}</span>
            <span className="text-xs text-amber-600 font-bold">em fluxo</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Entregues no Turno</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600">{stats.deliveredCount}</span>
            <span className="text-xs text-emerald-700 font-bold">concluídos</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Lead Time Médio</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900">{stats.averageResponseMinutes}</span>
            <span className="text-xs text-slate-500 font-semibold">minutos</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">OTIF Interno (SLA)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-600">{stats.onTimeDeliveryRate}%</span>
            <span className="text-xs text-slate-500">no prazo</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block">Paradas Evitadas</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-amber-600">{stats.preventedStops}</span>
            <span className="text-xs text-slate-500">ações JIT</span>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Ambiente</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <button
            onClick={handleReset}
            className="w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Dados</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSimulatorSubTab('kanban')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              simulatorSubTab === 'kanban'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Kanban de Abastecimento
          </button>
          <button
            onClick={() => setSimulatorSubTab('estoque')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              simulatorSubTab === 'estoque'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Estoque Borda de Linha
          </button>
          <button
            onClick={() => setSimulatorSubTab('linhas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              simulatorSubTab === 'linhas'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Postos de Trabalho (4 Linhas)
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter by line */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedLineFilter}
              onChange={(e) => setSelectedLineFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">Todas as Linhas</option>
              {lines.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Solicitar Peça (E-Kanban)</span>
          </button>
        </div>
      </div>

      {/* Main View According to Sub-Tab */}
      {simulatorSubTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Column 1: Pendentes */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  1. Pendentes
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-full text-slate-700 border border-slate-200">
                {filteredOrders.filter(o => o.status === 'pendente').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {filteredOrders.filter(o => o.status === 'pendente').map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onAdvance={() => handleAdvanceStatus(order.id)} 
                  actionLabel="Aceitar Separação (Picking)"
                />
              ))}
              {filteredOrders.filter(o => o.status === 'pendente').length === 0 && (
                <div className="p-6 text-center text-xs text-slate-400 italic">
                  Nenhum chamado pendente no momento
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Em Separação */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Em Separação
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-full text-slate-700 border border-slate-200">
                {filteredOrders.filter(o => o.status === 'em_separacao').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {filteredOrders.filter(o => o.status === 'em_separacao').map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onAdvance={() => handleAdvanceStatus(order.id)} 
                  actionLabel="Despachar no Milk Run"
                />
              ))}
              {filteredOrders.filter(o => o.status === 'em_separacao').length === 0 && (
                <div className="p-6 text-center text-xs text-slate-400 italic">
                  Nenhuma ordem em separação
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Em Rota / Milk Run */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  3. Em Transporte
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-full text-slate-700 border border-slate-200">
                {filteredOrders.filter(o => o.status === 'em_transito').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {filteredOrders.filter(o => o.status === 'em_transito').map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onAdvance={() => handleAdvanceStatus(order.id)} 
                  actionLabel="Confirmar Entrega no Posto"
                />
              ))}
              {filteredOrders.filter(o => o.status === 'em_transito').length === 0 && (
                <div className="p-6 text-center text-xs text-slate-400 italic">
                  Nenhum carrinho em trânsito
                </div>
              )}
            </div>
          </div>

          {/* Column 4: Entregues */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  4. Concluídos (Hoje)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded-full text-slate-700 border border-slate-200">
                {filteredOrders.filter(o => o.status === 'entregue').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {filteredOrders.filter(o => o.status === 'entregue').map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  actionLabel=""
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Estoque Borda de Linha */}
      {simulatorSubTab === 'estoque' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Supermercado de Peças & Saldo de Almoxarifado
              </h3>
              <p className="text-xs text-slate-500">
                Monitoramento contínuo de estoque de segurança com sinalização Poka-Yoke visual
              </p>
            </div>
            <span className="text-xs text-slate-400">
              {items.length} itens cadastrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Código / Part Number</th>
                  <th className="py-3 px-4">Descrição da Peça</th>
                  <th className="py-3 px-4">Categoria</th>
                  <th className="py-3 px-4">Endereço no Estoque</th>
                  <th className="py-3 px-4 text-center">Estoque Atual</th>
                  <th className="py-3 px-4 text-center">Estoque Mínimo</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => {
                  const isCritical = item.currentStock <= item.safetyStock / 2;
                  const isLow = item.currentStock <= item.safetyStock;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {item.code}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800 block">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Lote: {item.unit}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-sm">
                        {item.currentStock}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-500">
                        {item.safetyStock}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isCritical ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                            Crítico
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            Atenção
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            Normal
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setFormItemId(item.id);
                            setIsNewOrderModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
                        >
                          Requisitar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Postos de Trabalho & Linhas */}
      {simulatorSubTab === 'linhas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lines.map(line => {
            const lineOrders = orders.filter(o => o.lineId === line.id && o.status !== 'entregue');

            return (
              <div key={line.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {line.sector}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {line.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        {line.station}
                      </p>
                    </div>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Operando
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Chamados Ativos para este Posto ({lineOrders.length}):
                    </span>
                    {lineOrders.length > 0 ? (
                      lineOrders.map(lo => (
                        <div key={lo.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-800">{lo.itemName}</span>
                            <span className="block text-[11px] text-slate-500 font-mono">Qtd: {lo.quantityRequested} {lo.unit}</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-800">
                            {lo.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Linha totalmente abastecida. Nenhuma pendência.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFormLineId(line.id);
                      setFormPriority('critico_parada');
                      setIsNewOrderModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-red-600" />
                    <span>Andon Linha Parada</span>
                  </button>

                  <button
                    onClick={() => {
                      setFormLineId(line.id);
                      setIsNewOrderModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Solicitar Peça</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Nova Solicitação de Peça */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  +
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Nova Chamada de Abastecimento
                  </h3>
                  <p className="text-xs text-slate-500">
                    Disparo de E-Kanban para o Almoxarifado / Milk Run
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewOrderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="mt-4 space-y-4 text-xs">
              {/* Select Line */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  1. Selecione o Posto de Trabalho / Linha de Montagem:
                </label>
                <select
                  value={formLineId}
                  onChange={(e) => setFormLineId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-amber-500"
                  required
                >
                  {lines.map(line => (
                    <option key={line.id} value={line.id}>
                      {line.name} — {line.station}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Item */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  2. Componente / Insumo Necessário:
                </label>
                <select
                  value={formItemId}
                  onChange={(e) => setFormItemId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-amber-500"
                  required
                >
                  {items.map(item => (
                    <option key={item.id} value={item.id}>
                      [{item.code}] {item.name} (Saldo: {item.currentStock} {item.unit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    3. Quantidade:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-bold focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    4. Nível de Urgência:
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="normal">Normal (Reposição padrão)</option>
                    <option value="urgente">Urgente (Abaixo de reserva)</option>
                    <option value="critico_parada">🚨 CRÍTICO - RISCO DE PARADA</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Emitir Chamado E-Kanban</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface OrderCardProps {
  order: SupplyOrder;
  onAdvance?: () => void;
  actionLabel?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onAdvance, actionLabel }) => {
  const isUrgent = order.priority === 'urgente';
  const isCritical = order.priority === 'critico_parada';

  return (
    <div className={`p-4 rounded-xl bg-white border transition-all shadow-xs ${
      isCritical
        ? 'border-red-400 bg-red-50/20 ring-1 ring-red-400'
        : isUrgent
        ? 'border-amber-300 bg-amber-50/10'
        : 'border-slate-200'
    }`}>
      {/* Top row */}
      <div className="flex items-center justify-between text-[11px] mb-1.5">
        <span className="font-mono font-bold text-slate-500">{order.orderNumber}</span>
        {isCritical ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white animate-pulse">
            🚨 Linha Parada
          </span>
        ) : isUrgent ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900">
            Urgente
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
            Normal
          </span>
        )}
      </div>

      {/* Item info */}
      <h5 className="text-xs font-bold text-slate-900 leading-snug">
        {order.itemName}
      </h5>
      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
        <span className="font-mono text-slate-500">SKU: {order.itemCode}</span>
        <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
          {order.quantityRequested} {order.unit}
        </span>
      </div>

      {/* Destination station */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-0.5">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate font-semibold text-slate-800">{order.station}</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>{order.createdAt}</span>
          <span>SLA Est.: {order.estimatedDeliveryMinutes} min</span>
        </div>
      </div>

      {/* Advance Action Button */}
      {actionLabel && onAdvance && (
        <button
          onClick={onAdvance}
          className="mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span>{actionLabel}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {order.status === 'entregue' && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-semibold">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Entregue com Sucesso
          </span>
          <span>{order.deliveredAt}</span>
        </div>
      )}
    </div>
  );
};
