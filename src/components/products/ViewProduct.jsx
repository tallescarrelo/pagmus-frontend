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
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [showNewUpsellModal, setShowNewUpsellModal] = useState(false);

  const tabs = [
    { id: "dados-gerais", label: "Dados gerais", icon: "mdi:file-document-outline" },
    { id: "planos", label: "Planos", icon: "mdi:package-variant", hasSubmenu: true },
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

  if (!product && !affiliate) {
    return <p>Produto não encontrado</p>;
  }

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
              <h5 className="card-title mb-0">Planos do Produto</h5>
              <p className="text-muted mb-0">Gerencie os planos disponíveis para este produto</p>
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
                  <th>Nome</th>
                  <th>Itens por plano</th>
                  <th>Valor</th>
                  <th>Visível</th>
                  <th>Status</th>
                  <th>Vendas Aprovadas</th>
                  <th width="120">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((plan, index) => (
                  <tr key={index}>
                    <td><code>{plan.code}</code></td>
                    <td>{plan.name}</td>
                    <td>{plan.items}</td>
                    <td><span className="badge bg-primary">{plan.price}</span></td>
                    <td><span className="badge bg-success-subtle text-success">{plan.visible}</span></td>
                    <td><span className="badge bg-success-subtle text-success">{plan.status}</span></td>
                    <td><span className="badge bg-info-subtle text-info">{plan.sales}</span></td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Button variant="outline-primary" size="sm">
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <Icon icon="mdi:link-variant" />
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
    }

    if (plansSubMenu === "upsell") {
      return (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-0">Planos de Upsell</h5>
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
                <span className="text-muted">resultados por página</span>
              </div>
              <div className="input-group" style={{ width: "300px" }}>
                <span className="input-group-text">
                  <Icon icon="mdi:magnify" />
                </span>
                <input type="text" className="form-control" placeholder="Pesquisar" />
              </div>
            </div>

            <Table responsive className="align-middle">
              <thead>
                <tr>
                  <th>Chave</th>
                  <th>Nome do Plano</th>
                  <th>Nome do Produto Upsell</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th width="120">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    <Icon icon="mdi:trending-up" className="fs-1 mb-2" />
                    <br />
                    Nenhum registro encontrado
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">Mostrando 0 até 0 de 0 registros</small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <span className="page-link">
                      <Icon icon="mdi:chevron-left" />
                    </span>
                  </li>
                  <li className="page-item disabled">
                    <span className="page-link">
                      <Icon icon="mdi:chevron-right" />
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
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
              <Button variant="primary">
                <Icon icon="mdi:plus" className="me-2" />
                Novo Checkout
              </Button>
            </div>
            <div className="card-body">
              <Table responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Cor Primária</th>
                    <th>Layout</th>
                    <th>Status</th>
                    <th width="120">Ações</th>
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
                      <div className="btn-group btn-group-sm">
                        <Button variant="outline-primary" size="sm">
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <Icon icon="mdi:link-variant" />
                        </Button>
                      </div>
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
                      <div className="btn-group btn-group-sm">
                        <Button variant="outline-primary" size="sm">
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <Icon icon="mdi:link-variant" />
                        </Button>
                      </div>
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
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Comissionamento / Afiliação</h5>
              <p className="text-muted mb-0">Configure as regras de comissionamento para afiliados</p>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border">
                    <div className="card-body text-center">
                      <Icon icon="mdi:percent" className="fs-1 text-primary mb-3" />
                      <h6>Comissão Atual</h6>
                      <h4 className="text-primary">
                        {formatCommissionValue(
                          product?.comission_value || affiliate?.product?.comission_value, 
                          product?.comission_type || affiliate?.product?.comission_type
                        )}
                      </h4>
                      <small className="text-muted">
                        {getCommissionTypeLabel(product?.comission_type || affiliate?.product?.comission_type)}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border">
                    <div className="card-body text-center">
                      <Icon icon="mdi:account-group" className="fs-1 text-success mb-3" />
                      <h6>Afiliados Ativos</h6>
                      <h4 className="text-success">12</h4>
                      <small className="text-muted">afiliados promovendo</small>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Tipo de Comissão</label>
                    <select className="form-select">
                      <option value="percentage">Porcentagem</option>
                      <option value="fixed">Valor Fixo</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Valor da Comissão</label>
                    <div className="input-group">
                      <input type="number" className="form-control" defaultValue={product?.comission_value} />
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="aprovar-auto" />
                      <label className="form-check-label" htmlFor="aprovar-auto">
                        Aprovar automaticamente solicitações de afiliação
                      </label>
                    </div>
                  </div>
                  <div className="col-12 text-end">
                    <Button variant="primary">
                      <Icon icon="mdi:content-save" className="me-2" />
                      Salvar Configurações
                    </Button>
                  </div>
                </div>
              </form>
            </div>
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
              <Button variant="primary">
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
          {/* Progress Steps */}
          <div className="card border-0 bg-light mb-4">
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle" style={{ width: "32px", height: "32px" }}>
                    <Icon icon="mdi:cog" className="fs-6" />
                  </div>
                  <span className="fw-semibold text-primary">Configurações de Pagamento</span>
                </div>
                <Icon icon="mdi:chevron-right" className="text-muted" />
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center bg-light border rounded-circle" style={{ width: "32px", height: "32px" }}>
                    <Icon icon="mdi:account-multiple" className="fs-6 text-muted" />
                  </div>
                  <span className="text-muted">Afiliados</span>
                </div>
                <Icon icon="mdi:chevron-right" className="text-muted" />
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center bg-light border rounded-circle" style={{ width: "32px", height: "32px" }}>
                    <Icon icon="mdi:eye" className="fs-6 text-muted" />
                  </div>
                  <span className="text-muted">Pré-visualização</span>
                </div>
                <Icon icon="mdi:chevron-right" className="text-muted" />
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center bg-light border rounded-circle" style={{ width: "32px", height: "32px" }}>
                    <Icon icon="mdi:email" className="fs-6 text-muted" />
                  </div>
                  <span className="text-muted">E-mail e Entrega</span>
                </div>
                <Icon icon="mdi:chevron-right" className="text-muted" />
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center justify-content-center bg-light border rounded-circle" style={{ width: "32px", height: "32px" }}>
                    <Icon icon="mdi:check-circle" className="fs-6 text-muted" />
                  </div>
                  <span className="text-muted">Confirmação</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Coluna Esquerda - Configurações */}
            <div className="col-lg-6">
              {/* Configurações Gerais */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:cog-outline" className="me-2 text-primary" />
                    Configurações Gerais
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Disponível para venda?</label>
                          <small className="text-muted d-block">Permitir que este plano seja vendido</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="disponivel-venda" defaultChecked style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Ocultar plano para afiliados?</label>
                          <small className="text-muted d-block">Plano não aparecerá para afiliados</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="ocultar-afiliados" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                        <div>
                          <label className="form-label mb-1 fw-semibold">Exigir confirmação do e-mail na compra?</label>
                          <small className="text-muted d-block">Cliente precisará confirmar e-mail</small>
                        </div>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="confirmar-email" style={{ transform: "scale(1.3)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Limites e Controles */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:speedometer" className="me-2 text-warning" />
                    Limites e Controles
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:cart-outline" className="me-1" />
                        Limite de vendas por plano
                      </label>
                      <input type="number" className="form-control" placeholder="Ilimitado" />
                      <small className="text-muted">Deixe vazio para ilimitado</small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:check-circle-outline" className="me-1" />
                        Limite por vendas aprovados
                      </label>
                      <input type="number" className="form-control" placeholder="Ilimitado" />
                      <small className="text-muted">Apenas vendas aprovadas</small>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:file-multiple" className="me-1" />
                        Arquivo Único *
                      </label>
                      <input type="number" className="form-control" defaultValue="0" />
                      <small className="text-muted">Legal o envio de múltiplos de diferentes arquivos em uma compra.</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload de Imagens */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:image-multiple" className="me-2 text-info" />
                    Imagem do Produto
                  </h6>
                </div>
                <div className="card-body">
                  <div className="border-2 border-dashed border-primary rounded p-4 text-center bg-primary-subtle">
                    <Icon icon="mdi:cloud-upload" className="fs-1 text-primary mb-3" />
                    <h6 className="text-primary mb-2">Arraste e solte os arquivos aqui</h6>
                    <p className="text-muted mb-3">ou clique para selecionar</p>
                    <button className="btn btn-outline-primary">
                      <Icon icon="mdi:folder-open" className="me-2" />
                      Procurar Arquivos
                    </button>
                    <small className="d-block text-muted mt-2">Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Dados do Plano */}
            <div className="col-lg-6">
              {/* Informações Básicas */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:package-variant" className="me-2 text-success" />
                    Informações do Plano
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:tag" className="me-1" />
                        Nome do Plano *
                      </label>
                      <input type="text" className="form-control form-control-lg" placeholder="Ex: Plano Premium" />
                    </div>

                    <div className="col-12">
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
                        <Icon icon="mdi:counter" className="me-1" />
                        Quantidade da ficha inclusos no plano *
                      </label>
                      <input type="number" className="form-control" defaultValue="1" min="1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* URLs de Configuração */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:link-variant" className="me-2 text-purple" />
                    URLs de Configuração
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:check-circle" className="me-1 text-success" />
                        URL de finalizamento/Obrigado Volta *
                      </label>
                      <input type="url" className="form-control" placeholder="https://exemplo.com/obrigado" />
                      <small className="text-muted">Página mostrada após compra aprovada</small>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:receipt" className="me-1 text-warning" />
                        URL de finalizamento para boletos
                      </label>
                      <input type="url" className="form-control" placeholder="https://exemplo.com/boleto" />
                      <small className="text-muted">Específica para pagamentos via boleto</small>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <Icon icon="mdi:qrcode" className="me-1 text-info" />
                        URL de finalizamento para PIX
                      </label>
                      <input type="url" className="form-control" placeholder="https://exemplo.com/pix" />
                      <small className="text-muted">Específica para pagamentos via PIX</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fornecedores */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h6 className="card-title mb-0 d-flex align-items-center">
                    <Icon icon="mdi:account-group" className="me-2 text-orange" />
                    Fornecedores
                  </h6>
                  <small className="text-muted">Configure os responsáveis pelos pagamentos</small>
                </div>
                <div className="card-body">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="border rounded p-3 mb-3 bg-light">
                      <h6 className="mb-3 d-flex align-items-center">
                        <Icon icon="mdi:account" className="me-2" />
                        Responsável {num}
                      </h6>
                      <div className="row g-2">
                        <div className="col-12">
                          <label className="form-label fw-medium">Descrição</label>
                          <input type="text" className="form-control form-control-sm" placeholder="Nome do responsável" />
                          <small className="text-muted">Pessoa que deve receber quando este responsável...</small>
                        </div>
                        <div className="col-6">
                          <label className="form-label fw-medium">Moeda</label>
                          <input type="text" className="form-control form-control-sm" placeholder="R$ 0,00" />
                        </div>
                        <div className="col-6">
                          <label className="form-label fw-medium">Valor</label>
                          <input type="text" className="form-control form-control-sm" placeholder="R$ 5,00" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="d-flex align-items-center justify-content-between p-3 bg-warning-subtle rounded">
                    <div>
                      <label className="form-label mb-1 fw-semibold">Assumir impostos de fornecedor?</label>
                      <small className="text-muted d-block">
                        Você assume cobrar impostos Bruto e divulgar no fornecedor aos responsáveis
                      </small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="assumir-imposto" style={{ transform: "scale(1.3)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <Modal.Header closeButton>
          <Modal.Title>
            <Icon icon="mdi:trending-up" className="me-2" />
            Configurações do Upsell
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Selecione o Produto que deseja ofertar como Upsell</label>
                  <select className="form-select">
                    <option>Selecione</option>
                    <option>Produto 1</option>
                    <option>Produto 2</option>
                  </select>
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Selecione o Plano que deseja vender como Upsell</label>
                  <select className="form-select">
                    <option>Selecione um produto primeiro</option>
                  </select>
                </div>
              </Col>

              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Máximo de parcelas no cartão *</label>
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
                  <label className="form-label">
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
                  <label className="form-label">
                    Checkout Padrão (Quando não conseguir processar a compra com um clique)
                  </label>
                  <select className="form-select">
                    <option>Selecione um checkout</option>
                    <option>Checkout Padrão</option>
                    <option>Checkout Customizado</option>
                  </select>
                </div>
              </Col>

              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label">Comissão para afiliados?</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="comissao-upsell" />
                    <label className="form-check-label" htmlFor="comissao-upsell">
                      Habilitar comissão
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewUpsellModal(false)}>
            Cancelar
          </Button>
          <Button variant="success">
            <Icon icon="mdi:content-save" className="me-2" />
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Viewproduct;
