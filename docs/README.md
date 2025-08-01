# 📚 Documentação do Projeto Pagmus Dash

## 🚀 Visão Geral

O **Pagmus Dash** é um sistema completo de gestão de afiliados e produtos digitais, desenvolvido com React (frontend) e Node.js/Express (backend), conectado a um banco PostgreSQL hospedado no Railway.

## 🏗️ Arquitetura

### Estrutura do Projeto
```
pagmus-monorepo/
├── frontend/          # Aplicação React
├── backend/           # API Node.js/Express
└── docs/             # Documentação
```

### Tecnologias Utilizadas

**Frontend:**
- React 18
- React Router DOM
- Bootstrap (React-Bootstrap)
- Iconify
- Drag and Drop (@hello-pangea/dnd)

**Backend:**
- Node.js
- Express.js
- PostgreSQL (Railway)
- JWT (JSON Web Tokens)
- bcrypt (hash de senhas)

**Infraestrutura:**
- Railway (hosting e banco de dados)
- Git (versionamento)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Railway (para banco de dados)

## 🛠️ Instalação e Configuração

### 1. Clone do Repositório
```bash
git clone https://github.com/tallescarrelo/pagmus.git
cd pagmus-monorepo
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

**Variáveis de Ambiente (.env):**
```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=sample-app-key-for-development-only
DRIVE_DISK=local
SESSION_DRIVER=cookie

# Database - Railway PostgreSQL
DB_CONNECTION=pg
DB_HOST=yamabiko.proxy.rlwy.net
DB_PORT=15425
DB_USER=postgres
DB_PASSWORD=uqsKOLzANexZdKgZGMeaCGJRUEZwaNCz
DB_DATABASE=railway

# CORS
CORS_ENABLED=true
CORS_ORIGIN=*
CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE
CORS_HEADERS=Content-Type,Authorization

# Auth
JWT_SECRET=sample-jwt-secret-for-development
```

### 3. Configuração do Frontend

```bash
cd ../frontend
npm install
```

**Variáveis de Ambiente (.env):**
```env
REACT_APP_API_URL=http://localhost:3333
REACT_APP_API_VERSION=v1
```

### 4. Executar as Migrations

```bash
cd backend
node run-migrations.js
node seed-data.js
```

### 5. Iniciar os Servidores

**Backend:**
```bash
cd backend
npm run dev:simple
```

**Frontend:**
```bash
cd frontend
npm start
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

**users**
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR UNIQUE)
- `password` (VARCHAR - hash bcrypt)
- `name` (VARCHAR)
- `role` (ENUM: 'admin', 'seller', 'affiliate')
- `status` (ENUM: 'active', 'inactive', 'suspended')
- `phone`, `document`, `avatar` (VARCHAR)
- `created_at`, `updated_at` (TIMESTAMP)

**products**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (FOREIGN KEY -> users)
- `name`, `description` (VARCHAR, TEXT)
- `price` (DECIMAL)
- `commission_type` (ENUM: 'percentage', 'fixed')
- `commission_rate` (DECIMAL)
- `status` (ENUM: 'active', 'inactive', 'draft')
- `product_url`, `checkout_url`, `image_url` (VARCHAR)
- `created_at`, `updated_at` (TIMESTAMP)

**affiliates**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (FOREIGN KEY -> users)
- `product_id` (FOREIGN KEY -> products)
- `commission_rate` (DECIMAL)
- `status` (ENUM: 'pending', 'approved', 'rejected', 'suspended')
- `is_blacklisted` (BOOLEAN)
- `custom_commission_rate` (DECIMAL)
- `total_sales`, `total_commission` (INTEGER, DECIMAL)
- `created_at`, `updated_at` (TIMESTAMP)

**sales**
- `id` (SERIAL PRIMARY KEY)
- `product_id` (FOREIGN KEY -> products)
- `user_id` (FOREIGN KEY -> users)
- `affiliate_id` (FOREIGN KEY -> users)
- `transaction_id` (VARCHAR UNIQUE)
- `amount`, `commission_amount` (DECIMAL)
- `payment_gateway` (VARCHAR)
- `payment_status` (ENUM: 'pending', 'paid', 'failed', 'refunded')
- `customer_email`, `customer_name` (VARCHAR)
- `created_at`, `updated_at` (TIMESTAMP)

**coupons**
- `id` (SERIAL PRIMARY KEY)
- `product_id` (FOREIGN KEY -> products)
- `code` (VARCHAR UNIQUE)
- `discount_type` (ENUM: 'percentage', 'fixed')
- `discount_value` (DECIMAL)
- `max_uses`, `used_count` (INTEGER)
- `valid_from`, `valid_until` (TIMESTAMP)
- `status` (ENUM: 'active', 'inactive', 'expired')
- `created_at`, `updated_at` (TIMESTAMP)

**commission_settings**
- `id` (SERIAL PRIMARY KEY)
- `product_id` (FOREIGN KEY -> products)
- `affiliate_id` (FOREIGN KEY -> users)
- `commission_rate` (DECIMAL)
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

## 🔌 APIs

### Autenticação
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/verify
POST /api/auth/logout
```

### Produtos
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Afiliados
```
GET    /api/affiliates
GET    /api/affiliates/:id
POST   /api/affiliates
PUT    /api/affiliates/:id
PUT    /api/affiliates/:id/approve-reject
DELETE /api/affiliates/:id
```

## 👥 Usuários de Teste

**Admin:**
- Email: `admin@pagmus.com`
- Senha: `123456`

**Vendedor:**
- Email: `vendedor@pagmus.com`
- Senha: `123456`

**Afiliados:**
- Email: `afiliado1@pagmus.com` / Senha: `123456`
- Email: `afiliado2@pagmus.com` / Senha: `123456`
- Email: `afiliado3@pagmus.com` / Senha: `123456`

## 🚀 Deploy

### Railway (Backend)
1. Conectar repositório no Railway
2. Configurar variáveis de ambiente
3. Deploy automático

### Frontend
1. Build: `npm run build`
2. Deploy em qualquer serviço (Vercel, Netlify, etc.)

## 📝 Scripts Úteis

**Backend:**
```bash
npm run dev:simple    # Iniciar servidor
node run-migrations.js # Executar migrations
node seed-data.js     # Inserir dados de teste
```

**Frontend:**
```bash
npm start             # Iniciar em desenvolvimento
npm run build         # Build para produção
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco:**
   - Verificar credenciais do Railway
   - Verificar se o banco está ativo

2. **Erro de CORS:**
   - Verificar configuração CORS no backend
   - Verificar URL da API no frontend

3. **Token JWT inválido:**
   - Verificar JWT_SECRET no backend
   - Verificar expiração do token

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.

---

**Versão:** 1.0.0  
**Última atualização:** Agosto 2025  
**Desenvolvido por:** Talles Carrelo 