export const salesData = [
    { name: 'Mai', vendas: 4000 },
    { name: 'Jun', vendas: 4500 },
    { name: 'Jul', vendas: 4700 },
    { name: 'Ago', vendas: 4600 },
    { name: 'Set', vendas: 4200 },
  ];
  
  export const revenueData = [
    { name: 'Mai', receitas: 10000 },
    { name: 'Jun', receitas: 15000 },
    { name: 'Jul', receitas: 18000 },
    { name: 'Ago', receitas: 17000 },
    { name: 'Set', receitas: 16000 },
  ];
  
  export const profitData = [
    { name: 'Mai', lucro: 5000 },
    { name: 'Jun', lucro: 7000 },
    { name: 'Jul', lucro: 8000 },
    { name: 'Ago', lucro: 7500 },
    { name: 'Set', lucro: 7200 },
  ];
  
  export const checkoutConversionData = [
    { name: 'Dados Pessoais', value: 20000 },
    { name: 'Entrega', value: 18000 },
    { name: 'Pagamento', value: 16000 },
    { name: 'Pedidos', value: 14000 },
  ];
  
  export const ticketMedioData = [
    { name: 'Mai', value: 90 },
    { name: 'Jun', value: 85 },
    { name: 'Jul', value: 95 },
    { name: 'Ago', value: 75 },
    { name: 'Set', value: 70 },
  ];
  
  export const cancelledOrdersData = [
    { name: 'Mai', value: 12 },
    { name: 'Jun', value: 18 },
    { name: 'Jul', value: 15 },
    { name: 'Ago', value: 22 },
    { name: 'Set', value: 16 },
  ];
  
  export const boletoConversionData = [
    { name: 'Mai', value: 10 },
    { name: 'Jun', value: 87 },
    { name: 'Jul', value: 30 },
    { name: 'Ago', value: 25 },
    { name: 'Set', value: 15 },
  ];
  
  export const pixConversionData = [
    { name: 'Mai', value: 15 },
    { name: 'Jun', value: 25 },
    { name: 'Jul', value: 20 },
    { name: 'Ago', value: 99 },
    { name: 'Set', value: 15 },
  ];

  export const  returningCustumerRate = [
    { name: 'Mai', value: 15 },
    { name: 'Jun', value: 25 },
    { name: 'Jul', value: 20 },
    { name: 'Ago', value: 40 },
    { name: 'Set', value: 15 },
  ];

  export const  abbandonedCarts = [
    { name: 'Mai', value: 15 },
    { name: 'Jun', value: 25 },
    { name: 'Jul', value: 50 },
    { name: 'Ago', value: 30 },
    { name: 'Set', value: 15 },
  ];

  export const parcelamentosData = [ 
    { name: '1x', value: 20, color: '#0088FE' }, 
    { name: '2x', value: 30, color: '#FFBB28' }, 
    { name: '7x', value: 40, color: '#FF8042' }, 
    { name: '12x', value: 10, color: '#00C49F' }, 
  ]; 

  export const paymentsData = [ 
    { name: 'Cartão', value: 60, color: '#5388D8' }, 
    { name: 'Pix', value: 40, color: '#F4BE37' },
  ];

  const totalPayments = 3569; 

  export const paymentsMethods = [ 
    { name: 'Cartão', value: 1200, color: '#0088FE' }, 
    { name: 'Boleto', value: 1019, color: '#FFBB28' }, 
    { name: 'Pix', value: 1350, color: '#FF8042' },  
  ].map(method => ({
    ...method,
    percentage: ((method.value / totalPayments) * 100).toFixed(2) + '% - ' + totalPayments
  }));

  const totalConversions = 999;

export const paymentsTypes = [ 
  { name: 'Cartão', value: 333, color: '#5388D8' }, 
  { name: 'Boleto', value: 333, color: '#0D2535' }, 
  { name: 'Pix', value: 333, color: '#F4BE37' },  
].map(method => ({
  ...method,
  percentage: ((method.value / totalConversions) * 100).toFixed(2) + '% - ' + method.value + ' de ' + totalConversions
}));

  
  