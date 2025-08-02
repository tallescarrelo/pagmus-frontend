import React from "react";
import { Link } from "react-router-dom";
import { formatDateBR } from "../../helper/formattedDate";

interface Product {
  id: number;
  name: string;
  price: number;
  [key: string]: any;
}

interface Sale {
  id: number;
  product?: Product;
  created_at: string;
  payment_type?: string;
  status?: string;
  [key: string]: any;
}

interface RecentTransactionsProps {
  recentSales?: Sale[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ recentSales }) => {
  return (
    <div className="col-xxl-8">
      <div className="card h-100">
        <div className="card-header">
          <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
            <h6 className="mb-2 fw-bold text-lg mb-0">Vendas recente</h6>
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
                  <th scope="col">Produto</th>
                  <th scope="col">Data </th>
                  <th scope="col">Forma pagamento</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(recentSales) && recentSales.length > 0 ? (
                  recentSales.map((sales) => (
                    <tr key={sales.id}>
                      <td>
                        <span className="text-secondary-light">{sales.id}</span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          {sales.product?.name || 'Produto'}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          {formatDateBR(sales.created_at)}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          {sales.payment_type || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary-light">
                          R$ {sales.product?.price || '0'}
                        </span>
                      </td>
                      <td>
                        <span className="text-success-main fw-medium text-md">
                          {sales.status || 'Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      Nenhuma venda recente encontrada
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

export default RecentTransactions; 