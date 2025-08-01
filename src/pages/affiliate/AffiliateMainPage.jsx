import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';
import AffiliateDashboard from '../../components/affiliate/AffiliateDashboard';
import AffiliateLinksManager from '../../components/affiliate/AffiliateLinksManager';
import CommissionManager from '../../components/affiliate/CommissionManager';

const AffiliateMainPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'mdi:view-dashboard',
      component: <AffiliateDashboard />
    },
    {
      id: 'links',
      label: 'Links de Afiliado',
      icon: 'mdi:link-variant',
      component: <AffiliateLinksManager />
    },
    {
      id: 'commissions',
      label: 'Comissões',
      icon: 'mdi:currency-usd',
      component: <CommissionManager />
    }
  ];

  return (
    <MasterLayout>
      <Breadcrumb 
        title="Sistema de Afiliados" 
        items={[
          { label: 'Início', path: '/Dashboard' },
          { label: 'Afiliados', path: '/affiliate' }
        ]}
      />

      <div className="container-fluid">
        {/* Header da Página */}
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="page-title">
              <Icon icon="mdi:account-multiple" className="me-2" />
              Sistema de Afiliados
            </h1>
            <p className="page-subtitle">
              Gerencie seus afiliados, links e comissões de forma completa
            </p>
          </div>
          <div className="col-md-4 text-end">
            <div className="btn-group">
              <button className="btn btn-outline-primary">
                <Icon icon="mdi:file-export" className="me-2" />
                Exportar Relatório
              </button>
              <button className="btn btn-primary">
                <Icon icon="mdi:account-plus" className="me-2" />
                Novo Afiliado
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
                  Como Funciona
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 text-center mb-3">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                      <Icon icon="mdi:account-plus" style={{ fontSize: '1.5rem' }} />
                    </div>
                    <h6>1. Cadastre Afiliados</h6>
                    <small className="text-muted">
                      Adicione novos afiliados ao seu programa
                    </small>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                      <Icon icon="mdi:link-plus" style={{ fontSize: '1.5rem' }} />
                    </div>
                    <h6>2. Gere Links</h6>
                    <small className="text-muted">
                      Crie links únicos para cada afiliado
                    </small>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-2" style={{ width: '60px', height: '60px' }}>
                      <Icon icon="mdi:currency-usd" style={{ fontSize: '1.5rem' }} />
                    </div>
                    <h6>3. Acompanhe Comissões</h6>
                    <small className="text-muted">
                      Monitore vendas e comissões em tempo real
                    </small>
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
                      <Icon icon="mdi:account-plus" className="me-2" />
                      Adicionar Afiliado
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-success w-100">
                      <Icon icon="mdi:link-plus" className="me-2" />
                      Criar Link
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-info w-100">
                      <Icon icon="mdi:chart-line" className="me-2" />
                      Ver Relatórios
                    </button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-outline-warning w-100">
                      <Icon icon="mdi:cog" className="me-2" />
                      Configurações
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
                  Dicas para Maximizar suas Vendas
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-3">
                      <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" />
                      <div>
                        <h6>Escolha Afiliados Qualificados</h6>
                        <small className="text-muted">
                          Selecione afiliados com audiência relevante e engajada
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-3">
                      <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" />
                      <div>
                        <h6>Ofereça Comissões Competitivas</h6>
                        <small className="text-muted">
                          Defina comissões atrativas para motivar seus afiliados
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-3">
                      <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" />
                      <div>
                        <h6>Forneça Material de Marketing</h6>
                        <small className="text-muted">
                          Crie banners, textos e materiais para facilitar a divulgação
                        </small>
                      </div>
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

export default AffiliateMainPage; 