import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';
import AnalyticsDashboard from '../../components/reports/AnalyticsDashboard';
import CustomReportsManager from '../../components/reports/CustomReportsManager';

interface Tab {
  id: string;
  label: string;
  icon: string;
  component: JSX.Element;
}

const ReportsMainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const tabs: Tab[] = [
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
                        <h6 className="mb-1">Relatórios de Vendas</h6>
                        <p className="text-muted small mb-0">Análise detalhada de vendas e receita</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:account-group" />
                      </div>
                      <div>
                        <h6 className="mb-1">Relatórios de Afiliados</h6>
                        <p className="text-muted small mb-0">Performance e comissões de afiliados</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:package-variant" />
                      </div>
                      <div>
                        <h6 className="mb-1">Relatórios de Produtos</h6>
                        <p className="text-muted small mb-0">Análise de produtos e estoque</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-info rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: '40px', height: '40px' }}>
                        <Icon icon="mdi:truck-delivery" />
                      </div>
                      <div>
                        <h6 className="mb-1">Relatórios de Entrega</h6>
                        <p className="text-muted small mb-0">Status e rastreamento de entregas</p>
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
                  <Icon icon="mdi:cog" className="me-2" />
                  Configurações
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Frequência de Relatórios</label>
                  <select className="form-select">
                    <option>Diário</option>
                    <option>Semanal</option>
                    <option>Mensal</option>
                    <option>Personalizado</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Formato de Exportação</label>
                  <select className="form-select">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                    <option>JSON</option>
                  </select>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="autoExport" />
                    <label className="form-check-label" htmlFor="autoExport">
                      Exportação Automática
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary w-100">
                  <Icon icon="mdi:content-save" className="me-2" />
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ReportsMainPage; 