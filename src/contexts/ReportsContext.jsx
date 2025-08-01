import React, { createContext, useContext, useState, useEffect } from 'react';

const ReportsContext = createContext();

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports deve ser usado dentro de um ReportsProvider');
  }
  return context;
};

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: 'all',
    status: 'all',
    product: 'all',
    affiliate: 'all'
  });

  // Carregar dados de relatórios
  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    setLoading(true);
    try {
      // Simular dados de vendas
      const mockSalesData = [
        {
          id: 1,
          date: '2024-01-20',
          product: 'Curso de Marketing Digital',
          customer: 'João Silva',
          affiliate: 'Maria Santos',
          amount: 297.00,
          commission: 89.10,
          status: 'completed',
          payment_method: 'credit_card',
          category: 'education'
        },
        {
          id: 2,
          date: '2024-01-21',
          product: 'E-book: Guia Completo',
          customer: 'Ana Costa',
          affiliate: 'João Silva',
          amount: 47.00,
          commission: 11.75,
          status: 'completed',
          payment_method: 'pix',
          category: 'ebook'
        },
        {
          id: 3,
          date: '2024-01-21',
          product: 'Mentoria Individual',
          customer: 'Pedro Santos',
          affiliate: 'Maria Santos',
          amount: 997.00,
          commission: 299.10,
          status: 'pending',
          payment_method: 'boleto',
          category: 'mentoring'
        },
        {
          id: 4,
          date: '2024-01-22',
          product: 'Curso de Marketing Digital',
          customer: 'Carlos Lima',
          affiliate: 'Pedro Costa',
          amount: 297.00,
          commission: 59.40,
          status: 'completed',
          payment_method: 'credit_card',
          category: 'education'
        },
        {
          id: 5,
          date: '2024-01-22',
          product: 'E-book: Guia Completo',
          customer: 'Fernanda Silva',
          affiliate: 'João Silva',
          amount: 47.00,
          commission: 11.75,
          status: 'completed',
          payment_method: 'pix',
          category: 'ebook'
        }
      ];

      // Simular dados de produtos
      const mockProductsData = [
        {
          id: 1,
          name: 'Curso de Marketing Digital',
          category: 'education',
          total_sales: 594.00,
          total_orders: 2,
          conversion_rate: 3.2,
          avg_order_value: 297.00
        },
        {
          id: 2,
          name: 'E-book: Guia Completo',
          category: 'ebook',
          total_sales: 94.00,
          total_orders: 2,
          conversion_rate: 4.1,
          avg_order_value: 47.00
        },
        {
          id: 3,
          name: 'Mentoria Individual',
          category: 'mentoring',
          total_sales: 997.00,
          total_orders: 1,
          conversion_rate: 1.8,
          avg_order_value: 997.00
        }
      ];

      // Simular dados de afiliados
      const mockAffiliatesData = [
        {
          id: 1,
          name: 'João Silva',
          total_sales: 344.00,
          total_commissions: 23.50,
          total_orders: 2,
          conversion_rate: 3.5,
          avg_order_value: 172.00
        },
        {
          id: 2,
          name: 'Maria Santos',
          total_sales: 1294.00,
          total_commissions: 388.20,
          total_orders: 2,
          conversion_rate: 2.8,
          avg_order_value: 647.00
        },
        {
          id: 3,
          name: 'Pedro Costa',
          total_sales: 297.00,
          total_commissions: 59.40,
          total_orders: 1,
          conversion_rate: 1.5,
          avg_order_value: 297.00
        }
      ];

      // Simular dados de performance
      const mockPerformanceData = {
        total_revenue: 1688.00,
        total_orders: 5,
        total_commissions: 471.25,
        avg_order_value: 337.60,
        conversion_rate: 2.8,
        growth_rate: 15.5,
        top_products: [1, 3, 2],
        top_affiliates: [2, 1, 3],
        sales_by_day: [
          { date: '2024-01-20', sales: 297.00, orders: 1 },
          { date: '2024-01-21', sales: 1044.00, orders: 2 },
          { date: '2024-01-22', sales: 344.00, orders: 2 }
        ],
        sales_by_category: [
          { category: 'education', sales: 594.00, percentage: 35.2 },
          { category: 'mentoring', sales: 997.00, percentage: 59.1 },
          { category: 'ebook', sales: 94.00, percentage: 5.7 }
        ]
      };

      setReports({
        sales: mockSalesData,
        products: mockProductsData,
        affiliates: mockAffiliatesData,
        performance: mockPerformanceData
      });

    } catch (error) {
      console.error('Erro ao carregar dados dos relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gerar relatório personalizado
  const generateReport = async (reportConfig) => {
    setLoading(true);
    try {
      const { type, filters, format } = reportConfig;
      
      // Simular geração de relatório
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const report = {
        id: Date.now(),
        type,
        filters,
        format,
        generated_at: new Date().toISOString(),
        data: getFilteredData(filters)
      };

      setReports(prev => ({
        ...prev,
        custom: [...(prev.custom || []), report]
      }));

      return report;
    } catch (error) {
      throw new Error('Erro ao gerar relatório: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Salvar relatório
  const saveReport = async (reportConfig) => {
    try {
      const savedReport = {
        id: Date.now(),
        name: reportConfig.name,
        description: reportConfig.description,
        config: reportConfig,
        created_at: new Date().toISOString(),
        last_generated: new Date().toISOString()
      };

      setSavedReports(prev => [...prev, savedReport]);
      return savedReport;
    } catch (error) {
      throw new Error('Erro ao salvar relatório: ' + error.message);
    }
  };

  // Exportar relatório
  const exportReport = async (reportId, format) => {
    setLoading(true);
    try {
      // Simular exportação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const report = reports.custom?.find(r => r.id === reportId);
      if (!report) {
        throw new Error('Relatório não encontrado');
      }

      // Simular download
      const fileName = `relatorio_${reportId}_${new Date().toISOString().split('T')[0]}.${format}`;
      
      return {
        fileName,
        downloadUrl: `#download-${reportId}`,
        format
      };
    } catch (error) {
      throw new Error('Erro ao exportar relatório: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Obter dados filtrados
  const getFilteredData = (customFilters = {}) => {
    const currentFilters = { ...filters, ...customFilters };
    let filteredData = [...reports.sales];

    // Aplicar filtros
    if (currentFilters.dateFrom) {
      filteredData = filteredData.filter(item => item.date >= currentFilters.dateFrom);
    }
    if (currentFilters.dateTo) {
      filteredData = filteredData.filter(item => item.date <= currentFilters.dateTo);
    }
    if (currentFilters.category !== 'all') {
      filteredData = filteredData.filter(item => item.category === currentFilters.category);
    }
    if (currentFilters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === currentFilters.status);
    }
    if (currentFilters.product !== 'all') {
      filteredData = filteredData.filter(item => item.product === currentFilters.product);
    }
    if (currentFilters.affiliate !== 'all') {
      filteredData = filteredData.filter(item => item.affiliate === currentFilters.affiliate);
    }

    return filteredData;
  };

  // Obter métricas calculadas
  const getMetrics = (data = reports.sales) => {
    const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);
    const totalOrders = data.length;
    const totalCommissions = data.reduce((sum, item) => sum + item.commission, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const conversionRate = data.filter(item => item.status === 'completed').length / totalOrders * 100;

    return {
      totalRevenue,
      totalOrders,
      totalCommissions,
      avgOrderValue,
      conversionRate
    };
  };

  // Obter dados para gráficos
  const getChartData = (type, filters = {}) => {
    const filteredData = getFilteredData(filters);

    switch (type) {
      case 'sales_by_day':
        const salesByDay = {};
        filteredData.forEach(item => {
          const date = item.date;
          if (!salesByDay[date]) {
            salesByDay[date] = { sales: 0, orders: 0 };
          }
          salesByDay[date].sales += item.amount;
          salesByDay[date].orders += 1;
        });
        return Object.entries(salesByDay).map(([date, data]) => ({
          date,
          sales: data.sales,
          orders: data.orders
        }));

      case 'sales_by_category':
        const salesByCategory = {};
        filteredData.forEach(item => {
          if (!salesByCategory[item.category]) {
            salesByCategory[item.category] = 0;
          }
          salesByCategory[item.category] += item.amount;
        });
        return Object.entries(salesByCategory).map(([category, sales]) => ({
          category,
          sales
        }));

      case 'sales_by_affiliate':
        const salesByAffiliate = {};
        filteredData.forEach(item => {
          if (!salesByAffiliate[item.affiliate]) {
            salesByAffiliate[item.affiliate] = { sales: 0, commissions: 0 };
          }
          salesByAffiliate[item.affiliate].sales += item.amount;
          salesByAffiliate[item.affiliate].commissions += item.commission;
        });
        return Object.entries(salesByAffiliate).map(([affiliate, data]) => ({
          affiliate,
          sales: data.sales,
          commissions: data.commissions
        }));

      default:
        return [];
    }
  };

  // Agendar relatório
  const scheduleReport = async (reportConfig) => {
    try {
      const scheduledReport = {
        id: Date.now(),
        ...reportConfig,
        status: 'scheduled',
        created_at: new Date().toISOString()
      };

      // Em produção, salvar no backend
      console.log('Relatório agendado:', scheduledReport);
      
      return scheduledReport;
    } catch (error) {
      throw new Error('Erro ao agendar relatório: ' + error.message);
    }
  };

  // Obter relatórios salvos
  const getSavedReports = () => {
    return savedReports;
  };

  // Deletar relatório salvo
  const deleteSavedReport = async (reportId) => {
    try {
      setSavedReports(prev => prev.filter(report => report.id !== reportId));
    } catch (error) {
      throw new Error('Erro ao deletar relatório: ' + error.message);
    }
  };

  const value = {
    reports,
    savedReports,
    loading,
    filters,
    setFilters,
    generateReport,
    saveReport,
    exportReport,
    getFilteredData,
    getMetrics,
    getChartData,
    scheduleReport,
    getSavedReports,
    deleteSavedReport
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContext; 