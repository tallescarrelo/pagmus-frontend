import React from "react";
import { Link } from "react-router-dom";

const TopCustomer = ({ affiliates }) => {
  return (
    <div className="col-xxl-4 col-md-6">
      <div className="card h-100">
        <div className="card-header">
          <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
            <h6 className="mb-2 fw-bold text-lg mb-0">Produtos afiliado</h6>
            <Link
              to="#"
              className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
            >
              Ver todos
              <iconify-icon
                icon="solar:alt-arrow-right-linear"
                className="icon"
              />
            </Link>
          </div>
        </div>
        <div className="card-body p-24">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Produto </th>
                  <th scope="col">Comissão</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(affiliates) && affiliates.length > 0 ? (
                  affiliates.map((affiliate) => (
                    <tr key={affiliate?.id}>
                      <td>
                        <span className="text-secondary-light">
                          {affiliate?.id}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          {affiliate?.product?.name || 'Produto'}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          {affiliate?.product?.comission_value || '0'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      Nenhum produto afiliado encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCustomer;
