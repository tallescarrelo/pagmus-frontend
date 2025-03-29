import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const AffiliatesOfMyProducts = ({ affiliates }) => {
  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div className="icon-field">
            <input
              type="text"
              name="search"
              className="form-control form-control-sm w-auto"
              placeholder="Pesquisar por..."
            />
            <span className="icon">
              <Icon icon="ion:search-outline" />
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button
              className="btn btn-outline-primary-600 not-active px-18 py-11 dropdown-toggle toggle-icon"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtrar por Produto
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="#">
                  Gota Angolana
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Gota Nigeriana
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Gota Americana
                </Link>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-outline-primary-600 not-active px-18 py-11 dropdown-toggle toggle-icon"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtrar por status
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="#">
                  Aprovado
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Recusado
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Pendente
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-body">
        <table className="table bordered-table mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Afiliado</th>
              <th>Email</th>
              <th>Produto</th>
              <th>Data da solicitação</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((affiliates) => (
              <tr key={affiliates.id}>
                <td>{affiliates.id}</td>
                <td>
                  <Link to="/view-profile" className="text-primary-600">
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/images/user-list/user-list1.png"
                        alt=""
                        className="flex-shrink-0 me-12 radius-8"
                      />
                      <h6 className="text-md mb-0 fw-medium flex-grow-1">
                        {affiliates.affiliate.name}
                      </h6>
                    </div>
                  </Link>
                </td>
                <td>{affiliates.affiliate.email}</td>
                <td>
                  <Link to="/view-profile" className="text-primary-600">
                    <div className="d-flex align-items-center">
                      <img
                        src={affiliates.product.image_url}
                        alt={affiliates.product.name}
                        className="flex-shrink-0 me-12 radius-8"
                        style={{ width: 24, height: 24 }}
                      />
                      <h6 className="text-md mb-0 fw-medium flex-grow-1">
                        {affiliates.product.name}
                      </h6>
                    </div>
                  </Link>
                </td>
                <td>
                  {new Date(affiliates.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                    {affiliates.isActive ? "Aprovado" : "Pendente"}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-primary-600 not-active px-18 py-11 dropdown-toggle toggle-icon"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Ação
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAprovar"
                        >
                          Aprovar
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#modalReprovar"
                        >
                          Reprovar
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
          <span>Showing 1 to 10 of 12 entries</span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <Link
                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                to="#"
              >
                <Icon icon="ep:d-arrow-left" className="text-xl" />
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-primary-600 text-white fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px"
                to="#"
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-primary-50 text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px"
                to="#"
              >
                2
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-primary-50 text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px"
                to="#"
              >
                3
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                to="#"
              >
                {" "}
                <Icon icon="ep:d-arrow-right" className="text-xl" />{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal de Aprovar */}
      <div
        className="modal fade"
        id="modalAprovar"
        tabIndex={-1}
        aria-labelledby="modalAprovarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header">
              <h6 className="modal-title" id="modalAprovarLabel">
                Confirmar Aprovação
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              />
            </div>
            <div className="modal-body">
              Deseja realmente aprovar esta solicitação de afiliação?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-success">
                Confirmar Aprovação
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Reprovar */}
      <div
        className="modal fade"
        id="modalReprovar"
        tabIndex={-1}
        aria-labelledby="modalReprovarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header">
              <h6 className="modal-title" id="modalReprovarLabel">
                Confirmar Reprovação
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              />
            </div>
            <div className="modal-body">
              Deseja realmente reprovar esta solicitação de afiliação?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-danger">
                Confirmar Reprovação
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatesOfMyProducts;
