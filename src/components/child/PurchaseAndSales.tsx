import React from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const PurchaseAndSales: React.FC = () => {
  let { purchaseSaleChartOptions, purchaseSaleChartSeries } =
    useReactApexChart();
  return (
    <div className='col-xxl-4 col-md-6'>
      <div className='card h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Faturamento & Saque</h6>
            <select className='form-select form-select-sm w-auto bg-base text-secondary-light'>
              <option>Mês</option>
              <option>Semana</option>
              <option>Ano</option>
            </select>
          </div>
        </div>
        <div className='card-body p-24'>
          <ul className='d-flex flex-wrap align-items-center justify-content-center my-3 gap-3'>
            <li className='d-flex align-items-center gap-2'>
              <span className='w-12-px h-8-px rounded-pill bg-warning-600' />
              <span className='text-secondary-light text-sm fw-semibold'>
                Faturado: R$
                <span className='text-primary-light fw-bold'>1.434.500,12</span>
              </span>
            </li>
            <li className='d-flex align-items-center gap-2'>
              <span className='w-12-px h-8-px rounded-pill bg-success-600' />
              <span className='text-secondary-light text-sm fw-semibold'>
                Sacado: R$<span className='text-primary-light fw-bold'>800.000,00</span>
              </span>
            </li>
          </ul>
          <div id='purchaseSaleChart' className='margin-16-minus y-value-left'>
            <ReactApexChart
              options={purchaseSaleChartOptions}
              series={purchaseSaleChartSeries}
              type='bar'
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAndSales; 