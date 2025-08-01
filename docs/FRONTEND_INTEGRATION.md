# 🔗 Integração Frontend-Backend - Pagmus Dash

## 📋 Visão Geral

Este documento descreve como o frontend React se integra com o backend Node.js/Express através das APIs REST.

## 🏗️ Arquitetura da Integração

### Estrutura de Arquivos
```
frontend/src/
├── services/
│   └── api.js              # Serviço principal de API
├── contexts/
│   └── AuthContext.js       # Contexto de autenticação
├── hooks/
│   ├── useProducts.js       # Hook para produtos
│   └── useAffiliates.js     # Hook para afiliados
└── pages/
    └── SignInPage.jsx       # Página de login integrada
```

## 🔧 Configuração

### Variáveis de Ambiente
Criar arquivo `.env` no frontend:

```env
REACT_APP_API_URL=http://localhost:3333
REACT_APP_API_VERSION=v1
```

### Configuração do AuthProvider
O `AuthProvider` deve envolver toda a aplicação no `App.js`:

```jsx
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        {/* Rotas da aplicação */}
      </HashRouter>
    </AuthProvider>
  );
}
```

## 🔐 Autenticação

### Contexto de Autenticação
O `AuthContext` gerencia:
- Estado do usuário logado
- Token JWT
- Funções de login/logout
- Verificação de permissões

### Uso em Componentes
```jsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Verificar se está autenticado
  if (!isAuthenticated()) {
    return <Redirect to="/" />;
  }
  
  return (
    <div>
      <p>Olá, {user.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
};
```

## 📦 Gerenciamento de Produtos

### Hook useProducts
```jsx
import { useProducts } from '../hooks/useProducts';

const ProductsPage = () => {
  const { 
    products, 
    loading, 
    error, 
    fetchProducts, 
    createProduct 
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (productData) => {
    try {
      await createProduct(productData);
      // Produto criado com sucesso
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

## 🤝 Gerenciamento de Afiliados

### Hook useAffiliates
```jsx
import { useAffiliates } from '../hooks/useAffiliates';

const AffiliatesPage = () => {
  const { 
    affiliates, 
    loading, 
    error, 
    fetchAffiliates, 
    approveRejectAffiliate 
  } = useAffiliates();

  const handleApprove = async (id) => {
    try {
      await approveRejectAffiliate(id, 'approved');
      // Afiliado aprovado
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    <div>
      {affiliates.map(affiliate => (
        <div key={affiliate.id}>
          {affiliate.affiliate_name}
          <button onClick={() => handleApprove(affiliate.id)}>
            Aprovar
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 🔌 Serviço de API

### Estrutura do ApiService
```javascript
class ApiService {
  // Método genérico para requisições
  async request(endpoint, options = {}) {
    // Configuração automática de headers
    // Inclusão automática do token JWT
    // Tratamento de erros
  }

  // Métodos específicos
  async login(email, password) { /* ... */ }
  async getProducts(params) { /* ... */ }
  async createProduct(data) { /* ... */ }
  // etc...
}
```

### Headers Automáticos
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (quando autenticado)

### Tratamento de Erros
```javascript
try {
  const response = await apiService.getProducts();
  // Sucesso
} catch (error) {
  // Erro tratado automaticamente
  console.error('Erro:', error.message);
}
```

## 📱 Componentes Integrados

### SignInPage
```jsx
const SignInPage = () => {
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = async (credentials) => {
    setLoading(true);
    try {
      await login(credentials.email, credentials.password);
      navigate("/Dashboard");
    } catch (error) {
      // Erro tratado pelo contexto
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInLayer 
      handleAuthenticate={handleAuthenticate} 
      loading={loading} 
      error={error}
    />
  );
};
```

### SignInLayer com Tratamento de Erros
```jsx
const SignInLayer = ({ handleAuthenticate, loading, error }) => {
  return (
    <div>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Acessar"}
        </button>
      </form>
    </div>
  );
};
```

## 🔄 Fluxo de Dados

### 1. Login
```
Usuário → SignInPage → AuthContext → ApiService → Backend
```

### 2. Buscar Produtos
```
Componente → useProducts → ApiService → Backend → Estado Local
```

### 3. Criar Produto
```
Formulário → useProducts.createProduct → ApiService → Backend → Atualizar Lista
```

## 🛡️ Segurança

### Token JWT
- Armazenado no `localStorage`
- Incluído automaticamente em todas as requisições
- Verificado ao inicializar a aplicação

### Verificação de Permissões
```jsx
const { isAdmin, isSeller, isAffiliate } = useAuth();

if (isAdmin()) {
  // Mostrar funcionalidades de admin
}

if (isSeller()) {
  // Mostrar funcionalidades de vendedor
}
```

## 📊 Estados de Loading e Erro

### Loading States
```jsx
const { loading } = useProducts();

return (
  <div>
    {loading && <Spinner />}
    {!loading && <ProductList />}
  </div>
);
```

### Error Handling
```jsx
const { error } = useProducts();

return (
  <div>
    {error && (
      <Alert variant="danger">
        Erro: {error}
      </Alert>
    )}
  </div>
);
```

## 🧪 Testando a Integração

### 1. Verificar Conexão
```javascript
// No console do navegador
const api = new ApiService();
api.testConnection().then(console.log);
```

### 2. Testar Login
```javascript
// Usar credenciais de teste
const credentials = {
  email: 'admin@pagmus.com',
  password: '123456'
};
```

### 3. Verificar Token
```javascript
// Verificar se o token foi salvo
localStorage.getItem('token');
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de CORS:**
   - Verificar se o backend está rodando
   - Verificar configuração CORS no backend

2. **Token inválido:**
   - Limpar localStorage
   - Fazer login novamente

3. **Erro de rede:**
   - Verificar URL da API
   - Verificar se o backend está acessível

### Debug
```javascript
// Ativar logs detalhados
localStorage.setItem('debug', 'true');

// Verificar requisições no DevTools
// Network tab → XHR/Fetch
```

---

**Última atualização:** Agosto 2025  
**Versão:** 1.0.0 