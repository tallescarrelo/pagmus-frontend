import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ProductPlansManager from "../../components/products/ProductPlansManager";
import { useAuth } from "../../contexts/AuthContext";
import ProductsServices from "../../services/api/products";

const ProductPlansPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getUserId } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados reais do produto e planos
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados do produto
        const productResponse = await ProductsServices.getProduct(productId);
        const productData = productResponse.data;
        
        // Buscar planos do produto
        const plansResponse = await ProductsServices.plansAPI.getByProduct(productId);
        const plansData = plansResponse.data.data;
        
        setProduct(productData);
        setPlans(plansData);
        
      } catch (error) {
        console.error('Erro ao carregar dados do produto:', error);
        setError('Erro ao carregar dados do produto');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProductData();
    }
  }, [productId]);

  const handlePlansUpdate = async (updatedPlans) => {
    try {
      // Atualizar planos na API
      for (const plan of updatedPlans) {
        if (plan.id) {
          // Atualizar plano existente
          await ProductsServices.plansAPI.update(productId, plan.id, plan);
        } else {
          // Criar novo plano
          await ProductsServices.plansAPI.create(productId, plan);
        }
      }
      
      // Recarregar planos
      const plansResponse = await ProductsServices.plansAPI.getByProduct(productId);
      setPlans(plansResponse.data.data);
      
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando dados do produto...</p>
          </div>
        </div>
      </MasterLayout>
    );
  }

  if (error) {
    return (
      <MasterLayout>
        <div className="container-fluid">
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
        <div className="container-fluid">
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
              productId={productId}
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