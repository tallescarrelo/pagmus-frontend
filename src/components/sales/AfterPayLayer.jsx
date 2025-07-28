import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Icon } from '@iconify/react';

// Componente do Mapa do Brasil
const BrazilMap = ({ data, onRegionClick }) => {
  const getRegionColor = (regionId) => {
    const regionData = data.find(d => d.region === regionId);
    if (!regionData) return '#000000';
    
    if (regionData.orders > 1000) return '#87ceeb';
    if (regionData.orders > 500) return '#4682b4';
    if (regionData.orders > 200) return '#191970';
    if (regionData.orders > 100) return '#008b8b';
    if (regionData.orders > 50) return '#006400';
    if (regionData.orders > 10) return '#000000';
    return '#000000';
  };

  return (
    <div style={{ width: '100%', height: '200px', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 300 200" style={{ maxHeight: '200px' }}>
        {/* Norte */}
        <path d="M 120 30 L 150 25 L 180 30 L 150 35 Z" fill={getRegionColor('RR')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'RR', name: 'Roraima' })} />
        <text x="150" y="32" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>RR</text>
        
        <path d="M 80 40 L 120 30 L 150 50 L 120 60 Z" fill={getRegionColor('AM')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'AM', name: 'Amazonas' })} />
        <text x="120" y="50" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>AM</text>
        
        <path d="M 150 50 L 180 45 L 210 60 L 180 70 Z" fill={getRegionColor('PA')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'PA', name: 'Pará' })} />
        <text x="180" y="60" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>PA</text>
        
        <path d="M 120 60 L 150 50 L 180 70 L 150 80 Z" fill={getRegionColor('RO')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'RO', name: 'Rondônia' })} />
        <text x="150" y="70" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>RO</text>
        
        <path d="M 80 60 L 120 50 L 150 70 L 120 80 Z" fill={getRegionColor('AC')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'AC', name: 'Acre' })} />
        <text x="120" y="70" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>AC</text>
        
        <path d="M 210 60 L 240 55 L 270 70 L 240 80 Z" fill={getRegionColor('AP')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'AP', name: 'Amapá' })} />
        <text x="240" y="70" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>AP</text>
        
        {/* Nordeste */}
        <path d="M 180 80 L 210 75 L 240 90 L 210 100 Z" fill={getRegionColor('TO')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'TO', name: 'Tocantins' })} />
        <text x="210" y="90" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>TO</text>
        
        <path d="M 240 90 L 270 85 L 300 100 L 270 110 Z" fill={getRegionColor('MA')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'MA', name: 'Maranhão' })} />
        <text x="270" y="100" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>MA</text>
        
        <path d="M 270 110 L 300 105 L 330 120 L 300 130 Z" fill={getRegionColor('PI')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'PI', name: 'Piauí' })} />
        <text x="300" y="120" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>PI</text>
        
        <path d="M 300 100 L 330 95 L 360 110 L 330 120 Z" fill={getRegionColor('CE')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'CE', name: 'Ceará' })} />
        <text x="330" y="110" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>CE</text>
        
        <path d="M 330 95 L 360 90 L 390 105 L 360 115 Z" fill={getRegionColor('RN')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'RN', name: 'Rio Grande do Norte' })} />
        <text x="360" y="105" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>RN</text>
        
        <path d="M 360 90 L 390 85 L 420 100 L 390 110 Z" fill={getRegionColor('PB')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'PB', name: 'Paraíba' })} />
        <text x="390" y="100" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>PB</text>
        
        <path d="M 390 85 L 420 80 L 450 95 L 420 105 Z" fill={getRegionColor('PE')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'PE', name: 'Pernambuco' })} />
        <text x="420" y="95" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>PE</text>
        
        <path d="M 420 80 L 450 75 L 480 90 L 450 100 Z" fill={getRegionColor('AL')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'AL', name: 'Alagoas' })} />
        <text x="450" y="90" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>AL</text>
        
        <path d="M 450 75 L 480 70 L 510 85 L 480 95 Z" fill={getRegionColor('SE')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'SE', name: 'Sergipe' })} />
        <text x="480" y="85" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>SE</text>
        
        <path d="M 240 120 L 270 115 L 300 130 L 270 140 Z" fill={getRegionColor('BA')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'BA', name: 'Bahia' })} />
        <text x="270" y="130" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>BA</text>
        
        {/* Centro-Oeste */}
        <path d="M 150 100 L 180 95 L 210 110 L 180 120 Z" fill={getRegionColor('MT')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'MT', name: 'Mato Grosso' })} />
        <text x="180" y="110" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>MT</text>
        
        <path d="M 180 120 L 210 115 L 240 130 L 210 140 Z" fill={getRegionColor('MS')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'MS', name: 'Mato Grosso do Sul' })} />
        <text x="210" y="130" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>MS</text>
        
        <path d="M 240 130 L 270 125 L 300 140 L 270 150 Z" fill={getRegionColor('GO')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'GO', name: 'Goiás' })} />
        <text x="270" y="140" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>GO</text>
        
        <path d="M 270 140 L 285 138 L 300 142 L 285 145 Z" fill={getRegionColor('DF')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'DF', name: 'Distrito Federal' })} />
        <text x="285" y="142" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>DF</text>
        
        {/* Sudeste */}
        <path d="M 270 150 L 300 145 L 330 160 L 300 170 Z" fill={getRegionColor('MG')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'MG', name: 'Minas Gerais' })} />
        <text x="300" y="160" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>MG</text>
        
        <path d="M 330 145 L 360 140 L 390 155 L 360 165 Z" fill={getRegionColor('ES')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'ES', name: 'Espírito Santo' })} />
        <text x="360" y="155" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>ES</text>
        
        <path d="M 360 140 L 390 135 L 420 150 L 390 160 Z" fill={getRegionColor('RJ')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'RJ', name: 'Rio de Janeiro' })} />
        <text x="390" y="150" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>RJ</text>
        
        <path d="M 300 170 L 330 165 L 360 180 L 330 190 Z" fill={getRegionColor('SP')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'SP', name: 'São Paulo' })} />
        <text x="330" y="180" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>SP</text>
        
        {/* Sul */}
        <path d="M 285 190 L 315 185 L 345 200 L 315 210 Z" fill={getRegionColor('PR')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'PR', name: 'Paraná' })} />
        <text x="315" y="200" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>PR</text>
        
        <path d="M 315 210 L 345 205 L 375 220 L 345 230 Z" fill={getRegionColor('SC')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'SC', name: 'Santa Catarina' })} />
        <text x="345" y="220" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>SC</text>
        
        <path d="M 285 230 L 315 225 L 345 240 L 315 250 Z" fill={getRegionColor('RS')} stroke="#333" strokeWidth="0.5" style={{ cursor: 'pointer' }} onClick={() => onRegionClick && onRegionClick({ id: 'RS', name: 'Rio Grande do Sul' })} />
        <text x="315" y="240" textAnchor="middle" fontSize="6" fill="#fff" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>RS</text>
      </svg>
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

  // Dados do kanban (kanbanColumns)
  const kanbanColumns = [
    {
      id: 'pending',
      title: 'Pendentes',
      color: 'warning',
      icon: 'mdi:clock-outline',
      cards: [
        {
          id: '1',
          name: 'João Silva',
          product: 'Curso de Marketing Digital',
          status: 'Pendente',
          statusColor: 'warning',
          date: 'há 2 horas',
          avatar: '/assets/images/avatar/avatar-1.png'
        },
        {
          id: '2',
          name: 'Maria Santos',
          product: 'E-book de Vendas',
          status: 'Pendente',
          statusColor: 'warning',
          date: 'há 3 horas',
          avatar: '/assets/images/avatar/avatar-2.png'
        },
        {
          id: '3',
          name: 'Pedro Oliveira',
          product: 'Mentoria Online',
          status: 'Pendente',
          statusColor: 'warning',
          date: 'há 4 horas',
          avatar: '/assets/images/avatar/avatar-3.png'
        }
      ]
    },
    {
      id: 'processing',
      title: 'Processando',
      color: 'info',
      icon: 'mdi:cog',
      cards: [
        {
          id: '4',
          name: 'Ana Costa',
          product: 'Curso de Programação',
          status: 'Processando',
          statusColor: 'info',
          date: 'há 1 hora',
          avatar: '/assets/images/avatar/avatar-4.png'
        },
        {
          id: '5',
          name: 'Carlos Ferreira',
          product: 'Workshop de Liderança',
          status: 'Processando',
          statusColor: 'info',
          date: 'há 2 horas',
          avatar: '/assets/images/avatar/avatar-5.png'
        }
      ]
    },
    {
      id: 'approved',
      title: 'Aprovados',
      color: 'success',
      icon: 'mdi:check-circle',
      cards: [
        {
          id: '6',
          name: 'Lucia Rodriguez',
          product: 'Curso de Design',
          status: 'Aprovado',
          statusColor: 'success',
          date: 'há 30 min',
          avatar: '/assets/images/avatar/avatar-6.png'
        },
        {
          id: '7',
          name: 'Roberto Lima',
          product: 'Consultoria Empresarial',
          status: 'Aprovado',
          statusColor: 'success',
          date: 'há 1 hora',
          avatar: '/assets/images/avatar/avatar-7.png'
        },
        {
          id: '8',
          name: 'Fernanda Alves',
          product: 'Treinamento de Vendas',
          status: 'Aprovado',
          statusColor: 'success',
          date: 'há 2 horas',
          avatar: '/assets/images/avatar/avatar-8.png'
        }
      ]
    },
    {
      id: 'completed',
      title: 'Concluídos',
      color: 'primary',
      icon: 'mdi:flag-checkered',
      cards: [
        {
          id: '9',
          name: 'Gabriel Santos',
          product: 'Curso de Fotografia',
          status: 'Concluído',
          statusColor: 'primary',
          date: 'ontem',
          avatar: '/assets/images/avatar/avatar-9.png'
        },
        {
          id: '10',
          name: 'Isabela Costa',
          product: 'Workshop de Empreendedorismo',
          status: 'Concluído',
          statusColor: 'primary',
          date: 'há 2 dias',
          avatar: '/assets/images/avatar/avatar-10.png'
        }
      ]
    },
    {
      id: 'cancelled',
      title: 'Cancelados',
      color: 'danger',
      icon: 'mdi:close-circle',
      cards: [
        {
          id: '11',
          name: 'Rafael Silva',
          product: 'Curso de Inglês',
          status: 'Cancelado',
          statusColor: 'danger',
          date: 'há 1 dia',
          avatar: '/assets/images/avatar/avatar-11.png'
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
                  <div key={index} className="rounded p-2" style={{ backgroundColor: card.bgColor }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="text-muted mb-1 small fw-semibold" style={{ fontSize: '0.75rem' }}>{card.title}</h6>
                        <h5 className="fw-bold mb-1" style={{ fontSize: '1.1rem' }}>{card.value}</h5>
                        <div className="d-flex align-items-center gap-1">
                          <Icon 
                            icon={card.trend === 'up' ? 'mdi:trending-up' : 'mdi:trending-down'} 
                            className={`text-${card.color}`} 
                            style={{ fontSize: '0.875rem' }}
                          />
                          <span className={`text-${card.color} fw-semibold`} style={{ fontSize: '0.75rem' }}>
                            {card.percentage} {card.comparison}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <Icon icon={card.icon} className={`text-${card.color}`} style={{ fontSize: '1.25rem' }} />
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
                                  borderRadius: '8px'
                                }}
                              >
                                <div className="card-body p-3">
                                  <div className="d-flex align-items-start justify-content-between mb-2">
                                    <strong className="fw-bold" style={{ fontSize: '0.9rem' }}>{card.name}</strong>
                                    <img
                                      src={card.avatar}
                                      alt={card.name}
                                      className="rounded-circle"
                                      width="40"
                                      height="40"
                                    />
                                  </div>
                                  <p className="small text-muted mb-2" style={{ fontSize: '0.8rem' }}>{card.product}</p>
                                  <div className="mb-2">
                                    <span className="badge rounded-pill" style={{ 
                                      backgroundColor: '#e3f2fd', 
                                      color: '#0d6efd',
                                      fontSize: '0.75rem'
                                    }}>
                                      {card.status}
                                      {card.subStatus && (
                                        <span className="ms-1">• {card.subStatus}</span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-1">
                                      <div className="rounded-circle" style={{ 
                                        width: '8px', 
                                        height: '8px', 
                                        backgroundColor: '#0d6efd' 
                                      }}></div>
                                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        Pedido realizado
                                      </small>
                                    </div>
                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
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
