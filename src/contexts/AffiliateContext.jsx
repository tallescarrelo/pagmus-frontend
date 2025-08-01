import React, { createContext, useContext, useState, useEffect } from 'react';

const AffiliateContext = createContext();

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error('useAffiliate deve ser usado dentro de um AffiliateProvider');
  }
  return context;
};

export const AffiliateProvider = ({ children }) => {
  const [affiliates, setAffiliates] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [links, setLinks] = useState([]);
  const [performance, setPerformance] = useState({});
  const [loading, setLoading] = useState(false);

  // Carregar dados dos afiliados
  useEffect(() => {
    loadAffiliateData();
  }, []);

  const loadAffiliateData = async () => {
    setLoading(true);
    try {
      // Simular dados de afiliados
      const mockAffiliates = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '(11) 99999-9999',
          status: 'active',
          commission_rate: 25,
          total_sales: 15000,
          total_commission: 3750,
          clicks: 1250,
          conversions: 45,
          conversion_rate: 3.6,
          join_date: '2024-01-15',
          last_activity: '2024-01-20',
          products: [1, 2, 3],
          social_media: {
            instagram: '@joaosilva',
            youtube: 'João Silva',
            tiktok: '@joaosilva'
          }
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria@email.com',
          phone: '(11) 88888-8888',
          status: 'active',
          commission_rate: 30,
          total_sales: 22000,
          total_commission: 6600,
          clicks: 2100,
          conversions: 78,
          conversion_rate: 3.7,
          join_date: '2024-01-10',
          last_activity: '2024-01-21',
          products: [1, 2],
          social_media: {
            instagram: '@mariasantos',
            youtube: 'Maria Santos',
            tiktok: '@mariasantos'
          }
        },
        {
          id: 3,
          name: 'Pedro Costa',
          email: 'pedro@email.com',
          phone: '(11) 77777-7777',
          status: 'pending',
          commission_rate: 20,
          total_sales: 8000,
          total_commission: 1600,
          clicks: 650,
          conversions: 22,
          conversion_rate: 3.4,
          join_date: '2024-01-20',
          last_activity: '2024-01-19',
          products: [1],
          social_media: {
            instagram: '@pedrocosta',
            youtube: 'Pedro Costa',
            tiktok: '@pedrocosta'
          }
        }
      ];

      // Simular dados de comissões
      const mockCommissions = [
        {
          id: 1,
          affiliate_id: 1,
          product_id: 1,
          order_id: 1001,
          amount: 150.00,
          commission: 37.50,
          status: 'paid',
          date: '2024-01-20',
          customer: 'Cliente A'
        },
        {
          id: 2,
          affiliate_id: 1,
          product_id: 2,
          order_id: 1002,
          amount: 200.00,
          commission: 50.00,
          status: 'pending',
          date: '2024-01-21',
          customer: 'Cliente B'
        },
        {
          id: 3,
          affiliate_id: 2,
          product_id: 1,
          order_id: 1003,
          amount: 300.00,
          commission: 90.00,
          status: 'paid',
          date: '2024-01-21',
          customer: 'Cliente C'
        }
      ];

      // Simular dados de links
      const mockLinks = [
        {
          id: 1,
          affiliate_id: 1,
          product_id: 1,
          url: 'https://pagmus.com/ref/joao123',
          short_url: 'pagmus.com/abc123',
          clicks: 125,
          conversions: 8,
          conversion_rate: 6.4,
          created_at: '2024-01-15',
          is_active: true
        },
        {
          id: 2,
          affiliate_id: 1,
          product_id: 2,
          url: 'https://pagmus.com/ref/joao456',
          short_url: 'pagmus.com/def456',
          clicks: 89,
          conversions: 5,
          conversion_rate: 5.6,
          created_at: '2024-01-16',
          is_active: true
        },
        {
          id: 3,
          affiliate_id: 2,
          product_id: 1,
          url: 'https://pagmus.com/ref/maria789',
          short_url: 'pagmus.com/ghi789',
          clicks: 234,
          conversions: 12,
          conversion_rate: 5.1,
          created_at: '2024-01-10',
          is_active: true
        }
      ];

      // Simular dados de performance
      const mockPerformance = {
        total_affiliates: 3,
        active_affiliates: 2,
        total_sales: 45000,
        total_commissions: 11950,
        total_clicks: 4000,
        total_conversions: 145,
        average_conversion_rate: 3.6,
        monthly_growth: 15.5,
        top_performers: [2, 1, 3]
      };

      setAffiliates(mockAffiliates);
      setCommissions(mockCommissions);
      setLinks(mockLinks);
      setPerformance(mockPerformance);

    } catch (error) {
      console.error('Erro ao carregar dados dos afiliados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo afiliado
  const addAffiliate = async (affiliateData) => {
    setLoading(true);
    try {
      const newAffiliate = {
        id: Date.now(),
        ...affiliateData,
        status: 'pending',
        total_sales: 0,
        total_commission: 0,
        clicks: 0,
        conversions: 0,
        conversion_rate: 0,
        join_date: new Date().toISOString().split('T')[0],
        last_activity: new Date().toISOString().split('T')[0]
      };

      setAffiliates(prev => [...prev, newAffiliate]);
      return newAffiliate;
    } catch (error) {
      throw new Error('Erro ao adicionar afiliado: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar afiliado
  const updateAffiliate = async (affiliateId, updateData) => {
    setLoading(true);
    try {
      setAffiliates(prev => 
        prev.map(affiliate => 
          affiliate.id === affiliateId 
            ? { ...affiliate, ...updateData }
            : affiliate
        )
      );
    } catch (error) {
      throw new Error('Erro ao atualizar afiliado: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Aprovar/reprovar afiliado
  const updateAffiliateStatus = async (affiliateId, status) => {
    await updateAffiliate(affiliateId, { status });
  };

  // Gerar link de afiliado
  const generateAffiliateLink = async (affiliateId, productId) => {
    setLoading(true);
    try {
      const affiliate = affiliates.find(a => a.id === affiliateId);
      const product = { id: productId, name: 'Produto Teste' }; // Em produção, buscar produto real

      const linkData = {
        id: Date.now(),
        affiliate_id: affiliateId,
        product_id: productId,
        url: `https://pagmus.com/ref/${affiliate.name.toLowerCase().replace(' ', '')}${productId}`,
        short_url: `pagmus.com/${Math.random().toString(36).substr(2, 6)}`,
        clicks: 0,
        conversions: 0,
        conversion_rate: 0,
        created_at: new Date().toISOString().split('T')[0],
        is_active: true
      };

      setLinks(prev => [...prev, linkData]);
      return linkData;
    } catch (error) {
      throw new Error('Erro ao gerar link: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Registrar clique no link
  const registerClick = async (linkId) => {
    setLinks(prev => 
      prev.map(link => 
        link.id === linkId 
          ? { 
              ...link, 
              clicks: link.clicks + 1,
              conversion_rate: link.conversions / (link.clicks + 1) * 100
            }
          : link
      )
    );
  };

  // Registrar conversão
  const registerConversion = async (linkId, orderData) => {
    const link = links.find(l => l.id === linkId);
    const affiliate = affiliates.find(a => a.id === link.affiliate_id);
    
    // Calcular comissão
    const commission = (orderData.amount * affiliate.commission_rate) / 100;
    
    // Criar registro de comissão
    const commissionData = {
      id: Date.now(),
      affiliate_id: link.affiliate_id,
      product_id: link.product_id,
      order_id: orderData.order_id,
      amount: orderData.amount,
      commission: commission,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      customer: orderData.customer
    };

    setCommissions(prev => [...prev, commissionData]);

    // Atualizar link
    setLinks(prev => 
      prev.map(l => 
        l.id === linkId 
          ? { 
              ...l, 
              conversions: l.conversions + 1,
              conversion_rate: (l.conversions + 1) / l.clicks * 100
            }
          : l
      )
    );

    // Atualizar estatísticas do afiliado
    setAffiliates(prev => 
      prev.map(a => 
        a.id === link.affiliate_id 
          ? {
              ...a,
              total_sales: a.total_sales + orderData.amount,
              total_commission: a.total_commission + commission,
              conversions: a.conversions + 1,
              conversion_rate: (a.conversions + 1) / a.clicks * 100,
              last_activity: new Date().toISOString().split('T')[0]
            }
          : a
      )
    );

    return commissionData;
  };

  // Aprovar comissão
  const approveCommission = async (commissionId) => {
    setCommissions(prev => 
      prev.map(commission => 
        commission.id === commissionId 
          ? { ...commission, status: 'paid' }
          : commission
      )
    );
  };

  // Rejeitar comissão
  const rejectCommission = async (commissionId, reason) => {
    setCommissions(prev => 
      prev.map(commission => 
        commission.id === commissionId 
          ? { ...commission, status: 'rejected', rejection_reason: reason }
          : commission
      )
    );
  };

  // Obter estatísticas do afiliado
  const getAffiliateStats = (affiliateId) => {
    const affiliate = affiliates.find(a => a.id === affiliateId);
    const affiliateCommissions = commissions.filter(c => c.affiliate_id === affiliateId);
    const affiliateLinks = links.filter(l => l.affiliate_id === affiliateId);

    return {
      ...affiliate,
      total_commissions_pending: affiliateCommissions.filter(c => c.status === 'pending').length,
      total_commissions_paid: affiliateCommissions.filter(c => c.status === 'paid').length,
      total_commissions_rejected: affiliateCommissions.filter(c => c.status === 'rejected').length,
      active_links: affiliateLinks.filter(l => l.is_active).length,
      total_links: affiliateLinks.length
    };
  };

  // Obter relatórios
  const getReports = (filters = {}) => {
    let filteredCommissions = [...commissions];
    let filteredAffiliates = [...affiliates];

    // Aplicar filtros
    if (filters.date_from) {
      filteredCommissions = filteredCommissions.filter(c => c.date >= filters.date_from);
    }
    if (filters.date_to) {
      filteredCommissions = filteredCommissions.filter(c => c.date <= filters.date_to);
    }
    if (filters.status) {
      filteredCommissions = filteredCommissions.filter(c => c.status === filters.status);
    }
    if (filters.affiliate_id) {
      filteredCommissions = filteredCommissions.filter(c => c.affiliate_id === filters.affiliate_id);
    }

    return {
      commissions: filteredCommissions,
      affiliates: filteredAffiliates,
      summary: {
        total_commissions: filteredCommissions.length,
        total_amount: filteredCommissions.reduce((sum, c) => sum + c.amount, 0),
        total_commission: filteredCommissions.reduce((sum, c) => sum + c.commission, 0),
        pending_commissions: filteredCommissions.filter(c => c.status === 'pending').length,
        paid_commissions: filteredCommissions.filter(c => c.status === 'paid').length
      }
    };
  };

  const value = {
    affiliates,
    commissions,
    links,
    performance,
    loading,
    addAffiliate,
    updateAffiliate,
    updateAffiliateStatus,
    generateAffiliateLink,
    registerClick,
    registerConversion,
    approveCommission,
    rejectCommission,
    getAffiliateStats,
    getReports
  };

  return (
    <AffiliateContext.Provider value={value}>
      {children}
    </AffiliateContext.Provider>
  );
};

export default AffiliateContext; 