import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Icon } from '@iconify/react';

// Componente do Mapa do Brasil - Imagem SVG simples
const BrazilMap = ({ data, onRegionClick }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '200px', 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <img 
        src="/assets/images/brazil-map.svg" 
        alt="Mapa do Brasil" 
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxWidth: '250px',
          maxHeight: '180px'
        }}
        onError={(e) => {
          // Fallback se a imagem não carregar
          e.target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.innerHTML = `
            <div style="
              width: 250px; 
              height: 180px; 
              background: linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1e3a8a 100%); 
              border-radius: 12px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: white; 
              font-weight: bold;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              border: 2px solid #e5e7eb;
            ">
              <div style="text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 12px;">🇧🇷</div>
                <div style="font-size: 1.1rem;">Mapa do Brasil</div>
                <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 4px;">Compras por região</div>
              </div>
            </div>
          `;
          e.target.parentNode.appendChild(fallback.firstChild);
        }}
      />
    </div>
  );
};

// Componente do Gráfico de Pizza Interativo
const InteractivePieChart = ({ data }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const centerX = 150;
  const centerY = 150;
  const radius = 120;

  const createPieSegment = (item, index) => {
    const percentage = (item.value / total) * 100;
    const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
    const endAngle = startAngle + (percentage * 360 / 100);
    
    const x1 = centerX + radius * Math.cos(startAngle * Math.PI / 180);
    const y1 = centerY + radius * Math.sin(startAngle * Math.PI / 180);
    const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
    const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    return {
      path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      percentage,
      value: item.value,
      label: item.label,
      color: item.color
    };
  };

  const segments = data.map((item, index) => createPieSegment(item, index));

  return (
    <div className="position-relative">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#e9ecef" strokeWidth="30" />
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.path}
            fill={segment.color}
            style={{ 
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              filter: hoveredSegment === index ? 'brightness(1.1)' : 'none'
            }}
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
          />
        ))}
      </svg>
      
      {/* Tooltip */}
      {hoveredSegment !== null && (
        <div 
          className="position-absolute bg-dark text-white p-3 rounded shadow"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            fontSize: '14px',
            minWidth: '150px',
            textAlign: 'center'
          }}
        >
          <div className="fw-bold">{segments[hoveredSegment].label}</div>
          <div>R$ {segments[hoveredSegment].value.toLocaleString()}</div>
          <div className="text-muted">{segments[hoveredSegment].percentage.toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
};

const AfterPayLayer = () => {
  // Dados dos cards superiores (summaryCards)
  const summaryCards = [
    {
      title: "Vendas hoje",
      value: "R$ 40.000",
      percentage: "80%",
      comparison: "em relação ao mês passado",
      trend: "up",
      color: "success",
      icon: "mdi:cart",
      bgColor: "#e8f5e8"
    },
    {
      title: "Vendas na semana",
      value: "R$ 235.000",
      percentage: "95%",
      comparison: "em relação ao mês passado",
      trend: "up",
      color: "primary",
      icon: "mdi:shopping",
      bgColor: "#e8f0ff"
    },
    {
      title: "Vendas no mês",
      value: "R$ 630.000",
      percentage: "30%",
      comparison: "em relação ao mês passado",
      trend: "down",
      color: "warning",
      icon: "mdi:hand-coin",
      bgColor: "#fff3cd"
    }
  ];

  // Dados do gráfico de pizza (chartData)
  const chartData = [
    { label: "%Vendas", value: 45000, color: "#0d6efd" },
    { label: "%Reembolso", value: 12000, color: "#6f42c1" },
    { label: "%Up sell", value: 15000, color: "#198754" },
    { label: "%Recompra", value: 8000, color: "#fd7e14" }
  ];

  // Dados do mapa do Brasil
  const mapData = [
    { region: 'SP', orders: 1250, revenue: 45000 },
    { region: 'RJ', orders: 890, revenue: 32000 },
    { region: 'MG', orders: 750, revenue: 28000 },
    { region: 'RS', orders: 680, revenue: 25000 },
    { region: 'PR', orders: 620, revenue: 22000 },
    { region: 'SC', orders: 450, revenue: 18000 },
    { region: 'BA', orders: 420, revenue: 16000 },
    { region: 'GO', orders: 380, revenue: 14000 },
    { region: 'PE', orders: 320, revenue: 12000 },
    { region: 'CE', orders: 280, revenue: 10000 },
    { region: 'PA', orders: 150, revenue: 6000 },
    { region: 'AM', orders: 120, revenue: 4500 },
    { region: 'MT', orders: 180, revenue: 7000 },
    { region: 'MS', orders: 220, revenue: 8000 },
    { region: 'ES', orders: 290, revenue: 11000 },
    { region: 'PB', orders: 190, revenue: 7000 },
    { region: 'RN', orders: 160, revenue: 6000 },
    { region: 'AL', orders: 140, revenue: 5000 },
    { region: 'SE', orders: 130, revenue: 4800 },
    { region: 'PI', orders: 110, revenue: 4000 },
    { region: 'MA', orders: 95, revenue: 3500 },
    { region: 'TO', orders: 85, revenue: 3200 },
    { region: 'RO', orders: 75, revenue: 2800 },
    { region: 'AC', orders: 45, revenue: 1700 },
    { region: 'RR', orders: 35, revenue: 1300 },
    { region: 'AP', orders: 55, revenue: 2000 },
    { region: 'DF', orders: 200, revenue: 7500 }
  ];

  // Dados do kanban (kanbanColumns) - seguindo a segunda imagem
  const kanbanColumns = [
    {
      id: 'reportados',
      title: 'REPORTADOS',
      color: 'warning',
      icon: 'mdi:alert-circle',
      cards: [
        {
          id: '1',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Em análise',
          statusColor: 'warning',
          date: '25/03/2025',
          avatar: '/assets/images/avatar/avatar1.png'
        },
        {
          id: '2',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Em análise',
          statusColor: 'warning',
          date: '25/03/2025',
          avatar: '/assets/images/avatar/avatar2.png'
        }
      ]
    },
    {
      id: 'enviados',
      title: 'ENVIADOS',
      color: 'info',
      icon: 'mdi:truck-delivery',
      cards: [
        {
          id: '3',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Preparando',
          statusColor: 'info',
          date: '23/03/2025',
          avatar: '/assets/images/avatar/avatar-group1.png'
        },
        {
          id: '4',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Preparando',
          statusColor: 'info',
          date: '23/03/2025',
          avatar: '/assets/images/avatar/avatar-group2.png'
        }
      ]
    },
    {
      id: 'agendados',
      title: 'AGENDADOS PARA ENTREGA',
      color: 'warning',
      icon: 'mdi:calendar-clock',
      cards: [
        {
          id: '5',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Agendado',
          statusColor: 'warning',
          date: '24/03/2025',
          avatar: '/assets/images/avatar/avatar-group3.png'
        }
      ]
    },
    {
      id: 'correios',
      title: 'RETIRAR NOS CORREIOS',
      color: 'success',
      icon: 'mdi:package-variant',
      cards: [
        {
          id: '6',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Pronto para retirar',
          statusColor: 'success',
          date: '23/03/2025',
          avatar: '/assets/images/avatar/avatar-group4.png'
        }
      ]
    },
    {
      id: 'atencao',
      title: 'REQUER ATENÇÃO',
      color: 'danger',
      icon: 'mdi:alert-decagram',
      cards: [
        {
          id: '7',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Atenção exigida',
          statusColor: 'danger',
          date: '23/03/2025',
          avatar: '/assets/images/avatar/avatar-group5.png'
        }
      ]
    },
    {
      id: 'entregues',
      title: 'ENTREGUES',
      color: 'success',
      icon: 'mdi:check-circle',
      cards: [
        {
          id: '8',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Entregue',
          statusColor: 'success',
          date: '22/03/2025',
          avatar: '/assets/images/avatar/avatar-group6.png'
        },
        {
          id: '9',
          name: 'Carlos Araújo Martins',
          product: '03 Pote Angolano + 01 Pote Francês + 03 Pote Angolano + 01 Pote Francês',
          status: 'Entregue',
          statusColor: 'success',
          date: '22/03/2025',
          avatar: '/assets/images/avatar/avatar-shape1.png'
        }
      ]
    }
  ];

  const [columns, setColumns] = useState(kanbanColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destColumn = columns.find(col => col.id === destination.droppableId);
      const sourceCards = [...sourceColumn.cards];
      const destCards = [...destColumn.cards];
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, cards: sourceCards };
        }
        if (col.id === destination.droppableId) {
          return { ...col, cards: destCards };
        }
        return col;
      }));
    } else {
      const column = columns.find(col => col.id === source.droppableId);
      const copiedCards = [...column.cards];
      const [removed] = copiedCards.splice(source.index, 1);
      copiedCards.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, cards: copiedCards };
        }
        return col;
      }));
    }
  };

  const handleRegionClick = (region) => {
    const regionData = mapData.find(d => d.region === region.id);
    if (regionData) {
      alert(`${region.name}: ${regionData.orders} pedidos - R$ ${regionData.revenue.toLocaleString()}`);
    }
  };

  return (
    <div className="container-fluid">
      {/* Título */}
      <div className="mb-4">
        <h2 className="fw-bold">After Pay</h2>
      </div>

      {/* Seção Principal - 3 Colunas */}
      <div className="row g-4 mb-4">
        {/* Coluna 1 - Cards de Vendas */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom">
              <h6 className="card-title mb-0">Meus produtos</h6>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {summaryCards.map((card, index) => (
                  <div key={index} className="position-relative rounded p-3" style={{ 
                    backgroundColor: card.bgColor,
                    borderLeft: `4px solid ${index === 0 ? '#0d6efd' : index === 1 ? '#6f42c1' : '#fd7e14'}`
                  }}>
                    <div className="d-flex justify-content-between align-items-start">
                                              <div className="flex-grow-1">
                          <div className="text-muted mb-2" style={{ fontSize: '16px', fontWeight: 'normal', lineHeight: '1.2' }}>{card.title}</div>
                          <div className="text-dark mb-2" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2' }}>{card.value}</div>
                        <div className="d-flex align-items-center gap-1">
                          <span className={`badge ${card.trend === 'up' ? 'bg-success' : 'bg-warning'} rounded-pill d-flex align-items-center`} style={{ 
                            fontSize: '0.75rem', 
                            padding: '4px 8px',
                            gap: '2px'
                          }}>
                            <Icon 
                              icon={card.trend === 'up' ? 'mdi:trending-up' : 'mdi:trending-down'} 
                              style={{ fontSize: '0.875rem' }}
                            />
                            {card.percentage}
                          </span>
                          <span className="text-muted ms-1" style={{ fontSize: '0.8rem' }}>
                            {card.comparison}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ 
                        width: '48px', 
                        height: '48px',
                        backgroundColor: index === 0 ? '#e3f2fd' : index === 1 ? '#f3e5f5' : '#fff3cd'
                      }}>
                        <Icon 
                          icon={card.icon} 
                          style={{ 
                            fontSize: '1.5rem',
                            color: index === 0 ? '#1976d2' : index === 1 ? '#7b1fa2' : '#f57c00'
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2 - Gráfico de Pizza */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">Balanço geral de vendas de After Pay</h6>
              <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                <option>Mensal</option>
                <option>Semanal</option>
                <option>Diário</option>
              </select>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
                <InteractivePieChart data={chartData} />
              </div>
              <div className="row g-3">
                {chartData.map((item, index) => (
                  <div key={index} className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle" 
                        style={{ 
                          width: '14px', 
                          height: '14px', 
                          backgroundColor: item.color 
                        }} 
                      />
                      <small className="text-muted fw-semibold">{item.label}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 3 - Mapa */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-bottom">
              <h6 className="card-title mb-0">Compras por região</h6>
            </div>
            <div className="card-body">
              <div className="d-flex h-100">
                <div className="me-4">
                  <div className="d-flex flex-column gap-2">
                    {[
                      { label: "Mais de 1000 pedidos", color: "#87ceeb" },
                      { label: "Mais de 500 pedidos", color: "#4682b4" },
                      { label: "Mais de 200 pedidos", color: "#191970" },
                      { label: "Mais de 100 pedidos", color: "#008b8b" },
                      { label: "Mais de 50 pedidos", color: "#006400" },
                      { label: "Mais de 10 pedidos", color: "#000000" },
                      { label: "Nenhum pedido", color: "#000000" }
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="btn btn-sm"
                        style={{ 
                          backgroundColor: item.color, 
                          border: '1px solid #dee2e6',
                          width: '130px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                  <BrazilMap data={mapData} onRegionClick={handleRegionClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom">
          <h6 className="card-title mb-0">Gerenciamento de Pedidos</h6>
        </div>
        <div className="card-body p-0">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="d-flex gap-4 overflow-auto p-4" style={{ minHeight: '600px' }}>
              {columns.map((column) => (
                <div key={column.id} className="card border-0 shadow-sm" style={{ minWidth: '320px' }}>
                  <div className={`card-header bg-${column.color} text-white d-flex justify-content-between align-items-center`}>
                    <div className="d-flex align-items-center gap-2">
                      <Icon icon={column.icon} />
                      <span className="fw-semibold">{column.title}</span>
                    </div>
                    <span className="badge bg-light text-dark">{column.cards.length}</span>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        className="card-body p-4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: '500px' }}
                      >
                        {column.cards.map((card, index) => (
                          <Draggable key={card.id} draggableId={card.id} index={index}>
                            {(provided) => (
                              <div
                                className="card border-0 shadow-sm mb-3"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ 
                                  borderLeft: '4px solid #0d6efd',
                                  borderRadius: '8px',
                                  minHeight: '140px'
                                }}
                              >
                                <div className="card-body p-3">
                                  <div className="d-flex align-items-start justify-content-between mb-3">
                                    <strong className="fw-bold" style={{ fontSize: '1rem', lineHeight: '1.2' }}>{card.name}</strong>
                                    <img
                                      src={card.avatar}
                                      alt={card.name}
                                      className="rounded-circle"
                                      width="48"
                                      height="48"
                                    />
                                  </div>
                                  <p className="text-muted mb-3" style={{ 
                                    fontSize: '0.85rem', 
                                    lineHeight: '1.3',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}>{card.product}</p>
                                  <div className="mb-3">
                                    <span className="badge rounded-pill" style={{ 
                                      backgroundColor: '#e3f2fd', 
                                      color: '#0d6efd',
                                      fontSize: '0.8rem',
                                      padding: '6px 12px'
                                    }}>
                                      {card.status}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="rounded-circle" style={{ 
                                        width: '8px', 
                                        height: '8px', 
                                        backgroundColor: '#0d6efd' 
                                      }}></div>
                                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        Pedido realizado
                                      </small>
                                    </div>
                                    <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                      {card.date}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default AfterPayLayer;
