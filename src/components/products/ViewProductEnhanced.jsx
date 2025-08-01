import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Table, Modal, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useProduct } from "../../hooks/useProduct";

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

const ViewProductEnhanced = () => {
  const location = useLocation();
  const { productId } = useParams();
  
  // Usar o hook para gerenciar os dados do produto
  const {
    product,
    plans,
    checkouts,
    coupons,
    urls,
    affiliateCommissions,
    affiliateGoals,
    files,
    affiliates,
    components,
    loading,
    error,
    updateProduct,
    createPlan,
    createCheckout,
    createCoupon,
    createUrl,
    createCommission,
    createGoal,
    createFile,
    createAffiliate,
    createComponent
  } = useProduct(productId || location.state?.product?.id);

  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [plansSubMenu, setPlansSubMenu] = useState("todos-planos");
  const [affiliationSubMenu, setAffiliationSubMenu] = useState("configuracoes");
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [showNewUpsellModal, setShowNewUpsellModal] = useState(false);
  const [planModalTab, setPlanModalTab] = useState("loja");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutModalTab, setCheckoutModalTab] = useState("configuracoes-gerais");
  const [checkoutSearchTerm, setCheckoutSearchTerm] = useState("");
  const [selectedAffiliates, setSelectedAffiliates] = useState([]);
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

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Carregando dados do produto...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Alert variant="danger">
          <Alert.Heading>Erro ao carregar produto</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </Alert>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Alert variant="warning">
          <Alert.Heading>Produto não encontrado</Alert.Heading>
          <p>O produto solicitado não foi encontrado ou você não tem permissão para visualizá-lo.</p>
        </Alert>
      </div>
    );
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

  // Função para renderizar dados gerais com dados reais
  const renderDadosGerais = () => (
    <div className="row gy-4">
      <div className="col-lg-4">
        <div className="card h-100">
          <div className="card-body">
            <div className="text-center mb-4">
              <img
                src={product?.image || product?.image_url || "/default-product.png"}
                alt={product?.name}
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
                { label: "Código", value: product?.id },
                { label: "Status", value: product?.status || "Aguardando Alteração", badge: "warning" },
                { label: "Formato", value: "Infoproduto", badge: "info" },
                { label: "Categoria", value: product?.category },
                { label: "Tipo de Comissão", value: getCommissionTypeLabel(product?.commission_type) },
                { label: "Preço", value: formatCurrency(product?.price), badge: "primary" },
                { label: "Comissão", value: formatCommissionValue(product?.commission_value, product?.commission_type), badge: "success" }
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
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="disponivel" 
                      defaultChecked={product?.available_for_sale}
                    />
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
                  <input type="url" className="form-control" defaultValue={product?.sales_page_url || "https://sparkmobile.com.br"} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">URL da página de obrigado</label>
                  <input type="url" className="form-control" defaultValue={product?.thank_you_page_url || "https://sparkmobile.com.br"} />
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
                  <input type="url" className="form-control" defaultValue={product?.reclame_aqui_url || "https://sparkmobile.com.br"} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">E-mail de suporte</label>
                  <input type="email" className="form-control" defaultValue={product?.support_email || "tallescarrelo@gmail.com"} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Tempo de garantia *</label>
                  <div className="input-group">
                    <input type="number" className="form-control" defaultValue={product?.warranty_days || 30} />
                    <span className="input-group-text">dias</span>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="divulgar" 
                      defaultChecked={product?.share_data_for_invoice}
                    />
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

  // Função para renderizar planos com dados reais
  const renderPlanos = () => (
    <>
      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="btn-group" role="group">
            <button
              className={`btn ${plansSubMenu === "todos-planos" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPlansSubMenu("todos-planos")}
            >
              <Icon icon="mdi:format-list-bulleted" className="me-2" />
              Todos os Planos ({plans.length})
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
          {plans.length === 0 ? (
            <div className="text-center py-5">
              <Icon icon="mdi:package-variant-outline" className="fs-1 text-muted mb-3" />
              <h6 className="text-muted">Nenhum plano cadastrado</h6>
              <p className="text-muted">Crie seu primeiro plano para começar a vender</p>
            </div>
          ) : (
            <Table responsive className="align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome do Plano</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Vendas</th>
                  <th width="120">Ações</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td><code>#{plan.id}</code></td>
                    <td>{plan.name}</td>
                    <td><span className="fw-bold text-success">{formatCurrency(plan.price)}</span></td>
                    <td>
                      <span className={`badge ${plan.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                        {plan.status === 'active' ? 'ATIVO' : 'INATIVO'}
                      </span>
                    </td>
                    <td>{plan.sales_count || 0}</td>
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
          )}
        </div>
      </div>
    </>
  );

  // Função para renderizar URLs com dados reais
  const renderUrls = () => (
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

        {urls.length === 0 ? (
          <div className="text-center py-5">
            <Icon icon="mdi:link-off" className="fs-1 text-muted mb-2" />
            <h6 className="text-muted">Nenhuma URL cadastrada</h6>
            <p className="text-muted">Adicione URLs para direcionar seus clientes</p>
          </div>
        ) : (
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
              {urls.map((url) => (
                <tr key={url.id}>
                  <td>{url.description}</td>
                  <td>
                    <a href={url.url} target="_blank" rel="noopener noreferrer">
                      {url.url}
                    </a>
                  </td>
                  <td>
                    <span className={`badge ${url.is_private ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'}`}>
                      {url.is_private ? 'SIM' : 'NÃO'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${url.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                      {url.status === 'active' ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </td>
                  <td>{url.sales_count}</td>
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
        )}
      </div>
    </div>
  );

  // Função para renderizar cupons com dados reais
  const renderCupons = () => (
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

        {coupons.length === 0 ? (
          <div className="text-center py-5">
            <Icon icon="mdi:ticket-percent-outline" className="fs-1 text-muted mb-2" />
            <h6 className="text-muted">Nenhum cupom cadastrado</h6>
            <p className="text-muted">Crie cupons para aumentar suas vendas</p>
          </div>
        ) : (
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
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.name}</td>
                  <td>BRL</td>
                  <td>{coupon.discount_type}</td>
                  <td>Todos</td>
                  <td>{coupon.discount_value}</td>
                  <td>
                    <span className={`badge ${coupon.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                      {coupon.status === 'active' ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </td>
                  <td>{coupon.used_count || 0}</td>
                  <td>{coupon.max_uses || 0}</td>
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
        )}
      </div>
    </div>
  );

  // Função para renderizar componentes
  const renderComponentes = () => (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Componentes</h5>
        <p className="text-muted mb-0">Configure componentes adicionais do produto</p>
      </div>
      <div className="card-body">
        {components.length === 0 ? (
          <div className="text-center py-5">
            <Icon icon="mdi:puzzle-outline" className="fs-1 text-muted mb-3" />
            <h6 className="text-muted">Componentes em desenvolvimento</h6>
            <p className="text-muted">Esta funcionalidade estará disponível em breve.</p>
          </div>
        ) : (
          <div className="row">
            {components.map((component) => (
              <div key={component.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">{component.name}</h6>
                    <p className="text-muted">Tipo: {component.type}</p>
                    <span className={`badge ${component.status === 'active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                      {component.status === 'active' ? 'ATIVO' : 'INATIVO'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "dados-gerais":
        return renderDadosGerais();
      case "planos":
        return renderPlanos();
      case "checkouts":
        return <div>Checkouts - Implementação em andamento</div>;
      case "urls":
        return renderUrls();
      case "afiliacao":
        return <div>Afiliação - Implementação em andamento</div>;
      case "cupons":
        return renderCupons();
      case "componentes":
        return renderComponentes();
      default:
        return <div>Conteúdo não encontrado</div>;
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 fw-bold">{product?.name}</h4>
          <span className="badge bg-primary-subtle text-primary px-3 py-2">
            Código: {product?.id}
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

      {/* Modais podem ser adicionados aqui */}
    </div>
  );
};

export default ViewProductEnhanced; 