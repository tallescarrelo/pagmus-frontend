import React from "react";
import { Link } from "react-router-dom";

const TopSuppliers = () => {
  return (
    <div className='col-xxl-4 col-md-6'>
      <div className='card h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Meus produtos</h6>
            <Link
              to='#'
              className='text-primary-600 hover-text-primary d-flex align-items-center gap-1'
            >
              Ver todos
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
                  <th scope='col'>Id</th>
                  <th scope='col'>Produto </th>
                  <th scope='col'>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className='text-secondary-light'>3231</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gota Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 330,00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>1233</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gota Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 140,00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>3234</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gota Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 50,00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>4343</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gota Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 140,00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>4434</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Gota Angolana</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 170,00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>6</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>
                      Azulzinho angolano
                    </span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>R$ 180,00</span>
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

export default TopSuppliers;
