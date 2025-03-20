import React from 'react';
import { BaseTemplate } from '../../Container';
import { CardWithGraph, CardWithCandleGraph, CardWithPieGraph, InfoTable, CardWithBarGraph } from '../../components';
import { salesData, revenueData, profitData, checkoutConversionData, ticketMedioData, cancelledOrdersData, boletoConversionData, pixConversionData, returningCustumerRate, abbandonedCarts, parcelamentosData, paymentsData, paymentsMethods, paymentsTypes, } from '../../data/data';
import { CardContainer } from './styles';

const Reports: React.FC = () => {
  return (
    <BaseTemplate value="R$ 76.960,20">
      <CardContainer>
        <CardWithGraph
          title="Vendas"
          value="R$ 25,250.00"
          change="- R$ 25.52"
          details="104 pedidos realizados"
          data={salesData}
          dataKey="vendas"
          stroke="#4FCACA"
        />
        
        <CardWithGraph
          title="Receitas"
          value="R$ 9.378,52"
          change="+16,52"
          details="104 pedidos realizados"
          data={revenueData}
          dataKey="receitas"
          stroke="#4FCACA"
        />

        <CardWithGraph
          title="Lucro"
          value="R$ 9.378,52"
          change="+27.71%"
          details="ROI: 27.71%, Margem de Lucro: 27.71%, CPA: R$ 87.37"
          data={profitData}
          dataKey="lucro"
          stroke="#4FCACA"
        />

        <CardWithCandleGraph
          title="Conversão do Checkout"
          value="12.59%"
          change=""
          details="102 Pedidos criados"
          data={checkoutConversionData}
          dataKey="value"
          colors={['#00C49F', '#0088FE', '#FF69B4', '#800080']}
        />

        <CardWithGraph
          title="Ticket Médio"
          value="R$ 116,93"
          change=""
          details=""
          data={ticketMedioData}
          dataKey="value"
          stroke="#4FCACA"
        />

        <CardWithGraph
          title="Taxa de Pedidos Cancelados"
          value="16%"
          change=""
          details="Mai - Set"
          data={cancelledOrdersData}
          dataKey="value"
          stroke="#4FCACA"
        />

        <CardWithGraph
          title="Taxa de Conversão de Boletos"
          value="15%"
          change=""
          details="32 Boletos"
          data={boletoConversionData}
          dataKey="value"
          stroke="#4FCACA"
        />

        <CardWithGraph
          title="Taxa de Conversão por Pix"
          value="15%"
          change=""
          details="67 Gerados, 43 Pagos"
          data={pixConversionData}
          dataKey="value"
          stroke="#4FCACA"
        />
        <CardWithGraph
          title="Taxa de clientes recorrentes"
          value="3%"
          change=""
          details="3 recorrentes 101 Novos Clientes"
          data={returningCustumerRate}
          dataKey="value"
          stroke="#4FCACA"
        />
        <CardWithGraph
          title="Carrinhos abandonados"
          value="R$ 381,15"
          change=""
          details="Valor recuperado"
          data={abbandonedCarts}
          dataKey="value"
          stroke="#4FCACA"
        />

        <CardWithPieGraph 
          title="Parcelamentos" 
          subtitle="Parcelamento mais utilizado: 7x" 
          data={parcelamentosData} 
          dataKey="value" 
          innerRadius={60}
        />

        <CardWithPieGraph 
          title="Formas de Pagamento" 
          subtitle="Forma de pagamento mais ultilizada: Pix" 
          data={paymentsData} 
          dataKey="value" 
        />
        
        <CardWithPieGraph 
          title="Pedidos Pagos" 
          subtitle="3 formas de pagamento" 
          data={paymentsMethods} 
          dataKey="value" 
          innerRadius={60}
        />

<CardWithBarGraph title="Conversão" data={paymentsTypes} />
        
      </CardContainer>
    </BaseTemplate>
  );
};

export default Reports;
