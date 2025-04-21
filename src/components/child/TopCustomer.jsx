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
                {affiliates?.map((affiliates) => (
                  <tr key={affiliates?.id}>
                    <td>
                      <span className="text-secondary-light">
                        {affiliates?.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-secondary-light">
                        {affiliates.product.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-secondary-light">
                        {affiliates.product.comission_value}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCustomer;
