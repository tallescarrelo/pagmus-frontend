# 🔌 Documentação das APIs - Pagmus Dash

## 📋 Visão Geral

Esta documentação descreve todas as APIs disponíveis no sistema Pagmus Dash, incluindo endpoints, parâmetros, respostas e exemplos de uso.

**Base URL:** `http://localhost:3333` (desenvolvimento)

## 🔐 Autenticação

### Login
**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "admin@pagmus.com",
  "password": "123456"
}
```

**Resposta (200):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 6,
    "email": "admin@pagmus.com",
    "name": "Administrador",
    "role": "admin",
    "status": "active",
    "created_at": "2025-08-01T02:54:07.074Z",
    "updated_at": "2025-08-01T02:54:07.074Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Registro
**POST** `/api/auth/register`

**Body:**
```json
{
  "email": "novo@pagmus.com",
  "password": "123456",
  "name": "Novo Usuário",
  "role": "affiliate"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 11,
    "email": "novo@pagmus.com",
    "name": "Novo Usuário",
    "role": "affiliate",
    "status": "active",
    "created_at": "2025-08-01T02:54:07.074Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Verificar Token
**POST** `/api/auth/verify`

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "message": "Token válido",
  "user": {
    "id": 6,
    "email": "admin@pagmus.com",
    "name": "Administrador",
    "role": "admin",
    "status": "active"
  }
}
```

### Logout
**POST** `/api/auth/logout`

**Resposta (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

## 📦 Produtos

### Listar Produtos
**GET** `/api/products`

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string: 'active', 'inactive', 'draft')
- `user_id` (number)

**Exemplo:**
```
GET /api/products?page=1&limit=5&status=active
```

**Resposta (200):**
```json
{
  "products": [
    {
      "id": 1,
      "user_id": 7,
      "name": "Curso de JavaScript",
      "description": "Curso completo de JavaScript do básico ao avançado",
      "price": "297.00",
      "commission_type": "percentage",
      "commission_rate": "30.00",
      "status": "active",
      "seller_name": "João Vendedor",
      "seller_email": "vendedor@pagmus.com",
      "created_at": "2025-08-01T02:54:07.175Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

### Buscar Produto por ID
**GET** `/api/products/:id`

**Resposta (200):**
```json
{
  "product": {
    "id": 1,
    "user_id": 7,
    "name": "Curso de JavaScript",
    "description": "Curso completo de JavaScript do básico ao avançado",
    "price": "297.00",
    "commission_type": "percentage",
    "commission_rate": "30.00",
    "status": "active",
    "seller_name": "João Vendedor",
    "seller_email": "vendedor@pagmus.com"
  },
  "affiliates": [
    {
      "id": 1,
      "user_id": 8,
      "product_id": 1,
      "commission_rate": "30.00",
      "status": "approved",
      "affiliate_name": "Maria Afiliada",
      "affiliate_email": "afiliado1@pagmus.com"
    }
  ],
  "sales": [
    {
      "id": 1,
      "product_id": 1,
      "transaction_id": "TXN001",
      "amount": "297.00",
      "commission_amount": "89.10",
      "payment_status": "paid",
      "customer_name": "João Silva",
      "created_at": "2025-08-01T02:54:07.284Z"
    }
  ]
}
```

### Criar Produto
**POST** `/api/products`

**Body:**
```json
{
  "name": "Novo Produto",
  "description": "Descrição do produto",
  "price": 99.90,
  "commission_type": "percentage",
  "commission_rate": 25.00,
  "product_url": "https://exemplo.com/produto",
  "checkout_url": "https://exemplo.com/checkout",
  "image_url": "https://exemplo.com/imagem.jpg",
  "user_id": 7
}
```

**Resposta (201):**
```json
{
  "message": "Produto criado com sucesso",
  "product": {
    "id": 4,
    "name": "Novo Produto",
    "description": "Descrição do produto",
    "price": "99.90",
    "commission_type": "percentage",
    "commission_rate": "25.00",
    "status": "active",
    "user_id": 7,
    "created_at": "2025-08-01T02:54:07.175Z"
  }
}
```

### Atualizar Produto
**PUT** `/api/products/:id`

**Body:**
```json
{
  "name": "Produto Atualizado",
  "price": 149.90,
  "status": "active"
}
```

**Resposta (200):**
```json
{
  "message": "Produto atualizado com sucesso",
  "product": {
    "id": 1,
    "name": "Produto Atualizado",
    "price": "149.90",
    "status": "active",
    "updated_at": "2025-08-01T02:54:07.175Z"
  }
}
```

### Deletar Produto
**DELETE** `/api/products/:id`

**Resposta (200):**
```json
{
  "message": "Produto deletado com sucesso"
}
```

## 🤝 Afiliados

### Listar Afiliados
**GET** `/api/affiliates`

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string: 'pending', 'approved', 'rejected', 'suspended')
- `product_id` (number)
- `user_id` (number)

**Resposta (200):**
```json
{
  "affiliates": [
    {
      "id": 1,
      "user_id": 8,
      "product_id": 1,
      "commission_rate": "30.00",
      "status": "approved",
      "is_blacklisted": false,
      "affiliate_name": "Maria Afiliada",
      "affiliate_email": "afiliado1@pagmus.com",
      "product_name": "Curso de JavaScript",
      "product_price": "297.00",
      "created_at": "2025-08-01T02:54:07.284Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

### Buscar Afiliado por ID
**GET** `/api/affiliates/:id`

**Resposta (200):**
```json
{
  "affiliate": {
    "id": 1,
    "user_id": 8,
    "product_id": 1,
    "commission_rate": "30.00",
    "status": "approved",
    "affiliate_name": "Maria Afiliada",
    "affiliate_email": "afiliado1@pagmus.com",
    "product_name": "Curso de JavaScript",
    "product_price": "297.00",
    "product_commission_rate": "30.00"
  },
  "sales": [
    {
      "id": 1,
      "transaction_id": "TXN001",
      "amount": "297.00",
      "commission_amount": "89.10",
      "payment_status": "paid",
      "product_name": "Curso de JavaScript",
      "created_at": "2025-08-01T02:54:07.284Z"
    }
  ]
}
```

### Criar Afiliado
**POST** `/api/affiliates`

**Body:**
```json
{
  "user_id": 8,
  "product_id": 1,
  "commission_rate": 30.00,
  "custom_commission_rate": 35.00
}
```

**Resposta (201):**
```json
{
  "message": "Afiliado criado com sucesso",
  "affiliate": {
    "id": 6,
    "user_id": 8,
    "product_id": 1,
    "commission_rate": "30.00",
    "custom_commission_rate": "35.00",
    "status": "pending",
    "created_at": "2025-08-01T02:54:07.284Z"
  }
}
```

### Atualizar Afiliado
**PUT** `/api/affiliates/:id`

**Body:**
```json
{
  "commission_rate": 35.00,
  "status": "approved",
  "is_blacklisted": false
}
```

**Resposta (200):**
```json
{
  "message": "Afiliado atualizado com sucesso",
  "affiliate": {
    "id": 1,
    "commission_rate": "35.00",
    "status": "approved",
    "is_blacklisted": false,
    "updated_at": "2025-08-01T02:54:07.284Z"
  }
}
```

### Aprovar/Reprovar Afiliado
**PUT** `/api/affiliates/:id/approve-reject`

**Body:**
```json
{
  "status": "approved"
}
```

**Resposta (200):**
```json
{
  "message": "Afiliado aprovado com sucesso",
  "affiliate": {
    "id": 1,
    "status": "approved",
    "updated_at": "2025-08-01T02:54:07.284Z"
  }
}
```

### Deletar Afiliado
**DELETE** `/api/affiliates/:id`

**Resposta (200):**
```json
{
  "message": "Afiliado removido com sucesso"
}
```

## 📊 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Sucesso |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno |

## 🔧 Headers Comuns

### Autenticação
```
Authorization: Bearer <jwt_token>
```

### Content-Type
```
Content-Type: application/json
```

### CORS
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 📝 Exemplos de Uso

### JavaScript (Fetch)
```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:3333/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  return data;
};

// Listar produtos com token
const getProducts = async (token) => {
  const response = await fetch('http://localhost:3333/api/products', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data;
};
```

### cURL
```bash
# Login
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pagmus.com","password":"123456"}'

# Listar produtos
curl http://localhost:3333/api/products

# Criar produto
curl -X POST http://localhost:3333/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Novo Produto","price":99.90,"user_id":7}'
```

## 🚨 Tratamento de Erros

### Erro de Validação (400)
```json
{
  "error": "Email e senha são obrigatórios"
}
```

### Erro de Autenticação (401)
```json
{
  "error": "Email ou senha inválidos"
}
```

### Erro de Recurso não Encontrado (404)
```json
{
  "error": "Produto não encontrado"
}
```

### Erro Interno (500)
```json
{
  "error": "Erro interno do servidor"
}
```

---

**Última atualização:** Agosto 2025  
**Versão da API:** 1.0.0 