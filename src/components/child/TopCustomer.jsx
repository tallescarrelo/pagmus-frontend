import React from "react";
import { Link } from "react-router-dom";

const TopCustomer = () => {
  return (
    <div className='col-xxl-4 col-md-6'>
      <div className='card h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Produtos afiliado</h6>
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
                  <th scope='col'>ID</th>
                  <th scope='col'>Produto </th>
                  <th scope='col'>Comissssão</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className='text-secondary-light'>1233</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>
                      Produto 1
                    </span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>15%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>2334</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Produto 2</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>65%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>3213</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Produto 3</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>45%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>4435</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>
                      Produto 4
                    </span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>25%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>5232</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>
                      Produto 5
                    </span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>25%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className='text-secondary-light'>6544</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>Produto 6</span>
                  </td>
                  <td>
                    <span className='text-secondary-light'>45%</span>
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

export default TopCustomer;
