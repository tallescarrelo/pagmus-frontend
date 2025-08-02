import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  [key: string]: any;
}

interface TopSuppliersProps {
  myProducts?: Product[];
}

const TopSuppliers: React.FC<TopSuppliersProps> = ({ myProducts }) => {
  return (
    <div className="col-xxl-4 col-md-6">
      <div className="card h-100">
        <div className="card-header">
          <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
            <h6 className="mb-2 fw-bold text-lg mb-0">Meus produtos</h6>
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
                  <th scope="col">Id</th>
                  <th scope="col">Produto </th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(myProducts) && myProducts.length > 0 ? (
                  myProducts.map((products) => (
                    <tr key={products.id}>
                      <td>
                        <span className="text-secondary-light">
                          {products.id}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          {products.name}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          R$ {products.price}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center text-muted">
                      Nenhum produto encontrado
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

export default TopSuppliers; 