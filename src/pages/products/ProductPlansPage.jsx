import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ProductPlansManager from "../../components/products/ProductPlansManager";
import { useAuth } from "../../contexts/AuthContext";

const ProductPlansPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getUserId } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simular carregamento de dados do produto
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        
        // Simular dados do produto (em produção, seria uma chamada API)
        const mockProduct = {
          id: productId || 1,
          name: "Produto Teste",
          description: "Descrição do produto teste",
          price: 99.99,
          user_id: getUserId()
        };

        // Simular dados dos planos (em produção, seria uma chamada API)
        const mockPlans = [
          {
            id: 1,
            name: "Plano Básico",
            description: "Acesso básico ao conteúdo",
            price: 49.99,
            original_price: 99.99,
            max_installments: 6,
            is_featured: false,
            is_active: true,
            product_id: productId || 1,
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-01-15T10:30:00Z"
          },
          {
            id: 2,
            name: "Plano Premium",
            description: "Acesso completo com bônus exclusivos",
            price: 99.99,
            original_price: 199.99,
            max_installments: 12,
            is_featured: true,
            is_active: true,
            product_id: productId || 1,
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-01-15T10:30:00Z"
          }
        ];

        setProduct(mockProduct);
        setPlans(mockPlans);
        
      } catch (error) {
        console.error('Erro ao carregar dados do produto:', error);
        setError('Erro ao carregar dados do produto');
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [productId, getUserId]);

  const handlePlansUpdate = async (updatedPlans) => {
    try {
      // Em produção, aqui você faria uma chamada para a API
      console.log('Planos atualizados:', updatedPlans);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPlans(updatedPlans);
      
      // Mostrar mensagem de sucesso
      alert('Planos atualizados com sucesso!');
      
    } catch (error) {
      console.error('Erro ao atualizar planos:', error);
      alert('Erro ao atualizar planos. Tente novamente.');
    }
  };

  const handleBackToProduct = () => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <MasterLayout>
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">Carregando dados do produto...</p>
        </div>
      </MasterLayout>
    );
  }

  if (error) {
    return (
      <MasterLayout>
        <div className="error-container">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Erro!</h4>
            <p>{error}</p>
            <hr />
            <button 
              className="btn btn-outline-danger"
              onClick={() => navigate('/products')}
            >
              Voltar para Produtos
            </button>
          </div>
        </div>
      </MasterLayout>
    );
  }

  if (!product) {
    return (
      <MasterLayout>
        <div className="not-found-container">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Produto não encontrado</h4>
            <p>O produto que você está procurando não foi encontrado.</p>
            <hr />
            <button 
              className="btn btn-outline-warning"
              onClick={() => navigate('/products')}
            >
              Voltar para Produtos
            </button>
          </div>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      {/* Breadcrumb */}
      <Breadcrumb 
        title="Gerenciar Planos" 
        items={[
          { label: 'Produtos', path: '/products' },
          { label: product.name, path: `/products/${productId}` },
          { label: 'Planos', path: `/products/${productId}/plans` }
        ]}
      />

      {/* Header da Página */}
      <div className="page-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="page-title">
                <Icon icon="mdi:package-variant" />
                Planos do Produto
              </h1>
              <p className="page-subtitle">
                Gerencie os planos e ofertas do produto: <strong>{product.name}</strong>
              </p>
            </div>
            <div className="col-md-4 text-end">
              <button
                className="btn btn-outline-secondary"
                onClick={handleBackToProduct}
              >
                <Icon icon="mdi:arrow-left" />
                Voltar ao Produto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <ProductPlansManager
              productId={productId || product.id}
              plans={plans}
              onPlansUpdate={handlePlansUpdate}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ProductPlansPage; 