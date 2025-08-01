import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebugProducts = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkDebugInfo();
  }, []);

  const checkDebugInfo = () => {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    setDebugInfo({
      token: token ? 'Presente' : 'Ausente',
      user: user ? 'Presente' : 'Ausente',
      tokenLength: token?.length || 0,
      userInfo: user ? JSON.parse(user) : null
    });
  };

  const testAPI = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setProducts(response.data.data);
      console.log('✅ API funcionando:', response.data);
    } catch (error) {
      console.error('❌ Erro na API:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Debug - Produtos</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h6>Informações de Debug:</h6>
            <ul>
              <li>Token: {debugInfo.token}</li>
              <li>User: {debugInfo.user}</li>
              <li>Token Length: {debugInfo.tokenLength}</li>
              <li>User Info: {debugInfo.userInfo?.name || 'N/A'}</li>
            </ul>
            
            <button 
              className="btn btn-primary" 
              onClick={testAPI}
              disabled={loading}
            >
              {loading ? 'Testando...' : 'Testar API'}
            </button>
          </div>
          
          <div className="col-md-6">
            <h6>Produtos da API:</h6>
            {products.length > 0 ? (
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Nenhum produto carregado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugProducts; 