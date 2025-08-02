import React from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const IncomeVsExpense: React.FC = () => {
  let { incomeExpenseOptions, incomeExpenseSeries } = useReactApexChart();
  return (
    <div className='col-xxl-8'>
      <div className='card h-100'>
        <div className='card-body p-24 mb-8'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Vendas & Comissões </h6>
            <select className='form-select form-select-sm w-auto bg-base border text-secondary-light'>
              <option>Ano</option>
              <option>Mês</option>
              <option>Semana</option>
              <option>Hoje</option>
            </select>
          </div>
          <ul className='d-flex flex-wrap align-items-center justify-content-center my-3 gap-24'>
            <li className='d-flex flex-column gap-1'>
              <div className='d-flex align-items-center gap-2'>
                <span className='w-8-px h-8-px rounded-pill bg-primary-600' />
                <span className='text-secondary-light text-sm fw-semibold'>
                  Vendas{" "}
                </span>
              </div>
              <div className='d-flex align-items-center gap-8'>
                <h6 className='mb-0'>R$ 23.426,21</h6>
                <span className='text-success-600 d-flex align-items-center gap-1 text-sm fw-bolder'>
                  10%
                  <i className='ri-arrow-up-s-fill d-flex' />
                </span>
              </div>
            </li>
            <li className='d-flex flex-column gap-1'>
              <div className='d-flex align-items-center gap-2'>
                <span className='w-8-px h-8-px rounded-pill bg-warning-600' />
                <span className='text-secondary-light text-sm fw-semibold'>
                  Comissões{" "}
                </span>
              </div>
              <div className='d-flex align-items-center gap-8'>
                <h6 className='mb-0'>R$ 17.618,12</h6>
                <span className='text-danger-600 d-flex align-items-center gap-1 text-sm fw-bolder'>
                  10%
                  <i className='ri-arrow-down-s-fill d-flex' />
                </span>
              </div>
            </li>
          </ul>
          <div id='incomeExpense' className='apexcharts-tooltip-style-1'>
            <ReactApexChart
              options={incomeExpenseOptions}
              series={incomeExpenseSeries}
              type='area'
              height={270}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpense; 