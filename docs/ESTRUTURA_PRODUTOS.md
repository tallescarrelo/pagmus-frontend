# Estrutura de Banco de Dados - Sistema de Produtos

## 🎯 Visão Geral

Baseado na análise do `ViewProduct.jsx`, propomos uma estrutura de banco de dados robusta para suportar todos os recursos do sistema de produtos.

## 📊 Estrutura de Tabelas

### 1. **products** (Tabela Principal)
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  image VARCHAR(500),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Campos adicionais identificados
  slug VARCHAR(255) UNIQUE,
  featured BOOLEAN DEFAULT false,
  available_for_sale BOOLEAN DEFAULT true,
  sales_count INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2. **plans** (Planos dos Produtos)
```sql
CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  commission_rate DECIMAL(5,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  available_for_sale BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 3. **checkouts** (Configurações de Checkout)
```sql
CREATE TABLE checkouts (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  plan_id INTEGER,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  settings JSONB, -- Configurações flexíveis
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL
);
```

### 4. **product_urls** (URLs e Redirecionamentos)
```sql
CREATE TABLE product_urls (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'sales_page', 'thank_you', 'cancel', etc.
  url VARCHAR(500) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 5. **affiliate_commissions** (Comissões de Afiliados)
```sql
CREATE TABLE affiliate_commissions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  plan_id INTEGER,
  name VARCHAR(255) NOT NULL,
  commission_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed'
  commission_value DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL
);
```

### 6. **affiliate_goals** (Metas de Afiliados)
```sql
CREATE TABLE affiliate_goals (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BRL',
  commission_value DECIMAL(10,2) NOT NULL,
  sales_required INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 7. **coupons** (Cupons de Desconto)
```sql
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  plan_id INTEGER,
  code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed'
  discount_value DECIMAL(10,2) NOT NULL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL
);
```

### 8. **product_components** (Componentes do Produto)
```sql
CREATE TABLE product_components (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'order_bump', 'upsell', 'downsell', 'file'
  name VARCHAR(255) NOT NULL,
  description TEXT,
  settings JSONB, -- Configurações específicas do componente
  sort_order INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 9. **product_files** (Arquivos/Ebooks)
```sql
CREATE TABLE product_files (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  plan_id INTEGER,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_url VARCHAR(500),
  file_size INTEGER,
  download_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL
);
```

### 10. **product_affiliates** (Relacionamento Produto-Afiliado)
```sql
CREATE TABLE product_affiliates (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  affiliate_id INTEGER NOT NULL,
  commission_rate DECIMAL(5,2),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  approved_at TIMESTAMP,
  approved_by INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (affiliate_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE(product_id, affiliate_id)
);
```

## 🔄 Relacionamentos

### Hierarquia Principal:
```
users (1) → (N) products
products (1) → (N) plans
products (1) → (N) checkouts
products (1) → (N) product_urls
products (1) → (N) affiliate_commissions
products (1) → (N) affiliate_goals
products (1) → (N) coupons
products (1) → (N) product_components
products (1) → (N) product_files
products (1) → (N) product_affiliates
```

### Relacionamentos Opcionais:
```
plans (1) → (N) checkouts
plans (1) → (N) affiliate_commissions
plans (1) → (N) coupons
plans (1) → (N) product_files
```

## 📋 Campos JSONB para Flexibilidade

### checkouts.settings:
```json
{
  "pixel_config": {
    "facebook_pixel": "string",
    "google_analytics": "string"
  },
  "payment_config": {
    "payment_methods": ["pix", "credit_card"],
    "installments": 12
  },
  "user_info_fields": ["name", "email", "phone"],
  "chat_config": {
    "enabled": true,
    "provider": "whatsapp"
  }
}
```

### product_components.settings:
```json
{
  "order_bump": {
    "product_id": 123,
    "discount": 10,
    "message": "string"
  },
  "upsell": {
    "products": [123, 456],
    "discount": 20
  },
  "file": {
    "download_url": "string",
    "access_type": "immediate"
  }
}
```

## 🚀 Próximos Passos

### 1. Criar Migrações
- Implementar todas as tabelas no Sequelize
- Criar modelos com relacionamentos
- Adicionar validações

### 2. Implementar APIs
- CRUD completo para produtos
- APIs para planos, checkouts, etc.
- Sistema de comissões

### 3. Integrar Frontend
- Conectar ViewProduct.jsx com APIs
- Implementar formulários dinâmicos
- Sistema de upload de arquivos

### 4. Funcionalidades Avançadas
- Sistema de cupons
- Order bumps e upsells
- Relatórios de vendas
- Dashboard de afiliados

## ✅ Benefícios da Estrutura

1. **Flexibilidade** - JSONB para configurações complexas
2. **Escalabilidade** - Suporte a múltiplos planos e checkouts
3. **Performance** - Índices otimizados
4. **Integridade** - Foreign keys e constraints
5. **Extensibilidade** - Fácil adição de novos recursos

---

**Esta estrutura suporta TODOS os recursos identificados no ViewProduct.jsx!** 🎯 