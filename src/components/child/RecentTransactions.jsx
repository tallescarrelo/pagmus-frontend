import React from "react";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  return (
    <div className='col-xxl-8'>
      <div className='card h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Vendas recente</h6>
            <Link
              to='#'
              className='text-primary-600 hover-text-primary d-flex align-items-center gap-1'
            >
              View All
              <iconify-icon
                icon='solar:alt-arrow-right-linear'
                className='icon'
              />
            </Link>
          </div>
        </div>
        <div className='card-body p-24'>
          <div className='table-responsive scroll-sm'>
            <table className='table bordered-table mb-0'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Produto</th>
                  <th scope='col'>Data </th>
                  <th scope='col'>Forma pagamento</th>
                  <th scope='col'>Valor</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className='text-secondary-light'>1</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gotinha Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>21/02/2025 14:34:34</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Crédito</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 150,00</span>
                  </td>
                  <td>
                  <span className='text-success-main fw-medium text-md'>Pago</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>1</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gotinha Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>21/02/2025 14:34:34</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Crédito</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 150,00</span>
                  </td>
                  <td>
                  <span className='text-success-main fw-medium text-md'>Pago</span>
                  </td>
                </tr>                <tr>
                  <td>
                    <span className='text-secondary-light'>1</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gotinha Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>21/02/2025 14:34:34</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Crédito</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 150,00</span>
                  </td>
                  <td>
                  <span className='text-success-main fw-medium text-md'>Pago</span>
                  </td>
                </tr>                <tr>
                  <td>
                    <span className='text-secondary-light'>1</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gotinha Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>21/02/2025 14:34:34</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Crédito</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 150,00</span>
                  </td>
                  <td>
                  <span className='text-success-main fw-medium text-md'>Pago</span>
                  </td>
                </tr>                <tr>
                  <td>
                    <span className='text-secondary-light'>1</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gotinha Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>21/02/2025 14:34:34</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Crédito</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 150,00</span>
                  </td>
                  <td>
                  <span className='text-success-main fw-medium text-md'>Pago</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
