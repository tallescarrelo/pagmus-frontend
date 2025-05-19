import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";

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

  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle("");
  };

  const sampleData = [
    { code: "#platelw1", name: "Plano Teste 2", items: 1, price: "R$ 60,00", visible: "VISÍVEL", status: "ATIVO", sales: 0 },
    { code: "#plav84xr", name: "Plano teste", items: 1, price: "R$ 50,00", visible: "VISÍVEL", status: "ATIVO", sales: 0 },
  ];

  if (!product && !affiliate) {
    return <p>Produto não encontrado</p>;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <div className="d-flex align-items-center gap-3">
          <h4 className="mb-0 fw-semibold text-xl">{product?.name || affiliate?.product?.name}</h4>
          <span className="badge bg-primary-50 text-primary-600">Código: {product?.id || affiliate?.product?.id}</span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-secondary radius-8 d-flex align-items-center gap-2">
            <Icon icon="mdi:star-outline" /> Adicionar aos favoritos
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-5">
        {["Planos", "Checkouts", "Urls", "Comissionamento / Afiliação", "Cupons de Desconto"].map((title, idx) => (
          <button
            key={idx}
            className="btn btn-link p-0 text-decoration-none text-primary-light text-sm fw-semibold"
            onClick={() => handleOpenModal(title)}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="row gy-4">
        <div className="col-lg-4">
          <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
            <div className="text-center border-bottom p-3">
              <img
                src={product?.image_url || affiliate?.product?.image_url}
                alt=""
                className="border br-white border-width-2-px rounded object-fit-cover"
                style={{ objectFit: "cover", maxHeight: "300px", width: "100%", height: "auto" }}
              />
            </div>

            <div className="mt-24 px-3 pb-3">
              <div className="alert alert-warning radius-8 p-16 mb-4">
                <strong className="d-block mb-2">Atenção!</strong>
                Ainda faltam algumas pendências a serem resolvidas para que seu produto seja aprovado.
                <div className="text-end mt-2">
                  <button className="btn btn-warning btn-sm">Ver Detalhes</button>
                </div>
              </div>

              <ul className="list-unstyled">
                {[ 
                  { label: "Status", value: "Aguardando Alteração" },
                  { label: "Formato", value: "Infoproduto" },
                  { label: "Categoria", value: product?.category || affiliate?.product?.category },
                  { label: "Página de Venda", value: "https://produto.com/pagina" },
                  { label: "Tipo de Comissão", value: getCommissionTypeLabel(product?.comission_type || affiliate?.product?.comission_type) },
                  { label: "Preço", value: formatCurrency(product?.price || affiliate?.product?.price) },
                  { label: "Comissão", value: formatCommissionValue(product?.comission_value || affiliate?.product?.comission_value, product?.comission_type || affiliate?.product?.comission_type) }
                ].map((item, idx) => (
                  <li key={idx} className="d-flex justify-content-between border-bottom py-2">
                    <span className="fw-semibold text-secondary-dark">{item.label}:</span>
                    <span className="text-secondary-light">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-body p-24">
              <h6 className="text-lg mb-3">Dados do Produto</h6>
              <p className="text-sm text-secondary-light">
                Aqui você pode configurar os dados gerais do seu produto.
              </p>
              <form>
                <div className="mb-3">
                  <label className="form-label">Disponível para venda?</label>
                  <div>
                    <input type="checkbox" className="form-check-input" defaultChecked />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Moedas</label>
                  <input type="text" className="form-control" defaultValue="BRL (R$) - Real brasileiro" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nome *</label>
                  <input type="text" className="form-control" defaultValue={product?.name} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrição *</label>
                  <textarea className="form-control" rows="4" defaultValue={product?.description} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoria *</label>
                  <select className="form-select">
                    <option selected>{product?.category}</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <input type="text" className="form-control" defaultValue="teste" />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL da página de vendas *</label>
                  <input type="url" className="form-control" defaultValue="https://sparkmobile.com.br" />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL da página de obrigado</label>
                  <input type="url" className="form-control" defaultValue="https://sparkmobile.com.br" />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL da página do reclame aqui</label>
                  <input type="url" className="form-control" defaultValue="https://sparkmobile.com.br" />
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail de suporte</label>
                  <input type="email" className="form-control" defaultValue="tallescarrelo@gmail.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tempo de garantia *</label>
                  <input type="number" className="form-control" defaultValue="30" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Divulgar dados para emissão de nota fiscal para o afiliado?</label>
                  <div>
                    <input type="checkbox" className="form-check-input" />
                  </div>
                </div>
                <div className="text-end">
                  <button className="btn btn-primary">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
<Modal.Body>
  {(() => {
    switch (modalTitle) {
      case "Planos":
        return (
          <Table striped bordered hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Itens por plano</th>
                <th>Valor</th>
                <th>Visível</th>
                <th>Status</th>
                <th>Vendas Aprovadas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.code}</td>
                  <td>{plan.name}</td>
                  <td>{plan.items}</td>
                  <td><span className="badge bg-primary text-white">{plan.price}</span></td>
                  <td><span className="badge bg-success-light text-success">{plan.visible}</span></td>
                  <td><span className="badge bg-success-light text-success">{plan.status}</span></td>
                  <td><span className="badge bg-info-light text-info">{plan.sales}</span></td>
                  <td>
                    <Button size="sm" variant="outline-primary" className="me-2">
                      <Icon icon="mdi:pencil-outline" />
                    </Button>
                    <Button size="sm" variant="outline-secondary">
                      <Icon icon="mdi:link-variant" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

      case "Checkouts":
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Checkouts disponíveis</h6>
        <Button variant="primary" size="sm">
          <Icon icon="mdi:plus" className="me-1" />
          Novo Checkout
        </Button>
      </div>
      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Cor Primária</th>
            <th>Layout</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Checkout padrão</td>
            <td>Clássico</td>
            <td>
              <span className="badge" style={{ backgroundColor: "#2364DA" }}>
                #2364DA
              </span>
            </td>
            <td>Layout 1</td>
            <td>
              <span className="badge bg-success-light text-success">Ativo</span>
            </td>
            <td>
              <Button size="sm" variant="outline-primary" className="me-2">
                <Icon icon="mdi:pencil-outline" />
              </Button>
              <Button size="sm" variant="outline-secondary">
                <Icon icon="mdi:link-variant" />
              </Button>
            </td>
          </tr>
          <tr>
            <td>Checkout escuro</td>
            <td>Customizado</td>
            <td>
              <span className="badge" style={{ backgroundColor: "#000000" }}>
                #000000
              </span>
            </td>
            <td>Layout 2</td>
            <td>
              <span className="badge bg-secondary-light text-secondary">Inativo</span>
            </td>
            <td>
              <Button size="sm" variant="outline-primary" className="me-2">
                <Icon icon="mdi:pencil-outline" />
              </Button>
              <Button size="sm" variant="outline-secondary">
                <Icon icon="mdi:link-variant" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );

  case "Urls":
  return (
    <>
      <h6 className="mb-3">Adicionar URL</h6>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Descrição *</label>
          <input type="text" className="form-control" placeholder="Ex: Página de vendas 1" maxLength={255} />
        </div>
        <div className="col-md-6">
          <label className="form-label">URL *</label>
          <input type="url" className="form-control" placeholder="Ex: http://exemplo.com.br" maxLength={255} />
        </div>
        <div className="col-12 d-flex align-items-center gap-2">
          <input type="checkbox" className="form-check-input" id="privada" />
          <label htmlFor="privada" className="form-check-label">URL privada</label>
        </div>
        <div className="col-12 text-end">
          <Button variant="success">
            <Icon icon="mdi:plus" className="me-1" />
            Adicionar
          </Button>
        </div>
      </div>

      <h6 className="mb-3">URLs adicionadas</h6>
      <Table striped bordered hover responsive className="align-middle mb-0">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Url Destino</th>
            <th>Privado</th>
            <th>Status</th>
            <th>Vendas Fechadas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6" className="text-center text-muted">
              Nenhum registro encontrado
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );

  case "Cupons de Desconto":
  return (
    <>
      <div className="alert alert-primary p-3 radius-8 mb-4">
        <strong>Atenção:</strong> Cupons maiores a 90% do valor do plano não serão aplicados!
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Cupons de Desconto Cadastrados</h6>
        <Button variant="primary">
          <Icon icon="mdi:plus" className="me-1" />
          Novo Cupom
        </Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <label className="form-label mb-0">Resultados por página:</label>
          <select className="form-select form-select-sm w-auto">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <input type="text" className="form-control form-control-sm w-auto" placeholder="Pesquisar" />
      </div>

      <Table striped bordered hover responsive className="align-middle mb-0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Moeda</th>
            <th>Tipo do Cupom</th>
            <th>Tipo Pagamento</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Quant. Vendas Pagas</th>
            <th>Quant. Vendas Criadas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="9" className="text-center text-muted">
              Nenhum registro encontrado
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );

    }
  })()}
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Viewproduct;
