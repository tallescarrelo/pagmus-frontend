import React from "react";

const UnitCountSeven = () => {
  return (
    <div className='col-12'>
      <div className='card radius-12'>
        <div className='card-body p-16'>
          <div className='row gy-4'>
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='px-20 py-16 shadow-none radius-8 h-100 gradient-deep-1 left-line line-bg-primary position-relative overflow-hidden'>
                <div className='d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8'>
                  <div>
                    <span className='mb-2 fw-medium text-secondary-light text-md'>
                      Saldo disponível
                    </span>
                    <h6 className='fw-semibold mb-1'>R$ 640,000</h6>
                  </div>
                  <span className='w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-primary-100 text-primary-600'>
                      <i className="ri-money-dollar-circle-line"></i>
                  </span>
                </div>
                <p className='text-sm mb-0'>
                  <span className='bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm'>
                    <i className='ri-arrow-right-up-line' /> 13%
                  </span>{" "}
                  em relação ao mês passado
                </p>
              </div>
            </div>
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='px-20 py-16 shadow-none radius-8 h-100 gradient-deep-2 left-line line-bg-lilac position-relative overflow-hidden'>
                <div className='d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8'>
                  <div>
                    <span className='mb-2 fw-medium text-secondary-light text-md'>
                      Saldo para saque
                    </span>
                    <h6 className='fw-semibold mb-1'>R$ 135,000</h6>
                  </div>
                  <span className='w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-lilac-200 text-lilac-600'>
                  <i className="ri-money-dollar-circle-line"></i>
                  </span>
                </div>
                <p className='text-sm mb-0'>
                  <span className='bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm'>
                    <i className='ri-arrow-right-up-line' /> 25%
                  </span>{" "}
                  em relação ao mês passado
                </p>
              </div>
            </div>
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='px-20 py-16 shadow-none radius-8 h-100 gradient-deep-3 left-line line-bg-success position-relative overflow-hidden'>
                <div className='d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8'>
                  <div>
                    <span className='mb-2 fw-medium text-secondary-light text-md'>
                      Vendas hoje
                    </span>
                    <h6 className='fw-semibold mb-1'>R$ 330,000</h6>
                  </div>
                  <span className='w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-success-200 text-success-600'>
                  <i className="ri-money-dollar-circle-line"></i>
                  </span>
                </div>
                <p className='text-sm mb-0'>
                  <span className='bg-danger-focus px-1 rounded-2 fw-medium text-danger-main text-sm'>
                    <i className='ri-arrow-right-down-line' /> 10%
                  </span>{" "}
                  em relação ao mês passado
                </p>
              </div>
            </div>
            <div className='col-xxl-3 col-xl-4 col-sm-6'>
              <div className='px-20 py-16 shadow-none radius-8 h-100 gradient-deep-4 left-line line-bg-warning position-relative overflow-hidden'>
                <div className='d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8'>
                  <div>
                    <span className='mb-2 fw-medium text-secondary-light text-md'>
                      Saldo a liberar
                    </span>
                    <h6 className='fw-semibold mb-1'>R$ 67,000</h6>
                  </div>
                  <span className='w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-2xl mb-12 bg-warning-focus text-warning-600'>
                    <i className="ri-money-dollar-circle-line"></i>
                  </span>
                </div>
                <p className='text-sm mb-0'>
                  <span className='bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm'>
                    <i className='ri-arrow-right-up-line' /> 10%
                  </span>{" "}
                  em relação ao mês passado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCountSeven;
