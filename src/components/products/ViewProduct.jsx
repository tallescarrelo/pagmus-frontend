import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table, Modal, Row, Col } from "react-bootstrap";

const formatCurrency = (value) => {
  const numericValue = Number(value);
  if (isNaN(numericValue)) return "R$ 0,00";
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const getCommissionTypeLabel = (type) => {
  if (type === "percentage") return "Porcentagem";
  if (type === "fixed") return "Valor fixo";
  return "Desconhecido";
};

const formatCommissionValue = (value, type) => {
  if (type === "percentage") return `${value}%`;
  return formatCurrency(value);
};

const Viewproduct = () => {
  const location = useLocation();
  const product = location.state?.product;
  const affiliate = location.state?.affiliate;

  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [plansSubMenu, setPlansSubMenu] = useState("todos-planos"); // submenu para planos
  const [affiliationSubMenu, setAffiliationSubMenu] = useState("configuracoes"); // submenu para afiliação
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [showNewUpsellModal, setShowNewUpsellModal] = useState(false);
  const [planModalTab, setPlanModalTab] = useState("loja"); // aba ativa do modal novo plano
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutModalTab, setCheckoutModalTab] = useState("configuracoes-gerais"); // aba ativa do modal checkout
  const [checkoutSearchTerm, setCheckoutSearchTerm] = useState(""); // termo de pesquisa para checkouts
  const [selectedAffiliates, setSelectedAffiliates] = useState([]); // afiliados selecionados
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showMoreActionsDropdown, setShowMoreActionsDropdown] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showUpdateCommissionModal, setShowUpdateCommissionModal] = useState(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showNewCouponModal, setShowNewCouponModal] = useState(false);

  const tabs = [
    { id: "dados-gerais", label: "Dados gerais", icon: "mdi:information-outline" },
    { id: "planos", label: "Planos", icon: "mdi:package-variant" },
    { id: "checkouts", label: "Checkouts", icon: "mdi:cart-outline" },
    { id: "urls", label: "Urls", icon: "mdi:link-variant" },
    { id: "afiliacao", label: "Comissionamento / Afiliação", icon: "mdi:account-group" },
    { id: "cupons", label: "Cupons de Desconto", icon: "mdi:ticket-percent" },
    { id: "componentes", label: "Componentes", icon: "mdi:view-grid" }
  ];

  const sampleData = [
    { code: "#platelw1", name: "Plano Teste 2", items: 1, price: "R$ 60,00", visible: "VISÍVEL", status: "ATIVO", sales: 0 },
    { code: "#plav84xr", name: "Plano teste", items: 1, price: "R$ 50,00", visible: "VISÍVEL", status: "ATIVO", sales: 0 },
  ];

  // Dados fictícios para afiliação
  const mockAffiliates = [
    { id: 1, name: "João Silva", email: "joao@email.com", manager: "Carlos Mendes", since: "15/01/2024", sales: 25, commission: "R$ 1.250,00", status: "ATIVO", awards: 3 },
    { id: 2, name: "Maria Santos", email: "maria@email.com", manager: "Ana Costa", since: "20/02/2024", sales: 18, commission: "R$ 900,00", status: "PENDENTE", awards: 1 },
    { id: 3, name: "Pedro Oliveira", email: "pedro@email.com", manager: "Lucas Lima", since: "10/12/2023", sales: 42, commission: "R$ 2.100,00", status: "PENDENTE", awards: 5 },
    { id: 4, name: "Ana Rodriguez", email: "ana@email.com", manager: "Felipe Rocha", since: "05/03/2024", sales: 8, commission: "R$ 400,00", status: "PENDENTE", awards: 0 },
    { id: 5, name: "Carlos Ferreira", email: "carlos@email.com", manager: "João Silva", since: "12/04/2024", sales: 15, commission: "R$ 750,00", status: "PENDENTE", awards: 2 },
  ];

  const mockInvites = [
    { id: 1, name: "Comissão Padrão", type: "Porcentagem", value: "25%", status: "ATIVO", affiliates: 15 },
    { id: 2, name: "Comissão Premium", type: "Porcentagem", value: "30%", status: "ATIVO", affiliates: 8 },
    { id: 3, name: "Comissão Especial", type: "Valor Fixo", value: "R$ 50,00", status: "INATIVO", affiliates: 3 },
  ];

  const mockGoals = [
    { id: 1, name: "Meta Bronze", currency: "BRL", commission: "R$ 100,00", salesRequired: 10, affiliates: 25, status: "ATIVO" },
    { id: 2, name: "Meta Prata", currency: "BRL", commission: "R$ 250,00", salesRequired: 25, affiliates: 12, status: "ATIVO" },
    { id: 3, name: "Meta Ouro", currency: "BRL", commission: "R$ 500,00", salesRequired: 50, affiliates: 5, status: "ATIVO" },
    { id: 4, name: "Meta Diamante", currency: "BRL", commission: "R$ 1.000,00", salesRequired: 100, affiliates: 2, status: "INATIVO" },
  ];

  if (!product && !affiliate) {
    return <p>Produto não encontrado</p>;
  }

  const planModalTabs = [
    { id: "loja", label: "Loja", icon: "mdi:store" },
    { id: "condicoes-pagamento", label: "Condições de Pagamentos", icon: "mdi:credit-card" },
    { id: "afiliacao", label: "Afiliação", icon: "mdi:account-group" },
    { id: "arquivos", label: "Arquivos/Ebooks", icon: "mdi:file-download" },
    { id: "order-bump", label: "Order Bump", icon: "mdi:trending-up" },
    { id: "termos", label: "Termos e Condições", icon: "mdi:file-document" }
  ];

  const checkoutModalTabs = [
    { id: "configuracoes-gerais", label: "Configurações Gerais", icon: "mdi:cog" },
    { id: "pixel-planos", label: "Pixel e Planos", icon: "mdi:chart-line" },
    { id: "informacoes-usuario", label: "Informações do Usuário", icon: "mdi:account-circle" },
    { id: "chat-suporte", label: "Chat e Suporte", icon: "mdi:message-text" },
    { id: "descontos-promocoes", label: "Descontos e Promoções", icon: "mdi:ticket-percent" },
    { id: "personalizacao", label: "Personalização", icon: "mdi:palette" }
  ];

  const renderPlanModalTabs = () => (
    <div className="card border-0 mb-3">
      <div className="card-body py-2">
        <nav className="nav nav-pills nav-fill">
          {planModalTabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-link d-flex align-items-center gap-2 ${
                planModalTab === tab.id ? "active" : ""
              }`}
              onClick={() => setPlanModalTab(tab.id)}
              style={{
                backgroundColor: planModalTab === tab.id ? "#0d6efd" : "transparent",
                color: planModalTab === tab.id ? "white" : "#6c757d",
                border: "1px solid #dee2e6",
                margin: "2px",
                borderRadius: "6px",
                fontSize: "0.875rem"
              }}
            >
              <Icon icon={tab.icon} />
              <span className="d-none d-lg-inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const renderPlanModalContent = () => {
    switch (planModalTab) {
      case "loja":
  return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:store" className="me-2 text-primary" />
                    Configurações da Loja
                  </h6>
        </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:tag" className="me-1" />
                        Nome do Plano *
                      </label>
                      <input type="text" className="form-control form-control-lg" placeholder="Ex: Plano Premium" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:currency-brl" className="me-1" />
                        Valor do plano (R$) *
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-success text-white">R$</span>
                        <input type="text" className="form-control" placeholder="0,00" />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:text" className="me-1" />
                        Descrição do Plano
                      </label>
                      <textarea className="form-control" rows="3" placeholder="Descreva os benefícios do plano..."></textarea>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Disponível para venda?</label>
                          <small className="text-muted d-block">Permitir que este plano seja vendido</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" defaultChecked style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Plano em destaque?</label>
                          <small className="text-muted d-block">Destacar este plano na loja</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "condicoes-pagamento":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:credit-card" className="me-2 text-primary" />
                    Condições de Pagamento
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Máximo de parcelas no cartão *</label>
                      <select className="form-select">
                        <option>12 vezes</option>
                        <option>6 vezes</option>
                        <option>3 vezes</option>
                        <option>1 vez</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Máximo de parcelas sem juros no cartão *
                        <Icon icon="mdi:help-circle-outline" className="ms-1" />
                      </label>
                      <select className="form-select">
                        <option>Selecione a quantidade</option>
                        <option>1x</option>
                        <option>2x</option>
                        <option>3x</option>
                        <option>6x</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-warning-subtle rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Desconto por tipo de pagamento?</label>
                          <small className="text-danger d-block">Obs: Os descontos adicionados serão configurado para todas as moedas</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Forma de cobrança
                        <Icon icon="mdi:help-circle-outline" className="ms-1" />
                      </label>
                      <select className="form-select">
                        <option>Única</option>
                        <option>Recorrente</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:receipt" className="me-2 text-warning" />
                    Configuração de Boleto Parcelado
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Ativar boleto parcelado?</label>
                          <small className="text-muted d-block">Permitir parcelamento via boleto</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-success-subtle rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Avisar comprador sobre vencimento de boletos?</label>
                          <small className="text-muted d-block">Notificações automáticas de vencimento</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" defaultChecked style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "afiliacao":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:account-group" className="me-2 text-success" />
                    Configurações de Afiliação
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">
                            Comissão personalizada para Afiliados?
                            <Icon icon="mdi:help-circle-outline" className="ms-1" />
                          </label>
                          <small className="text-muted d-block">Configurar comissão específica para este plano</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Ocultar plano para afiliados?</label>
                          <small className="text-muted d-block">Este plano não aparecerá para afiliados</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Tipo de Comissão</label>
                      <select className="form-select">
                        <option>Porcentagem</option>
                        <option>Valor Fixo</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Valor da Comissão</label>
                      <div className="input-group">
                        <input type="number" className="form-control" placeholder="0" />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "arquivos":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0 d-flex align-items-center">
                      <Icon icon="mdi:file-download" className="me-2 text-info" />
                      Arquivos/Ebooks
                    </h6>
                  </div>
                  <Button variant="primary" size="sm">
                    <Icon icon="mdi:upload" className="me-2" />
                    Arquivos
                  </Button>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-12">
                      <h6 className="fw-semibold mb-3">Configuração dos arquivos</h6>
                      
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-3">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Adicionar marca d'água nos arquivos em pdf?</label>
                          <small className="text-muted d-block">
                            Ao marcar essa configuração será adicionado aos arquivos <strong>.pdf</strong> uma marca d'água na parte central da página com <strong>informações do comprador</strong>. Informações como <strong>nome, e-mail</strong> e <strong>documento</strong> do comprador.
                          </small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>

                      <div className="text-center py-5 border-2 border-dashed rounded">
                        <Icon icon="mdi:file-outline" className="fs-1 text-muted mb-3" />
                        <h6 className="text-muted mb-2">Nenhum arquivo foi encontrado</h6>
                        <div className="d-flex gap-2 justify-content-center">
                          <span className="badge bg-warning text-dark">
                            <Icon icon="mdi:alert" className="me-1" />
                            Arquivos ainda não salvos.
                          </span>
                          <span className="badge bg-info text-white">
                            <Icon icon="mdi:dropbox" className="me-1" />
                            Arquivos sem marca d'água.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "order-bump":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:trending-up" className="me-2 text-warning" />
                    Chamada Order Bump
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Digite uma chamada para incentivar a compra dos seus clientes</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="Digite uma chamada para incentivar a compra dos seus clientes"
                        maxLength={100}
                      ></textarea>
                      <div className="d-flex justify-content-between mt-1">
                        <small className="text-muted">Uma frase chamativa para aumentar sua conversão</small>
                        <small className="text-muted">0/100</small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Produto</label>
                      <select className="form-select">
                        <option>Selecione...</option>
                        <option>Produto 1</option>
                        <option>Produto 2</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Planos</label>
                      <select className="form-select">
                        <option>Selecione...</option>
                        <option>Plano 1</option>
                        <option>Plano 2</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <div className="alert alert-info d-flex align-items-center">
                        <Icon icon="mdi:information" className="me-2" />
                        <span>Você não possui nenhum order bump ativo para este plano.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "termos":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0 d-flex align-items-center">
                      <Icon icon="mdi:file-document" className="me-2 text-secondary" />
                      Termos e Condições
                    </h6>
                  </div>
                  <Button variant="primary" size="sm">
                    <Icon icon="mdi:plus" className="me-2" />
                    Adicionar termo
                  </Button>
                </div>
                <div className="card-body">
                  <div className="text-center py-5">
                    <Icon icon="mdi:file-document-outline" className="fs-1 text-muted mb-3" />
                    <h6 className="text-muted mb-2">Nenhum termo adicionado</h6>
                    <p className="text-muted">Adicione termos e condições específicos para este plano</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-4">
            <p className="text-muted">Conteúdo não encontrado</p>
          </div>
        );
    }
  };

  const renderCheckoutModalTabs = () => (
    <div className="card border-0 mb-3">
      <div className="card-body py-2">
        <nav className="nav nav-pills nav-fill">
          {checkoutModalTabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-link d-flex align-items-center gap-2 ${
                checkoutModalTab === tab.id ? "active" : ""
              }`}
              onClick={() => setCheckoutModalTab(tab.id)}
              style={{
                backgroundColor: checkoutModalTab === tab.id ? "#0d6efd" : "transparent",
                color: checkoutModalTab === tab.id ? "white" : "#6c757d",
                border: "1px solid #dee2e6",
                margin: "2px",
                borderRadius: "6px",
                fontSize: "0.875rem"
              }}
            >
              <Icon icon={tab.icon} />
              <span className="d-none d-lg-inline">{tab.label}</span>
          </button>
          ))}
        </nav>
        </div>
      </div>
  );

  const renderCheckoutModalContent = () => {
    switch (checkoutModalTab) {
      case "configuracoes-gerais":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:cog" className="me-2 text-primary" />
                    Configurações Gerais do Checkout
                  </h6>
                  <small className="text-muted">Configure as informações básicas e formas de pagamento</small>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:text" className="me-1" />
                        Descrição *
                      </label>
                      <input type="text" className="form-control" placeholder="Digite a descrição do checkout" />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:credit-card" className="me-1" />
                        Formas de Pagamento
                      </label>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="boleto" defaultChecked />
                            <label className="form-check-label" htmlFor="boleto">
                              <Icon icon="mdi:file-document" className="me-1" />
                              Boleto
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="cartao" defaultChecked />
                            <label className="form-check-label" htmlFor="cartao">
                              <Icon icon="mdi:credit-card" className="me-1" />
                              Cartão de crédito
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pix" defaultChecked />
                            <label className="form-check-label" htmlFor="pix">
                              <Icon icon="mdi:qrcode" className="me-1" />
                              Pix
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "pixel-planos":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:chart-line" className="me-2 text-info" />
                    Configuração de Pixel
                  </h6>
                </div>
                <div className="card-body">
                  <label className="form-label fw-semibold">Selecione um pixel</label>
                  <select className="form-select">
                    <option>Selecione...</option>
                  </select>
                  <small className="text-muted mt-2 d-block">
                    Para adicionar um novo pixel e configurar, <button type="button" className="btn btn-link p-0 text-primary">clique Aqui!</button>
                  </small>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:package-variant" className="me-2 text-success" />
                    Vincular com plano e
                  </h6>
                </div>
                <div className="card-body">
                  <label className="form-label fw-semibold">Selecione os planos</label>
                  <select className="form-select">
                    <option>Selecione...</option>
                  </select>
                  <small className="text-muted mt-2 d-block">
                    Para adicionar um novo plano e configurar, <button type="button" className="btn btn-link p-0 text-primary">clique Aqui!</button>
                  </small>
                </div>
              </div>
            </div>
          </div>
        );

      case "informacoes-usuario":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:account-circle" className="me-2 text-warning" />
                    Informações do Usuário
                  </h6>
                  <small className="text-muted">Configure quais informações serão solicitadas no checkout</small>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">
                            Exigir informações de sexo do comprador?
                            <Icon icon="mdi:help-circle-outline" className="ms-1" />
                          </label>
                          <small className="text-muted d-block">Campo obrigatório no checkout</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Solicitar telefone?</label>
                          <small className="text-muted d-block">Campo obrigatório de telefone</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Solicitar endereço?</label>
                          <small className="text-muted d-block">Endereço completo do comprador</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "chat-suporte":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:message-text" className="me-2 text-info" />
                    Chat
                  </h6>
                </div>
                <div className="card-body">
                  <label className="form-label fw-semibold">Tipo do Chat</label>
                  <select className="form-select">
                    <option>Selecione...</option>
                    <option>WhatsApp / Chat Zapism / Tawk.io / Zendesk</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:phone" className="me-2 text-success" />
                    Telefones para Suporte
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-12">
                      <div className="input-group">
                        <span className="input-group-text bg-success text-white">
                          <Icon icon="mdi:whatsapp" />
                        </span>
                        <input type="tel" className="form-control" placeholder="Ex: (11) 9999-9999" />
                      </div>
                      <small className="text-muted">Telefone para suporte exclusivo para WhatsApp</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "descontos-promocoes":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:ticket-percent" className="me-2 text-warning" />
                    Cupom de Desconto
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-warning-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Permitir uso de Cupom de desconto?</label>
                      <small className="text-muted d-block">Habilitar campo de cupom no checkout</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:window-open" className="me-2 text-info" />
                    Popup de Desconto
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-info-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Usar popup?</label>
                      <small className="text-muted d-block">Exibir popup promocional no checkout</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "personalizacao":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:palette" className="me-2 text-purple" />
                    Personalizar Checkout
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Personalizar checkout?</label>
                      <small className="text-muted d-block">Customizar cores e layout</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:step-forward" className="me-2 text-secondary" />
                    Configuração de Etapas
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">
                        Habilitar etapas no checkout?
                        <Icon icon="mdi:help-circle-outline" className="ms-1" />
                      </label>
                      <small className="text-muted d-block">Checkout em múltiplas etapas</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:bell" className="me-2 text-warning" />
                    Notificações
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-warning-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Usar notificações?</label>
                      <small className="text-muted d-block">Enviar notificações por email e SMS</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-4">
            <p className="text-muted">Conteúdo não encontrado</p>
          </div>
        );
    }
  };

  const renderPlansSubmenu = () => {
    if (activeTab !== "planos") return null;
    
    return (
      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="btn-group" role="group">
          <button
              className={`btn ${plansSubMenu === "todos-planos" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPlansSubMenu("todos-planos")}
          >
              <Icon icon="mdi:format-list-bulleted" className="me-2" />
              Todos os Planos
          </button>
            <button
              className={`btn ${plansSubMenu === "upsell" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPlansSubMenu("upsell")}
            >
              <Icon icon="mdi:trending-up" className="me-2" />
              Upsell
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPlansContent = () => {
    if (plansSubMenu === "todos-planos") {
      return (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-0">Todos os Planos</h5>
              <p className="text-muted mb-0">Gerencie todos os planos do produto</p>
            </div>
            <Button variant="primary" onClick={() => setShowNewPlanModal(true)}>
              <Icon icon="mdi:plus" className="me-2" />
              Novo Plano
            </Button>
          </div>
          <div className="card-body">
            <Table responsive className="align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome do Plano</th>
                  <th>Qtd. de Itens</th>
                  <th>Preço</th>
                  <th>Visibilidade</th>
                  <th>Status</th>
                  <th>Vendas</th>
                  <th width="120">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((plan, index) => (
                  <tr key={index}>
                    <td><code>{plan.code}</code></td>
                    <td>{plan.name}</td>
                    <td>{plan.items}</td>
                    <td><span className="fw-bold text-success">{plan.price}</span></td>
                    <td><span className="badge bg-success-subtle text-success">{plan.visible}</span></td>
                    <td><span className="badge bg-primary-subtle text-primary">{plan.status}</span></td>
                    <td>{plan.sales}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Button variant="outline-primary" size="sm" title="Editar">
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button variant="outline-danger" size="sm" title="Excluir">
                          <Icon icon="mdi:delete" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    } else {
      // Conteúdo para Upsell
      return (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-0">Upsell</h5>
              <p className="text-muted mb-0">Configure ofertas de upsell para aumentar o ticket médio</p>
            </div>
            <Button variant="success" onClick={() => setShowNewUpsellModal(true)}>
              <Icon icon="mdi:plus" className="me-2" />
              Novo Upsell
            </Button>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0">Mostrar:</label>
                <select className="form-select form-select-sm" style={{ width: "auto" }}>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="text-muted">resultados</span>
              </div>
              <div className="input-group" style={{ width: "300px" }}>
                <span className="input-group-text">
                  <Icon icon="mdi:magnify" />
                </span>
                <input type="text" className="form-control" placeholder="Pesquisar upsells..." />
              </div>
      </div>

            <Table responsive className="align-middle">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Plano</th>
                  <th>Comissão</th>
                  <th>Status</th>
                  <th width="120">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    <Icon icon="mdi:trending-up" className="fs-1 mb-2" />
                    <br />
                    Nenhum upsell cadastrado
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
  };

  const renderAffiliationSubmenu = () => (
    <div className="card mb-3">
      <div className="card-body py-2">
        <nav className="nav nav-pills nav-fill">
          {[
            { id: "configuracoes", label: "Configurações", icon: "mdi:cog" },
            { id: "afiliados", label: "Afiliados", icon: "mdi:account-group" },
            { id: "merchan", label: "Merchan", icon: "mdi:store-marker" },
            { id: "termos", label: "Termos de uso", icon: "mdi:file-document" },
            { id: "coproducao", label: "Coprodução/Comissionamento", icon: "mdi:handshake" },
            { id: "convites", label: "Convites Afiliados", icon: "mdi:email-send" },
            { id: "metas", label: "Metas de Afiliados", icon: "mdi:target" }
          ].map((item) => (
            <button
              key={item.id}
              className={`nav-link d-flex align-items-center gap-2 ${
                affiliationSubMenu === item.id ? "active" : ""
              }`}
              onClick={() => setAffiliationSubMenu(item.id)}
              style={{
                backgroundColor: affiliationSubMenu === item.id ? "#0d6efd" : "transparent",
                color: affiliationSubMenu === item.id ? "white" : "#6c757d",
                border: "1px solid #dee2e6",
                margin: "2px",
                borderRadius: "6px",
                fontSize: "0.875rem"
              }}
            >
              <Icon icon={item.icon} />
              <span className="d-none d-lg-inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const renderAffiliationContent = () => {
    switch (affiliationSubMenu) {
      case "configuracoes":
        return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Configurações do Programa de Afiliados</h5>
              <p className="text-muted mb-0">Configure as regras e condições para o programa de afiliação</p>
            </div>
            <div className="card-body">
              <div className="alert alert-info d-flex align-items-center gap-2 mb-4">
                <Icon icon="mdi:information" />
                <span><strong>Atenção!</strong> As configurações só serão aplicadas para novas afiliações. Caso queira modificar as afiliações já existentes acesse a página de afiliados.</span>
                <Button variant="info" size="sm" className="ms-auto" onClick={() => setAffiliationSubMenu("afiliados")}>
                  <Icon icon="mdi:account-group" className="me-1" />
                  Ver Afiliados
                </Button>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-success-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Participar do programa de afiliados?</label>
                      <small className="text-muted d-block">Permitir que outros usuários se afiliem ao produto</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-info-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Acesso aos dados do comprador?</label>
                      <small className="text-muted d-block">Afiliados podem ver dados dos compradores</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-warning-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Visível na loja?</label>
                      <small className="text-muted d-block">Produto aparece na loja de afiliados</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-between p-3 bg-secondary-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Aprovação automática?</label>
                      <small className="text-muted d-block">Aprovar solicitações automaticamente</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tipo de comissionamento:</label>
                  <select className="form-select">
                    <option selected>Primeiro Clique</option>
                    <option>Último Clique</option>
                    <option>Múltiplos Cliques</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tempo de duração do cookie:</label>
                  <div className="input-group">
                    <select className="form-select">
                      <option>Outro</option>
                      <option>30 dias</option>
                      <option>60 dias</option>
                      <option>90 dias</option>
                    </select>
                    <input type="number" className="form-control" defaultValue="9999" />
                  </div>
                  <small className="text-muted">Tempo contabilizado em dias</small>
                </div>

                <div className="col-12">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Tipo de comissão para real brasileiro (R$):</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="commissionType" id="percentage" defaultChecked />
                          <label className="form-check-label" htmlFor="percentage">Porcentagem</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="commissionType" id="fixed" />
                          <label className="form-check-label" htmlFor="fixed">Valor fixo</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Valor da comissão:</label>
                      <div className="input-group">
                        <input type="number" className="form-control" defaultValue="25" />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 text-end">
                  <Button variant="primary" size="lg">
                    <Icon icon="mdi:content-save" className="me-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "afiliados":
        return (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-0">Afiliados deste produto</h5>
                <p className="text-muted mb-0">Gerencie os afiliados aprovados para este produto</p>
              </div>
              <div className="d-flex gap-2">
                <Button variant="success" size="sm">
                  <Icon icon="mdi:file-excel" className="me-1" />
                  Excel
                </Button>
                <Button variant="info" size="sm" onClick={() => setShowFilterDrawer(true)}>
                  <Icon icon="mdi:filter-variant" className="me-1" />
                  Filtrar
                </Button>
                <div className="position-relative">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => setShowMoreActionsDropdown(!showMoreActionsDropdown)}
                  >
                    <Icon icon="mdi:dots-horizontal" className="me-1" />
                    Mais ações
                  </Button>
                  {showMoreActionsDropdown && (
                    <div className="dropdown-menu show position-absolute top-100 end-0 mt-1" style={{ minWidth: "200px" }}>
                      <div className="dropdown-header">AÇÕES RÁPIDAS</div>
                      <button 
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => {
                          setShowUpdateCommissionModal(true);
                          setShowMoreActionsDropdown(false);
                        }}
                      >
                        <Icon icon="mdi:currency-usd" className="me-2" />
                        Atualizar Configuração
                      </button>
                      <button 
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => {
                          setShowBlacklistModal(true);
                          setShowMoreActionsDropdown(false);
                        }}
                      >
                        <Icon icon="mdi:block-helper" className="me-2" />
                        Blacklist de afiliação
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-2">
                  <Icon icon="mdi:information" />
                  <span><strong>ATENÇÃO!</strong> Caso você deseja fazer uma exportação com filtros, poderá fazer a exportação na tela de <strong>Solicitação Recebidas</strong>!</span>
                </div>
                <Button variant="outline-primary" size="sm">
                  <Icon icon="mdi:eye" className="me-1" />
                  Ver
                </Button>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Link para convidar seus afiliados:</span>
                  <Button variant="outline-secondary" size="sm">
                    <Icon icon="mdi:content-copy" className="me-1" />
                    Copiar
                  </Button>
                </div>
                <div className="input-group mt-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    value="https://ev.braip.com/afiliados/convite/proe73md/use2qf7ey0" 
                    readOnly 
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted">
                    <strong>{selectedAffiliates.length}</strong> selecionados de <strong>{mockAffiliates.length}</strong> afiliados.
                  </span>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      disabled={selectedAffiliates.length === 0}
                      onClick={() => handleApproveReprove('reprovar')}
                    >
                      <Icon icon="mdi:close" className="me-1" />
                      Reprovar
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm" 
                      disabled={selectedAffiliates.length === 0}
                      onClick={() => handleApproveReprove('aprovar')}
                    >
                      <Icon icon="mdi:check" className="me-1" />
                      Aprovar
                    </Button>
                  </div>
                </div>
                <div className="input-group" style={{ width: "250px" }}>
                  <span className="input-group-text">
                    <Icon icon="mdi:magnify" />
                  </span>
                  <input type="text" className="form-control" placeholder="Pesquisar" />
                </div>
              </div>

              <Table responsive className="align-middle">
                <thead>
                  <tr>
                    <th width="30">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={selectedAffiliates.length === mockAffiliates.length && mockAffiliates.length > 0}
                        onChange={handleSelectAllAffiliates}
                      />
                    </th>
                    <th>Nome/Contato</th>
                    <th>Gerente</th>
                    <th>Desde</th>
                    <th>Vendas</th>
                    <th>Comissão</th>
                    <th>Status</th>
                    <th>Premiações</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAffiliates.map((affiliate) => (
                    <tr key={affiliate.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          checked={selectedAffiliates.includes(affiliate.id)}
                          onChange={() => handleSelectAffiliate(affiliate.id)}
                        />
                      </td>
                      <td>
                        <div>
                          <strong>{affiliate.name}</strong>
                          <br />
                          <small className="text-muted">{affiliate.email}</small>
                        </div>
                      </td>
                      <td>{affiliate.manager}</td>
                      <td>{affiliate.since}</td>
                      <td><span className="badge bg-primary-subtle text-primary">{affiliate.sales}</span></td>
                      <td><strong className="text-success">{affiliate.commission}</strong></td>
                      <td>
                        <span className={`badge ${affiliate.status === 'ATIVO' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                          {affiliate.status}
                        </span>
                      </td>
                      <td>
                        {affiliate.awards > 0 ? (
                          <span className="badge bg-warning-subtle text-warning">{affiliate.awards}</span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        {affiliate.status === 'PENDENTE' && (
                          <div className="btn-group btn-group-sm">
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              title="Aprovar"
                              onClick={() => handleApproveReprove('aprovar', affiliate.id)}
                            >
                              <Icon icon="mdi:check" />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              title="Reprovar"
                              onClick={() => handleApproveReprove('reprovar', affiliate.id)}
                            >
                              <Icon icon="mdi:close" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );

      case "merchan":
        return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Merchan</h5>
              <p className="text-muted mb-0">Informações que ajudam seus afiliados a realizar mais vendas</p>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Conteúdo:</label>
                <div className="border rounded p-3" style={{ minHeight: "300px", backgroundColor: "#f8f9fa" }}>
                  <div className="d-flex gap-2 mb-3 border-bottom pb-2">
                    <Button variant="outline-secondary" size="sm">Parágrafo</Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-bold" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-italic" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-underline" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:link" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-list-bulleted" />
                    </Button>
                  </div>
                  <div className="text-muted">
                    <p>Aqui você pode inserir informações que ajudam seus afiliados a realizar mais vendas, como links para imagens, vídeos ou qualquer outra informação que possa auxiliá-los a realizar as vendas para este produto.</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="warning">
                  <Icon icon="mdi:arrow-left" className="me-2" />
                  Voltar
                </Button>
                <Button variant="primary">
                  <Icon icon="mdi:content-save" className="me-2" />
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        );

      case "termos":
        return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Termos de uso do Afiliado</h5>
              <p className="text-muted mb-0">Regras e termos que seus afiliados devem seguir</p>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Conteúdo:</label>
                <div className="border rounded p-3" style={{ minHeight: "300px", backgroundColor: "#f8f9fa" }}>
                  <div className="d-flex gap-2 mb-3 border-bottom pb-2">
                    <Button variant="outline-secondary" size="sm">Parágrafo</Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-bold" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-italic" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-underline" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:link" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Icon icon="mdi:format-list-bulleted" />
                    </Button>
                  </div>
                  <div className="text-muted">
                    <p>Aqui você pode inserir regras e termos que julga que seus afiliados devam seguir para não perderem a afiliação (as regras e termos definidos devem ser avaliados por você).</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="warning">
                  <Icon icon="mdi:arrow-left" className="me-2" />
                  Voltar
                </Button>
                <Button variant="primary">
                  <Icon icon="mdi:content-save" className="me-2" />
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        );

      case "coproducao":
        return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Coprodução/Comissionamento</h5>
              <p className="text-muted mb-0">Configure parcerias e comissionamento especial</p>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <Icon icon="mdi:handshake" className="fs-1 text-muted mb-3" />
                <h6 className="text-muted">Funcionalidade de Coprodução</h6>
                <p className="text-muted">Esta funcionalidade estará disponível em breve para configurar parcerias estratégicas.</p>
              </div>
            </div>
          </div>
        );

      case "convites":
        return (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-0">Convites Afiliados Cadastrados</h5>
                <p className="text-muted mb-0">Gerencie os tipos de convites para afiliados</p>
              </div>
              <Button variant="primary">
                <Icon icon="mdi:plus" className="me-2" />
                Novo Convite
              </Button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0">Mostrar:</label>
                  <select className="form-select form-select-sm" style={{ width: "auto" }}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-muted">resultados por página</span>
                </div>
                <div className="input-group" style={{ width: "250px" }}>
                  <span className="input-group-text">
                    <Icon icon="mdi:magnify" />
                  </span>
                  <input type="text" className="form-control" placeholder="Pesquisar" />
                </div>
              </div>

              <Table responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo de Comissão</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Quant. Afiliados</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInvites.map((invite) => (
                    <tr key={invite.id}>
                      <td><strong>{invite.name}</strong></td>
                      <td>{invite.type}</td>
                      <td><span className="text-success fw-bold">{invite.value}</span></td>
                      <td>
                        <span className={`badge ${invite.status === 'ATIVO' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                          {invite.status}
                        </span>
                      </td>
                      <td><span className="badge bg-primary-subtle text-primary">{invite.affiliates}</span></td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Button variant="outline-primary" size="sm" title="Editar">
                            <Icon icon="mdi:pencil" />
                          </Button>
                          <Button variant="outline-danger" size="sm" title="Excluir">
                            <Icon icon="mdi:delete" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );

      case "metas":
        return (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-0">Metas</h5>
                <p className="text-muted mb-0">Configure metas e recompensas para afiliados</p>
              </div>
              <Button variant="primary">
                <Icon icon="mdi:plus" className="me-2" />
                Nova meta
              </Button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0">Mostrar:</label>
                  <select className="form-select form-select-sm" style={{ width: "auto" }}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-muted">resultados por página</span>
                </div>
                <div className="input-group" style={{ width: "250px" }}>
                  <span className="input-group-text">
                    <Icon icon="mdi:magnify" />
                  </span>
                  <input type="text" className="form-control" placeholder="Pesquisar" />
                </div>
              </div>

              <Table responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Nome da meta</th>
                    <th>Moeda</th>
                    <th>Valor da comissão</th>
                    <th>Vendas aprovadas necessárias</th>
                    <th>Afiliados</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockGoals.map((goal) => (
                    <tr key={goal.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Icon 
                            icon={
                              goal.name.includes('Bronze') ? 'mdi:medal-outline' :
                              goal.name.includes('Prata') ? 'mdi:medal' :
                              goal.name.includes('Ouro') ? 'mdi:trophy-outline' :
                              'mdi:diamond-stone'
                            } 
                            className={
                              goal.name.includes('Bronze') ? 'text-warning' :
                              goal.name.includes('Prata') ? 'text-secondary' :
                              goal.name.includes('Ouro') ? 'text-warning' :
                              'text-info'
                            }
                          />
                          <strong>{goal.name}</strong>
                        </div>
                      </td>
                      <td>{goal.currency}</td>
                      <td><span className="text-success fw-bold">{goal.commission}</span></td>
                      <td><span className="badge bg-info-subtle text-info">{goal.salesRequired} vendas</span></td>
                      <td><span className="badge bg-primary-subtle text-primary">{goal.affiliates}</span></td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Button variant="outline-primary" size="sm" title="Editar">
                            <Icon icon="mdi:pencil" />
                          </Button>
                          <Button variant="outline-danger" size="sm" title="Excluir">
                            <Icon icon="mdi:delete" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-4">
            <p className="text-muted">Conteúdo não encontrado</p>
          </div>
        );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dados-gerais":
        return (
      <div className="row gy-4">
        <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-center mb-4">
              <img
                src={product?.image_url || affiliate?.product?.image_url}
                alt=""
                      className="border rounded object-fit-cover mb-3"
                      style={{ objectFit: "cover", maxHeight: "200px", width: "100%", height: "auto" }}
              />
            </div>

                  <div className="alert alert-warning radius-8 p-3 mb-4">
                <strong className="d-block mb-2">Atenção!</strong>
                Ainda faltam algumas pendências a serem resolvidas para que seu produto seja aprovado.
                <div className="text-end mt-2">
                  <button className="btn btn-warning btn-sm">Ver Detalhes</button>
                </div>
              </div>

                  <div className="list-group list-group-flush">
                {[ 
                      { label: "Código", value: product?.id || affiliate?.product?.id },
                      { label: "Status", value: "Aguardando Alteração", badge: "warning" },
                      { label: "Formato", value: "Infoproduto", badge: "info" },
                  { label: "Categoria", value: product?.category || affiliate?.product?.category },
                  { label: "Tipo de Comissão", value: getCommissionTypeLabel(product?.comission_type || affiliate?.product?.comission_type) },
                      { label: "Preço", value: formatCurrency(product?.price || affiliate?.product?.price), badge: "primary" },
                      { label: "Comissão", value: formatCommissionValue(product?.comission_value || affiliate?.product?.comission_value, product?.comission_type || affiliate?.product?.comission_type), badge: "success" }
                ].map((item, idx) => (
                      <div key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-medium">{item.label}:</span>
                        {item.badge ? (
                          <span className={`badge bg-${item.badge}-subtle text-${item.badge}`}>{item.value}</span>
                        ) : (
                          <span className="text-muted">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Dados do Produto</h5>
                  <p className="text-muted mb-0">Configure os dados gerais do seu produto</p>
                </div>
                <div className="card-body">
              <form>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="disponivel" defaultChecked />
                          <label className="form-check-label" htmlFor="disponivel">
                            Disponível para venda?
                          </label>
                  </div>
                </div>

                      <div className="col-md-6">
                  <label className="form-label">Moedas</label>
                  <input type="text" className="form-control" defaultValue="BRL (R$) - Real brasileiro" disabled />
                </div>

                      <div className="col-md-6">
                  <label className="form-label">Nome *</label>
                  <input type="text" className="form-control" defaultValue={product?.name} />
                </div>

                      <div className="col-12">
                  <label className="form-label">Descrição *</label>
                  <textarea className="form-control" rows="4" defaultValue={product?.description} />
                </div>

                      <div className="col-md-6">
                  <label className="form-label">Categoria *</label>
                  <select className="form-select">
                    <option selected>{product?.category}</option>
                  </select>
                </div>

                      <div className="col-md-6">
                  <label className="form-label">Tags</label>
                  <input type="text" className="form-control" defaultValue="teste" />
                </div>

                      <div className="col-12">
                  <label className="form-label">URL da página de vendas *</label>
                  <input type="url" className="form-control" defaultValue="https://sparkmobile.com.br" />
                </div>

                      <div className="col-md-6">
                  <label className="form-label">URL da página de obrigado</label>
                  <input type="url" className="form-control" defaultValue="https://sparkmobile.com.br" />
                </div>

                      <div className="col-md-6">
                        <label className="form-label">URL da página de obrigado para pedidos em processamento</label>
                        <input type="url" className="form-control" placeholder="https://exemplo.com" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">URL da página de obrigado para boletos</label>
                        <input type="url" className="form-control" placeholder="https://exemplo.com" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">URL da página de obrigado para pix</label>
                        <input type="url" className="form-control" placeholder="https://exemplo.com" />
                      </div>

                      <div className="col-md-6">
                  <label className="form-label">URL da página do reclame aqui</label>
                  <input type="url" className="form-control" defaultValue="https://sparkmobile.com.br" />
                </div>

                      <div className="col-md-6">
                  <label className="form-label">E-mail de suporte</label>
                  <input type="email" className="form-control" defaultValue="tallescarrelo@gmail.com" />
                </div>

                      <div className="col-md-6">
                  <label className="form-label">Tempo de garantia *</label>
                        <div className="input-group">
                  <input type="number" className="form-control" defaultValue="30" />
                          <span className="input-group-text">dias</span>
                </div>
                  </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="divulgar" />
                          <label className="form-check-label" htmlFor="divulgar">
                            Divulgar dados para emissão de nota fiscal para o afiliado?
                          </label>
                </div>
                      </div>

                      <div className="col-12 text-end">
                        <button className="btn btn-primary">
                          <Icon icon="mdi:content-save" className="me-2" />
                          Salvar
                        </button>
                      </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        );

      case "planos":
        return (
          <>
            {renderPlansSubmenu()}
            {renderPlansContent()}
          </>
        );

      case "checkouts":
  return (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-0">Checkouts</h5>
                <p className="text-muted mb-0">Configure as páginas de checkout do produto</p>
              </div>
              <Button variant="primary" onClick={() => setShowCheckoutModal(true)}>
                <Icon icon="mdi:plus" className="me-2" />
          Novo Checkout
        </Button>
      </div>
            <div className="card-body">
              {/* Campo de pesquisa */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0">Mostrar:</label>
                  <select className="form-select form-select-sm" style={{ width: "auto" }}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-muted">resultados</span>
                </div>
                <div className="input-group" style={{ width: "300px" }}>
                  <span className="input-group-text">
                    <Icon icon="mdi:magnify" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Pesquisar checkouts..." 
                    value={checkoutSearchTerm}
                    onChange={(e) => setCheckoutSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Cor Primária</th>
            <th>Layout</th>
            <th>Status</th>
                    <th width="80">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Checkout padrão</td>
            <td>Clássico</td>
            <td>
                      <span className="badge d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#2364DA", color: "white" }}>
                        <span className="badge rounded-circle" style={{ backgroundColor: "#2364DA", width: "12px", height: "12px" }}></span>
                #2364DA
              </span>
            </td>
            <td>Layout 1</td>
                    <td><span className="badge bg-success-subtle text-success">Ativo</span></td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEditCheckout({ name: "Checkout padrão", type: "Clássico" })}
                        title="Editar checkout"
                      >
                        <Icon icon="mdi:pencil" />
              </Button>
            </td>
          </tr>
          <tr>
            <td>Checkout escuro</td>
            <td>Customizado</td>
            <td>
                      <span className="badge d-inline-flex align-items-center gap-2" style={{ backgroundColor: "#000000", color: "white" }}>
                        <span className="badge rounded-circle" style={{ backgroundColor: "#000000", width: "12px", height: "12px" }}></span>
                #000000
              </span>
            </td>
            <td>Layout 2</td>
                    <td><span className="badge bg-secondary-subtle text-secondary">Inativo</span></td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleEditCheckout({ name: "Checkout escuro", type: "Customizado" })}
                        title="Editar checkout"
                      >
                        <Icon icon="mdi:pencil" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
            </div>
          </div>
  );

      case "urls":
  return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">URLs do Produto</h5>
              <p className="text-muted mb-0">Gerencie as URLs relacionadas ao produto</p>
            </div>
            <div className="card-body">
              <div className="row g-3 mb-4 p-3 bg-light rounded">
        <div className="col-md-6">
          <label className="form-label">Descrição *</label>
          <input type="text" className="form-control" placeholder="Ex: Página de vendas 1" maxLength={255} />
        </div>
        <div className="col-md-6">
          <label className="form-label">URL *</label>
          <input type="url" className="form-control" placeholder="Ex: http://exemplo.com.br" maxLength={255} />
        </div>
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="form-check">
          <input type="checkbox" className="form-check-input" id="privada" />
          <label htmlFor="privada" className="form-check-label">URL privada</label>
        </div>
                  <Button variant="primary">
                    <Icon icon="mdi:plus" className="me-2" />
                    Adicionar URL
          </Button>
        </div>
      </div>

              <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>Descrição</th>
                    <th>URL Destino</th>
            <th>Privado</th>
            <th>Status</th>
            <th>Vendas Fechadas</th>
                    <th width="120">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <Icon icon="mdi:link-off" className="fs-1 mb-2" />
                      <br />
                      Nenhuma URL cadastrada
            </td>
          </tr>
        </tbody>
      </Table>
            </div>
          </div>
  );

      case "afiliacao":
  return (
          <div>
            {renderAffiliationSubmenu()}
            {renderAffiliationContent()}
      </div>
        );

      case "cupons":
        return (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-0">Cupons de Desconto</h5>
                <p className="text-muted mb-0">Gerencie cupons de desconto para o produto</p>
              </div>
        <Button variant="primary" onClick={() => setShowNewCouponModal(true)}>
                <Icon icon="mdi:plus" className="me-2" />
          Novo Cupom
        </Button>
            </div>
            <div className="card-body">
              <div className="alert alert-warning d-flex align-items-center gap-2 mb-4">
                <Icon icon="mdi:alert" />
                <span><strong>Atenção:</strong> Cupons maiores que 90% do valor do plano não serão aplicados!</span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0">Mostrar:</label>
                  <select className="form-select form-select-sm" style={{ width: "auto" }}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
                  <span className="text-muted">resultados</span>
        </div>
                <div className="input-group" style={{ width: "300px" }}>
                  <span className="input-group-text">
                    <Icon icon="mdi:magnify" />
                  </span>
                  <input type="text" className="form-control" placeholder="Pesquisar cupons..." />
                </div>
      </div>

              <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Moeda</th>
            <th>Tipo do Cupom</th>
            <th>Tipo Pagamento</th>
            <th>Valor</th>
            <th>Status</th>
                    <th>Vendas Pagas</th>
                    <th>Vendas Criadas</th>
                    <th width="120">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
                    <td colSpan="9" className="text-center text-muted py-4">
                      <Icon icon="mdi:ticket-percent-outline" className="fs-1 mb-2" />
                      <br />
                      Nenhum cupom cadastrado
            </td>
          </tr>
        </tbody>
      </Table>
            </div>
          </div>
        );

      case "componentes":
        return (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Componentes</h5>
              <p className="text-muted mb-0">Configure componentes adicionais do produto</p>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <Icon icon="mdi:puzzle-outline" className="fs-1 text-muted mb-3" />
                <h6 className="text-muted">Componentes em desenvolvimento</h6>
                <p className="text-muted">Esta funcionalidade estará disponível em breve.</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-4">
            <p className="text-muted">Conteúdo não encontrado</p>
          </div>
        );
    }
  };

  const handleEditCheckout = (checkout) => {
    // Aqui podemos carregar os dados do checkout selecionado
    setCheckoutModalTab("configuracoes-gerais"); // resetar para primeira aba
    setShowCheckoutModal(true);
  };

  // Funções para gerenciar afiliados
  const handleSelectAffiliate = (affiliateId) => {
    setSelectedAffiliates(prev => {
      if (prev.includes(affiliateId)) {
        return prev.filter(id => id !== affiliateId);
      } else {
        return [...prev, affiliateId];
      }
    });
  };

  const handleSelectAllAffiliates = () => {
    if (selectedAffiliates.length === mockAffiliates.length) {
      setSelectedAffiliates([]);
    } else {
      setSelectedAffiliates(mockAffiliates.map(affiliate => affiliate.id));
    }
  };

  const handleApproveReprove = (action, affiliateId = null) => {
    setConfirmAction({ action, affiliateId });
    setShowConfirmModal(true);
  };

  const executeAction = () => {
    // Aqui executaria a ação real
    console.log(`Executando ${confirmAction.action} para:`, confirmAction.affiliateId || selectedAffiliates);
    setShowConfirmModal(false);
    setConfirmAction(null);
    if (!confirmAction.affiliateId) {
      setSelectedAffiliates([]);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 fw-bold">{product?.name || affiliate?.product?.name}</h4>
          <span className="badge bg-primary-subtle text-primary px-3 py-2">
            Código: {product?.id || affiliate?.product?.id}
          </span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <Icon icon="mdi:star-outline" />
            Favoritar
          </button>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
            <Icon icon="mdi:share-variant" />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <nav className="nav nav-tabs nav-fill border-bottom-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-link d-flex align-items-center gap-2 ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? "#f8f9fa" : "transparent",
                  borderBottom: activeTab === tab.id ? "3px solid #0d6efd" : "1px solid #dee2e6",
                  color: activeTab === tab.id ? "#0d6efd" : "#6c757d",
                  fontWeight: activeTab === tab.id ? "600" : "500"
                }}
              >
                <Icon icon={tab.icon} />
                <span className="d-none d-md-inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>

      {/* Modal Novo Plano */}
      <Modal show={showNewPlanModal} onHide={() => setShowNewPlanModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon="mdi:package-variant" className="me-2" />
            Configurações do Plano
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {/* Navigation Tabs */}
          {renderPlanModalTabs()}
          
          {/* Tab Content */}
          {renderPlanModalContent()}
</Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="outline-danger" onClick={() => setShowNewPlanModal(false)}>
            <Icon icon="mdi:close" className="me-2" />
            Sair da Edição
          </Button>
          <Button variant="primary" size="lg">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar Plano
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Novo Upsell */}
      <Modal show={showNewUpsellModal} onHide={() => setShowNewUpsellModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon="mdi:trending-up" className="me-2" />
            Configurações do Upsell
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:trending-up" className="me-2 text-success" />
                    Configuração do Upsell
                  </h6>
                  <small className="text-muted">Configure uma oferta adicional para aumentar o ticket médio</small>
                </div>
                <div className="card-body">
                  <form>
                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            <Icon icon="mdi:package-variant" className="me-1 text-primary" />
                            Selecione o Produto que deseja ofertar como Upsell
                          </label>
                          <select className="form-select form-select-lg">
                            <option>Selecione um produto...</option>
                            <option>Produto 1</option>
                            <option>Produto 2</option>
                          </select>
                          <small className="text-muted">Produto que será oferecido como upsell</small>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            <Icon icon="mdi:clipboard-list" className="me-1 text-info" />
                            Selecione o Plano que deseja vender como Upsell
                          </label>
                          <select className="form-select form-select-lg">
                            <option>Selecione um produto primeiro</option>
                          </select>
                          <small className="text-muted">Plano específico do produto selecionado</small>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            <Icon icon="mdi:credit-card" className="me-1 text-warning" />
                            Máximo de parcelas no cartão *
                          </label>
                          <select className="form-select">
                            <option>Selecione a quantidade</option>
                            <option>1x</option>
                            <option>2x</option>
                            <option>3x</option>
                            <option>6x</option>
                            <option>12x</option>
                          </select>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            <Icon icon="mdi:credit-card-check" className="me-1 text-success" />
                            Máximo de parcelas sem juros no cartão *
                            <Icon icon="mdi:help-circle-outline" className="ms-1" />
                          </label>
                          <select className="form-select">
                            <option>Selecione a quantidade</option>
                            <option>1x</option>
                            <option>2x</option>
                            <option>3x</option>
                            <option>6x</option>
                          </select>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">
                            <Icon icon="mdi:cart" className="me-1 text-purple" />
                            Checkout Padrão (Quando não conseguir processar a compra com um clique)
                          </label>
                          <select className="form-select">
                            <option>Selecione um checkout</option>
                            <option>Checkout Padrão</option>
                            <option>Checkout Customizado</option>
                          </select>
                          <small className="text-muted">Checkout usado quando o processamento rápido falhar</small>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="d-flex align-items-center justify-content-between p-3 bg-success-subtle rounded">
                          <div>
                            <label className="form-label mb-1 fw-semibold">Comissão para afiliados?</label>
                            <small className="text-muted d-block">
                              Permitir que afiliados ganhem comissão neste upsell
                            </small>
                          </div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="comissao-upsell" style={{ transform: "scale(1.3)" }} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="outline-secondary" onClick={() => setShowNewUpsellModal(false)}>
            <Icon icon="mdi:close" className="me-2" />
            Cancelar
          </Button>
          <Button variant="success" size="lg">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar Upsell
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Novo Checkout */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon="mdi:cart-outline" className="me-2" />
            Configurações do Checkout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {/* Navigation Tabs */}
          {renderCheckoutModalTabs()}
          
          {/* Tab Content */}
          {renderCheckoutModalContent()}
        </Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="outline-danger" onClick={() => setShowCheckoutModal(false)}>
            <Icon icon="mdi:close" className="me-2" />
            Sair da Edição
          </Button>
          <Button variant="primary" size="lg">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon={confirmAction?.action === 'aprovar' ? 'mdi:check-circle' : 'mdi:close-circle'} className="me-2" />
            Confirmar {confirmAction?.action === 'aprovar' ? 'Aprovação' : 'Reprovação'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Icon 
              icon={confirmAction?.action === 'aprovar' ? 'mdi:check-circle' : 'mdi:close-circle'} 
              className={`fs-1 mb-3 ${confirmAction?.action === 'aprovar' ? 'text-success' : 'text-danger'}`} 
            />
            <h5>
              {confirmAction?.action === 'aprovar' ? 'Aprovar' : 'Reprovar'} {confirmAction?.affiliateId ? 'afiliado' : `${selectedAffiliates.length} afiliados`}?
            </h5>
            <p className="text-muted">
              {confirmAction?.action === 'aprovar' 
                ? 'O(s) afiliado(s) será(ão) aprovado(s) e poderá(ão) começar a promover este produto.'
                : 'O(s) afiliado(s) será(ão) reprovado(s) e não poderá(ão) mais promover este produto.'
              }
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="outline-secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant={confirmAction?.action === 'aprovar' ? 'success' : 'danger'}
            onClick={executeAction}
          >
            <Icon icon={confirmAction?.action === 'aprovar' ? 'mdi:check' : 'mdi:close'} className="me-2" />
            {confirmAction?.action === 'aprovar' ? 'Aprovar' : 'Reprovar'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Atualizar Comissão */}
      <Modal show={showUpdateCommissionModal} onHide={() => setShowUpdateCommissionModal(false)} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon="mdi:currency-usd" className="me-2" />
            Alterar Configuração de Comissões
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="row g-4">
            <div className="col-md-5">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:cog" className="me-2 text-primary" />
                    Configuração de Comissão
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Tipo de comissão</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="commissionTypeModal" id="percentageModal" defaultChecked />
                        <label className="form-check-label" htmlFor="percentageModal">Porcentagem</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="commissionTypeModal" id="fixedModal" />
                        <label className="form-check-label" htmlFor="fixedModal">Valor fixo</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Valor da comissão</label>
                    <div className="input-group">
                      <input type="number" className="form-control" defaultValue="25" />
                      <span className="input-group-text">%</span>
                    </div>
                    <small className="text-muted">Tipo de cálculo - Valor Líquido Valor total da venda - Valor do frete - Taxa da plataforma</small>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="selectAllAffiliates" />
                      <label className="form-check-label" htmlFor="selectAllAffiliates">
                        Selecionar todos afiliados?
                      </label>
                    </div>
                    <small className="text-muted d-block">Todos afiliados serão selecionados para a nova configuração de comissão.</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-0 d-flex align-items-center">
                      <Icon icon="mdi:account-group" className="me-2 text-success" />
                      Selecionar Afiliados
                    </h6>
                    <div className="input-group" style={{ width: "250px" }}>
                      <span className="input-group-text">
                        <Icon icon="mdi:magnify" />
                      </span>
                      <input type="text" className="form-control form-control-sm" placeholder="Pesquisar por nome ou email..." />
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive" style={{ maxHeight: "350px" }}>
                    <table className="table table-sm mb-0">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th width="40">
                            <input type="checkbox" className="form-check-input" />
                          </th>
                          <th>Nome/E-mail</th>
                          <th>Vendas</th>
                          <th>Comissão</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="5" className="text-center p-4 text-muted">
                            <Icon icon="mdi:account-group-outline" className="fs-1 mb-2" />
                            <br />
                            Nenhum afiliado encontrado
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 border-top">
                    <small className="text-muted">Mostrando 0 de 0 registros</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="outline-secondary" onClick={() => setShowUpdateCommissionModal(false)}>
            Fechar
          </Button>
          <Button variant="primary">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Blacklist */}
      <Modal show={showBlacklistModal} onHide={() => setShowBlacklistModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon="mdi:block-helper" className="me-2" />
            Blacklist de Afiliação
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Informe o email..." 
              />
              <Button variant="primary">
                <Icon icon="mdi:plus" className="me-1" />
                Adicionar
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="outline-secondary" onClick={() => setShowBlacklistModal(false)}>
            Fechar
          </Button>
          <Button variant="primary">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar blacklist
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Novo Cupom */}
      <Modal show={showNewCouponModal} onHide={() => setShowNewCouponModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <Icon icon="mdi:ticket-percent" className="me-2" />
            Novo Cupom
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="row g-4">
            {/* Informações Básicas */}
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:information" className="me-2 text-primary" />
                    Informações Básicas
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nome *</label>
                    <input type="text" className="form-control" placeholder="Digite o nome do cupom" />
                    <small className="text-muted">
                      Insira aqui o prefixo do cupom que será utilizado pelo cliente ao efetuar a compra
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurações de Uso e Transação */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:cog" className="me-2 text-success" />
                    Configurações de Uso
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                      <div>
                        <label className="form-label mb-1 fw-semibold">Disponível Para Uso?</label>
                        <small className="text-muted d-block">Permitir que o cupom seja utilizado</small>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                      <div>
                        <label className="form-label mb-1 fw-semibold">Clientes podem usar o cupom mais de uma vez?</label>
                        <small className="text-muted d-block">Permitir uso múltiplo do mesmo cupom</small>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Moeda de transação *</label>
                    <select className="form-select">
                      <option selected>BRL (R$)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurações de Afiliados e Valor */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:account-group" className="me-2 text-warning" />
                    Configurações de Afiliados
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                      <div>
                        <label className="form-label mb-1 fw-semibold">Ativo para vendas de Afiliados?</label>
                        <small className="text-muted d-block">Permitir uso do cupom por afiliados</small>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                      <div>
                        <label className="form-label mb-1 fw-semibold">Especificar plano(s)?</label>
                        <small className="text-muted d-block">Aplicar cupom apenas em planos específicos</small>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" style={{ transform: "scale(1.3)" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Valor do Cupom *
                      <Icon icon="mdi:help-circle-outline" className="ms-1" />
                    </label>
                    <input type="text" className="form-control" defaultValue="0,00%" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tipo do Cupom e Tipo de Pagamento */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:ticket-percent" className="me-2 text-info" />
                    Tipo do Cupom
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Tipo do Cupom *</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="couponType" id="percentage" defaultChecked />
                        <label className="form-check-label" htmlFor="percentage">Porcentagem</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="couponType" id="fixed" />
                        <label className="form-check-label" htmlFor="fixed">Valor fixo</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Tipo de Pagamento Aceito *</label>
                    <div className="d-flex flex-column gap-2">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentType" id="all" defaultChecked />
                        <label className="form-check-label" htmlFor="all">Todos</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentType" id="boleto" />
                        <label className="form-check-label" htmlFor="boleto">Boleto</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentType" id="card" />
                        <label className="form-check-label" htmlFor="card">Cartão</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="paymentType" id="pix" />
                        <label className="form-check-label" htmlFor="pix">PIX</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuração na Assinatura */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:calendar-repeat" className="me-2 text-purple" />
                    Configuração na Assinatura
                  </h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Configuração na Assinatura
                      <Icon icon="mdi:help-circle-outline" className="ms-1" />
                    </label>
                    <select className="form-select">
                      <option selected>Apenas na primeira recorrência</option>
                      <option>Em todas as recorrências</option>
                      <option>Não aplicar em recorrências</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-top">
          <Button variant="warning" onClick={() => setShowNewCouponModal(false)}>
            <Icon icon="mdi:arrow-left" className="me-2" />
            Voltar
          </Button>
          <Button variant="primary">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Drawer de Filtros */}
      <div className={`offcanvas offcanvas-end ${showFilterDrawer ? 'show' : ''}`} style={{ visibility: showFilterDrawer ? 'visible' : 'hidden' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            <Icon icon="mdi:filter-variant" className="me-2" />
            Filtro
          </h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowFilterDrawer(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-4">
            <label className="form-label fw-semibold">Código do Afiliado</label>
            <input type="text" className="form-control" />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Status</label>
            <select className="form-select">
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="pendente">Pendente</option>
              <option value="reprovado">Reprovado</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Quantidade de vendas</label>
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small">Mínimo:</label>
                <input type="number" className="form-control" placeholder="0" />
              </div>
              <div className="col-6">
                <label className="form-label small">Máximo:</label>
                <input type="number" className="form-control" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Premiação</label>
            <div className="d-flex flex-column gap-2">
              {[
                { icon: "mdi:trophy", label: "Cadastro Finalizado!", color: "purple" },
                { icon: "mdi:star", label: "Primeiro", color: "blue" },
                { icon: "mdi:account-check", label: "Usuário Beta", color: "danger" },
                { icon: "mdi:medal", label: "Vendedor(a) | Principiante", color: "warning" },
                { icon: "mdi:shield-check", label: "Vendedor(a) | Veterano", color: "success" },
                { icon: "mdi:diamond", label: "Vendedor(a) | Ilustre", color: "info" },
                { icon: "mdi:crown", label: "Indicação | Veterano", color: "success" },
                { icon: "mdi:star-circle", label: "Indicação | Ilustre", color: "purple" },
                { icon: "mdi:heart", label: "Indicação | Amigo Braip", color: "purple" },
                { icon: "mdi:gem", label: "Ametist", color: "purple" },
                { icon: "mdi:trophy-award", label: "Gold", color: "warning" },
                { icon: "mdi:diamond-stone", label: "Diamond", color: "secondary" }
              ].map((award, index) => (
                <div key={index} className="form-check">
                  <input className="form-check-input" type="checkbox" id={`award-${index}`} />
                  <label className="form-check-label d-flex align-items-center" htmlFor={`award-${index}`}>
                    <Icon icon={award.icon} className={`me-2 text-${award.color}`} />
                    {award.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <Button variant="warning" className="flex-fill">
              <Icon icon="mdi:broom" className="me-2" />
              Limpar
            </Button>
            <Button variant="primary" className="flex-fill">
              <Icon icon="mdi:magnify" className="me-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop para drawer */}
      {showFilterDrawer && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={() => setShowFilterDrawer(false)}
        ></div>
      )}
    </div>
  );
};

export default Viewproduct;
