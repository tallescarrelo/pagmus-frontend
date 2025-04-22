import { Icon } from "@iconify/react";
import React from "react";
import { useLocation } from "react-router-dom";

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

const ProgressWithCircle = ({ watts }) => {
  const percent = Math.min((watts / 150) * 100, 100);

  return (
    <div
      className="position-relative w-100 mt-3 mb-4"
      style={{ height: "40px" }}
    >
      <div
        className="progress h-8-px w-100 bg-neutral-200 radius-8 overflow-hidden"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          className="rounded-pill"
          style={{ width: `${percent}%`, height: "8px", background: "#44ADD4" }}
        />
      </div>
      <div
        className="position-absolute"
        style={{
          left: `${percent}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#44ADD4",
            color: "white",
            fontSize: "11px",
            fontWeight: "600",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "2px",
          }}
        >
          <div style={{ fontSize: "11px", lineHeight: "12px" }}>{watts}</div>
          <div style={{ fontSize: "8px", opacity: 0.9, lineHeight: "10px" }}>
            watts
          </div>
        </div>
      </div>
    </div>
  );
};

const Viewproduct = () => {
  const location = useLocation();
  const product = location.state?.product;
  const affiliate = location.state?.affiliate;

  if (!product && !affiliate) {
    return <p>Produto não encontrado</p>;
  }
  return (
    <div className="row gy-4">
      <div className="col-lg-4">
        <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
          <div className="text-center border-bottom p-3">
            <img
              src={product?.image_url || affiliate?.product?.image_url}
              alt=""
              className="border br-white border-width-2-px rounded object-fit-cover"
              style={{
                objectFit: "cover",
                maxHeight: "300px",
                width: "100%",
                height: "auto",
              }}
            />
            <h4 className="mb-0 mt-3">
              {product?.name || affiliate?.product?.name}
            </h4>
            <span className="text-secondary-light mb-2 d-block small">
              ID: {product?.id || affiliate?.product?.id}
            </span>
          </div>

          <div className="mt-24 px-3">
            <h6 className="text-lg mb-16">Dados do Produto</h6>
            <ul>
              {[
                {
                  label: "Categoria",
                  value: product?.category || affiliate.product?.category,
                },
                {
                  label: "Página de Venda",
                  value: (
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      https://produto.com/pagina
                    </a>
                  ),
                },
                {
                  label: "Tipo de Comissão",
                  value: getCommissionTypeLabel(
                    product?.comission_type || affiliate.product?.comission_type
                  ),
                },
                {
                  label: "Preço",
                  value: formatCurrency(
                    product?.price || affiliate.product?.price
                  ),
                },
                {
                  label: "Comissão",
                  value: formatCommissionValue(
                    product?.comission_value || affiliate.product?.comission_value,
                    product?.comission_type || affiliate.product?.comission_type
                  ),
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="d-flex align-items-center justify-content-between mb-2"
                >
                  <span className="text-sm fw-semibold text-primary-light">
                    {item.label}
                  </span>
                  <span className="text-secondary-light text-sm">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>

            <ProgressWithCircle watts={90} />

            <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
              <button className="btn btn-primary w-100 radius-8">
                Solicitar afiliação
              </button>
            </div>

            <div className="mt-3 text-center">
              <span className="badge bg-primary-50 text-primary-600 p-2 mb-3">
                Você já promove esse produto
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <ul className="nav button-tab nav-pills mb-16" role="tablist">
              <li className="nav-item">
                <button
                  className="nav-link active d-flex align-items-center gap-2"
                  data-bs-toggle="pill"
                  data-bs-target="#desc"
                  type="button"
                >
                  <Icon icon="solar:document-linear" /> Descrição
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center gap-2"
                  data-bs-toggle="pill"
                  data-bs-target="#merchan"
                  type="button"
                >
                  <Icon icon="mdi:bullhorn-outline" /> Merchan
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center gap-2"
                  data-bs-toggle="pill"
                  data-bs-target="#links"
                  type="button"
                >
                  <Icon icon="mdi:link-variant" /> Seus links
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center gap-2"
                  data-bs-toggle="pill"
                  data-bs-target="#campanhas"
                  type="button"
                >
                  <Icon icon="solar:chart-2-outline" /> Campanhas
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link d-flex align-items-center gap-2"
                  data-bs-toggle="pill"
                  data-bs-target="#config"
                  type="button"
                >
                  <Icon icon="uil:setting" /> Configurações
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="desc">
                <h6 className="mb-3">Descrição do Produto</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  at justo a ligula blandit gravida.
                </p>
                <h6 className="mt-4 mb-2">Planos disponíveis</h6>
                <table className="table colored-row-table mb-0">
                  <thead>
                    <tr>
                      <th>Plano</th>
                      <th>Preço</th>
                      <th>Comissão</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kit 1</td>
                      <td>R$ {product?.price || affiliate.product?.price}</td>
                      <td>
                        R${" "}
                        {product?.comission_value ||
                          affiliate.product?.comission_value}
                      </td>
                    </tr>
                    <tr>
                      <td>Kit 2</td>
                      <td>R$ 400</td>
                      <td>R$ 160</td>
                    </tr>
                    <tr>
                      <td>Kit 3</td>
                      <td>R$ 600</td>
                      <td>R$ 240</td>
                    </tr>
                    <tr>
                      <td>Kit 4</td>
                      <td>R$ 800</td>
                      <td>R$ 320</td>
                    </tr>
                    <tr>
                      <td>Kit Premium</td>
                      <td>R$ 1200</td>
                      <td>R$ 480</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="merchan">
                Conteúdo de Merchan
              </div>
              <div className="tab-pane fade" id="links">
                Seus links
              </div>
              <div className="tab-pane fade" id="campanhas">
                Campanhas
              </div>
              <div className="tab-pane fade" id="config">
                <h6 className="mb-3">Configurações</h6>
                <div className="form-switch switch-primary py-12 px-16 border radius-8 mb-2">
                  <div className="d-flex justify-content-between">
                    <span>Produto Ativo</span>
                    <input type="checkbox" className="form-check-input" />
                  </div>
                </div>
                <div className="form-switch switch-primary py-12 px-16 border radius-8 mb-2">
                  <div className="d-flex justify-content-between">
                    <span>Exibir na Loja</span>
                    <input type="checkbox" className="form-check-input" />
                  </div>
                </div>
                <div className="form-switch switch-primary py-12 px-16 border radius-8 mb-2">
                  <div className="d-flex justify-content-between">
                    <span>Receber Notificações</span>
                    <input type="checkbox" className="form-check-input" />
                  </div>
                </div>
                <div className="form-switch switch-primary py-12 px-16 border radius-8 mb-2">
                  <div className="d-flex justify-content-between">
                    <span>Participar de Campanhas</span>
                    <input type="checkbox" className="form-check-input" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewproduct;
