# Sistema de Produtos - Pagmus

## 📋 Visão Geral

O sistema de produtos do Pagmus é um módulo complexo e abrangente que gerencia todo o ciclo de vida dos produtos, desde o cadastro até a venda e comissionamento de afiliados.

## 🏗️ Arquitetura

### Frontend (React)
- **Porta**: 3002
- **Tecnologias**: React, Bootstrap, Axios
- **Estrutura**: Componentes modulares com Context API

### Backend (Express)
- **Porta**: 3001
- **Tecnologias**: Node.js, Express, Sequelize, PostgreSQL
- **Estrutura**: API RESTful com autenticação JWT

## 📁 Estrutura de Arquivos

### Frontend
```
src/
├── components/products/
│   ├── ViewProduct.jsx          # Visualização detalhada do produto
│   ├── MyProducts.jsx           # Lista de produtos do usuário
│   ├── EnhancedProductRegistration.jsx  # Cadastro avançado
│   ├── ProductPlansManager.jsx  # Gerenciamento de planos
│   ├── FileUpload.jsx           # Upload de arquivos
│   └── ValidatedProductForm.jsx # Formulário validado
├── pages/products/
│   ├── MyProductsPage.jsx       # Página de produtos
│   ├── RegisterProduct.jsx      # Página de cadastro
│   ├── ViewProductPage.jsx      # Página de visualização
│   └── ProductPlansPage.jsx     # Página de planos
├── services/api/
│   ├── products/index.jsx       # API de produtos
│   ├── product-related.js       # Serviços relacionados
│   └── products-simple.js       # API simplificada
└── contexts/
    ├── ProductContext.jsx       # Contexto de produtos
    └── AuthContext.jsx          # Contexto de autenticação
```

### Backend
```
backend/
├── models/
│   ├── Product.js              # Modelo de produto
│   ├── Plan.js                 # Modelo de plano
│   ├── ProductAffiliate.js     # Modelo de afiliado
│   ├── User.js                 # Modelo de usuário
│   └── Sale.js                 # Modelo de venda
├── migrations/
│   ├── products-table.js       # Migração de produtos
│   ├── plans-table.js          # Migração de planos
│   └── product-affiliates.js   # Migração de afiliados
├── server.js                   # Servidor principal
├── populate-product-data.js     # Script de dados de teste
└── fix-affiliates.js           # Script de correção
```

## 🗄️ Banco de Dados

### Tabelas Principais

#### products
- `id` (PK)
- `name` - Nome do produto
- `description` - Descrição
- `price` - Preço
- `status` - Status (active/inactive)
- `user_id` (FK) - Proprietário
- `category` - Categoria
- `stock` - Estoque
- `image` - Imagem do produto

#### plans
- `id` (PK)
- `product_id` (FK) - Produto relacionado
- `name` - Nome do plano
- `price` - Preço do plano
- `description` - Descrição
- `status` - Status

#### product_affiliates
- `id` (PK)
- `product_id` (FK) - Produto
- `user_id` (FK) - Afiliado
- `manager_id` (FK) - Gerente
- `commission_rate` - Taxa de comissão
- `status` - Status (active/pending)
- `sales_count` - Número de vendas
- `total_commission` - Comissão total

#### users
- `id` (PK)
- `name` - Nome
- `email` - Email
- `password` - Senha (hash)
- `role` - Papel (admin/seller/affiliate)
- `status` - Status

## 🔄 Fluxo de Dados

### 1. Cadastro de Produto
```
Usuário → Formulário → Validação → API → Banco → Confirmação
```

### 2. Visualização de Produto
```
Usuário → Página → API → Banco → Dados → Renderização
```

### 3. Sistema de Afiliados
```
Produto → Afiliados → API → Banco → Dados Formatados → Frontend
```

## 🚀 Funcionalidades Implementadas

### ✅ Concluídas
- [x] Cadastro de produtos
- [x] Visualização detalhada
- [x] Sistema de planos
- [x] Upload de arquivos
- [x] Sistema de afiliados
- [x] Autenticação JWT
- [x] API RESTful
- [x] Validação de dados
- [x] Loading states
- [x] Tratamento de erros

### 🔄 Em Desenvolvimento
- [ ] Sistema de cupons
- [ ] Sistema de checkouts
- [ ] Relatórios avançados
- [ ] Dashboard de vendas
- [ ] Sistema de notificações

### 📋 Pendentes
- [ ] Sistema de avaliações
- [ ] Sistema de comentários
- [ ] Integração com pagamentos
- [ ] Sistema de frete
- [ ] API de terceiros

## 🔧 Configuração

### Variáveis de Ambiente
```env
# Frontend
REACT_APP_API_URL=http://localhost:3001

# Backend
PORT=3001
JWT_SECRET=sample-jwt-secret-for-development
DB_HOST=yamabiko.proxy.rlwy.net
DB_PORT=15425
DB_USER=postgres
DB_PASSWORD=uqsKOLzANexZdKgZGMeaCGJRUEZwaNCz
DB_DATABASE=railway
```

### Comandos de Instalação
```bash
# Frontend
npm install
npm start

# Backend
cd backend
npm install
node server.js
```

## 📊 Dados de Teste

### Usuários
- **Admin**: test@pagmus.com / 123456
- **Afiliados**: 5 usuários criados automaticamente

### Produtos
- **ID 1**: Curso de Marketing Digital
- **Planos**: 2 planos criados
- **Afiliados**: 5 afiliados vinculados

## 🧪 Testes

### API de Afiliados
```bash
curl -X GET "http://localhost:3001/api/products/1/affiliates" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

### Login
```bash
curl -X POST "http://localhost:3001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@pagmus.com","password":"123456"}'
```

## 📈 Métricas

- **Produtos**: 1 produto de teste
- **Planos**: 2 planos por produto
- **Afiliados**: 5 afiliados por produto
- **Vendas**: Dados simulados
- **Comissões**: 15% a 30% por afiliado

## 🔗 Links Úteis

- **Frontend**: http://localhost:3002
- **Backend**: http://localhost:3001
- **API Docs**: http://localhost:3001/test-db
- **GitHub Frontend**: https://github.com/tallescarrelo/pagmus
- **GitHub Backend**: https://github.com/tallescarrelo/pagmus-backend

## 📝 Próximos Passos

1. **Sistema de Cupons** - Implementar cupons de desconto
2. **Sistema de Checkouts** - Processamento de vendas
3. **Relatórios** - Dashboard de métricas
4. **Notificações** - Sistema de alertas
5. **Integrações** - APIs de pagamento

---

*Documentação atualizada em: 01/08/2025* 