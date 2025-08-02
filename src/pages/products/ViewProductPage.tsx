import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import MasterLayout from '../../masterLayout/MasterLayout';
import Breadcrumb from '../../components/Breadcrumb';
import ViewProduct from '../../components/products/ViewProduct';
import { useProduct } from '../../contexts/ProductContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  status: 'active' | 'inactive';
  user_id: number;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

const ViewProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { loadProductById } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (productId && !product) {
        setLoading(true);
        setError(null);
        try {
          const productData = await loadProductById(parseInt(productId));
          setProduct(productData);
        } catch (error) {
          console.error('Erro ao carregar produto:', error);
          setError('Erro ao carregar produto');
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [productId, product, loadProductById]);

  if (loading) {
    return (
      <MasterLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando produto...</p>
          </div>
        </div>
      </MasterLayout>
    );
  }

  if (error) {
    return (
      <MasterLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="text-center">
            <Icon icon="mdi:alert-circle" className="text-danger" style={{ fontSize: '3rem' }} />
            <h5 className="mt-3">Erro ao carregar produto</h5>
            <p className="text-muted">{error}</p>
            <button 
              className="btn btn-primary"
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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="text-center">
            <Icon icon="mdi:package-variant-off" className="text-muted" style={{ fontSize: '3rem' }} />
            <h5 className="mt-3">Produto não encontrado</h5>
            <p className="text-muted">O produto que você está procurando não existe ou foi removido.</p>
            <button 
              className="btn btn-primary"
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
      <Breadcrumb title={`Produto: ${product.name}`} />
      <ViewProduct product={product} />
    </MasterLayout>
  );
};

export default ViewProductPage; 