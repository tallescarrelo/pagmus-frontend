import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';
import AnalyticsDashboard from '../../components/reports/AnalyticsDashboard';
import CustomReportsManager from '../../components/reports/CustomReportsManager';

const ReportsMainPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard Analítico',
      icon: 'mdi:chart-line',
      component: <AnalyticsDashboard />
    },
    {
      id: 'custom',
      label: 'Relatórios Personalizados',
      icon: 'mdi:file-chart',
      component: <CustomReportsManager />
    }
  ];

  return (
    <MasterLayout>
      <Breadcrumb 
        title="Sistema de Relatórios" 
        items={[
          { label: 'Início', path: '/Dashboard' },
          { label: 'Relatórios', path: '/reports' }
        ]}
      />

      <div className="container-fluid">
        {/* Header da Página */}
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="page-title">
              <Icon icon="mdi:chart-box" className="me-2" />
              Sistema de Relatórios Avançados
            </h1>
            <p className="page-subtitle">
              Análise completa de dados, métricas e relatórios personalizados
            </p>
          </div>
          <div className="col-md-4 text-end">
            <div className="btn-group">
              <button className="btn btn-outline-primary">
                <Icon icon="mdi:file-export" className="me-2" />
                Exportar Todos
              </button>
              <button className="btn btn-primary">
                <Icon icon="mdi:plus" className="me-2" />
                Novo Relatório
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon icon={tab.icon} className="me-2" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-body">
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:information" className="me-2" />
                  Tipos de Relatórios
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:chart-line" />
                      </div>
                      <div>
                        <h6>Dashboard Analítico</h6>
                        <small className="text-muted">
                          Métricas em tempo real e gráficos interativos
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:file-chart" />
                      </div>
                      <div>
                        <h6>Relatórios Personalizados</h6>
                        <small className="text-muted">
                          Crie relatórios com filtros avançados
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-info rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:file-export" />
                      </div>
                      <div>
                        <h6>Exportação Multi-Formato</h6>
                        <small className="text-muted">
                          PDF, Excel, CSV e JSON
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:calendar-clock" />
                      </div>
                      <div>
                        <h6>Relatórios Agendados</h6>
                        <small className="text-muted">
                          Automatize a geração de relatórios
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:lightning-bolt" className="me-2" />
                  Ações Rápidas
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-primary w-100">
                      <Icon icon="mdi:chart-line" className="me-2" />
                      Dashboard
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-success w-100">
                      <Icon icon="mdi:file-chart" className="me-2" />
                      Personalizado
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-info w-100">
                      <Icon icon="mdi:file-export" className="me-2" />
                      Exportar
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-warning w-100">
                      <Icon icon="mdi:calendar-clock" className="me-2" />
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dicas e Melhores Práticas */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:lightbulb" className="me-2" />
                  Dicas para Relatórios Eficazes
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-3">
                      <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" />
                      <div>
                        <h6>Defina Objetivos Claros</h6>
                        <small className="text-muted">
                          Identifique o que você quer medir antes de criar o relatório
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-3">
                      <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" />
                      <div>
                        <h6>Use Filtros Relevantes</h6>
                        <small className="text-muted">
                          Aplique filtros para focar nos dados mais importantes
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-3">
                      <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" />
                      <div>
                        <h6>Visualize Dados</h6>
                        <small className="text-muted">
                          Use gráficos para facilitar a compreensão dos dados
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recursos Avançados */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <Icon icon="mdi:star" className="me-2" />
                  Recursos Avançados
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="text-center mb-3">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                        <Icon icon="mdi:chart-timeline-variant" style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h6>Análise Temporal</h6>
                      <small className="text-muted">
                        Compare períodos e identifique tendências
                      </small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center mb-3">
                      <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                        <Icon icon="mdi:filter-variant" style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h6>Filtros Avançados</h6>
                      <small className="text-muted">
                        Combine múltiplos critérios de filtro
                      </small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center mb-3">
                      <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                        <Icon icon="mdi:file-multiple" style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h6>Multi-Formato</h6>
                      <small className="text-muted">
                        Exporte em PDF, Excel, CSV e JSON
                      </small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center mb-3">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                        <Icon icon="mdi:share-variant" style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h6>Compartilhamento</h6>
                      <small className="text-muted">
                        Compartilhe relatórios com sua equipe
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ReportsMainPage; 