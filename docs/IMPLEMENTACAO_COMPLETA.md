# 📚 Documentação Completa - Implementação de Produtos

## 🎯 **Visão Geral**

Esta documentação descreve a implementação completa do sistema de produtos do Pagmus, incluindo backend, frontend e todas as funcionalidades específicas implementadas.

## 🏗️ **Arquitetura do Sistema**

### **Backend (Express + Sequelize)**
- **Framework**: Express.js
- **ORM**: Sequelize
- **Banco de Dados**: PostgreSQL (Railway)
- **Autenticação**: JWT
- **Validação**: Express-validator (planejado)

### **Frontend (React)**
- **Framework**: React
- **UI**: React Bootstrap
- **Ícones**: Iconify
- **Estado**: React Hooks
- **HTTP Client**: Axios

## 📊 **Estrutura do Banco de Dados**

### **Tabelas Principais**

#### **1. products**
```sql
- id (PK)
- user_id (FK -> users)
- name
- description
- price
- commission_rate
- status
- slug
- featured
- available_for_sale
- sales_count
- total_revenue
- image
- category
- stock
- warranty_days
- support_email
- sales_page_url
- thank_you_page_url
- reclame_aqui_url
- share_data_for_invoice
- affiliate_program_enabled
- buyer_data_access
- visible_in_store
- auto_approval
- commission_type
- cookie_duration
- commission_value
```

#### **2. plans**
```sql
- id (PK)
- product_id (FK -> products)
- name
- description
- price
- original_price
- commission_rate
- status
- featured
- available_for_sale
- sort_order
- max_installments
- max_installments_no_interest
- payment_discount_enabled
- billing_type
- boleto_installments_enabled
- boleto_notification_enabled
- custom_commission_enabled
- hide_from_affiliates
- order_bump_text
- terms_conditions
- watermark_enabled
```

#### **3. checkouts**
```sql
- id (PK)
- product_id (FK -> products)
- plan_id (FK -> plans)
- name
- description
- status
- settings (JSONB)
- primary_color
- layout_type
- payment_methods (JSONB)
- pixel_id
- require_gender
- require_phone
- require_address
- chat_type
- support_phone
- coupon_enabled
- popup_enabled
- customization_enabled
- steps_enabled
- notifications_enabled
```

#### **4. coupons**
```sql
- id (PK)
- product_id (FK -> products)
- plan_id (FK -> plans)
- code
- name
- description
- discount_type
- discount_value
- max_uses
- used_count
- valid_from
- valid_until
- status
```

#### **5. product_urls**
```sql
- id (PK)
- product_id (FK -> products)
- description
- url
- is_private
- status
- sales_count
```

#### **6. affiliate_commissions**
```sql
- id (PK)
- product_id (FK -> products)
- plan_id (FK -> plans)
- name
- commission_type
- commission_value
- status
- affiliates_count
```

#### **7. affiliate_goals**
```sql
- id (PK)
- product_id (FK -> products)
- name
- currency
- commission_value
- sales_required
- affiliates_count
- status
```

#### **8. product_files**
```sql
- id (PK)
- product_id (FK -> products)
- plan_id (FK -> plans)
- name
- file_path
- file_size
- file_type
- watermark_enabled
- status
- downloads_count
```

#### **9. product_affiliates**
```sql
- id (PK)
- product_id (FK -> products)
- user_id (FK -> users)
- manager_id (FK -> users)
- commission_rate
- commission_type
- status
- sales_count
- total_commission
- awards_count
- joined_at
```

#### **10. product_components**
```sql
- id (PK)
- product_id (FK -> products)
- name
- type
- settings (JSONB)
- status
- sort_order
```

## 🔌 **APIs Implementadas**

### **Produtos**
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Obter produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### **Planos**
- `GET /api/products/:productId/plans` - Listar planos
- `POST /api/products/:productId/plans` - Criar plano
- `PUT /api/products/:productId/plans/:planId` - Atualizar plano
- `DELETE /api/products/:productId/plans/:planId` - Deletar plano

### **Checkouts**
- `GET /api/products/:productId/checkouts` - Listar checkouts
- `POST /api/products/:productId/checkouts` - Criar checkout
- `PUT /api/products/:productId/checkouts/:checkoutId` - Atualizar checkout
- `DELETE /api/products/:productId/checkouts/:checkoutId` - Deletar checkout

### **Cupons**
- `GET /api/products/:productId/coupons` - Listar cupons
- `POST /api/products/:productId/coupons` - Criar cupom
- `PUT /api/products/:productId/coupons/:couponId` - Atualizar cupom
- `DELETE /api/products/:productId/coupons/:couponId` - Deletar cupom

### **URLs**
- `GET /api/products/:productId/urls` - Listar URLs
- `POST /api/products/:productId/urls` - Criar URL
- `PUT /api/products/:productId/urls/:urlId` - Atualizar URL
- `DELETE /api/products/:productId/urls/:urlId` - Deletar URL

### **Comissões de Afiliados**
- `GET /api/products/:productId/affiliate-commissions` - Listar comissões
- `POST /api/products/:productId/affiliate-commissions` - Criar comissão
- `PUT /api/products/:productId/affiliate-commissions/:commissionId` - Atualizar comissão
- `DELETE /api/products/:productId/affiliate-commissions/:commissionId` - Deletar comissão

### **Metas de Afiliados**
- `GET /api/products/:productId/affiliate-goals` - Listar metas
- `POST /api/products/:productId/affiliate-goals` - Criar meta
- `PUT /api/products/:productId/affiliate-goals/:goalId` - Atualizar meta
- `DELETE /api/products/:productId/affiliate-goals/:goalId` - Deletar meta

### **Arquivos**
- `GET /api/products/:productId/files` - Listar arquivos
- `POST /api/products/:productId/files` - Criar arquivo
- `PUT /api/products/:productId/files/:fileId` - Atualizar arquivo
- `DELETE /api/products/:productId/files/:fileId` - Deletar arquivo

### **Afiliados**
- `GET /api/products/:productId/affiliates` - Listar afiliados
- `POST /api/products/:productId/affiliates` - Criar afiliado
- `PUT /api/products/:productId/affiliates/:affiliateId` - Atualizar afiliado
- `DELETE /api/products/:productId/affiliates/:affiliateId` - Deletar afiliado

### **Componentes**
- `GET /api/products/:productId/components` - Listar componentes
- `POST /api/products/:productId/components` - Criar componente
- `PUT /api/products/:productId/components/:componentId` - Atualizar componente
- `DELETE /api/products/:productId/components/:componentId` - Deletar componente

## 🎨 **Componentes Frontend**

### **1. ViewProductEnhanced.jsx**
Componente principal para visualização e edição de produtos.

**Funcionalidades:**
- Carregamento de dados do produto
- Navegação por abas
- Formulários de edição
- Tabelas de dados relacionados
- Estados de loading e erro

### **2. FileUpload.jsx**
Componente para upload de arquivos com drag & drop.

**Funcionalidades:**
- Drag & drop de arquivos
- Validação de tipo e tamanho
- Preview antes do upload
- Barra de progresso
- Tratamento de erros

### **3. useProduct.js**
Hook personalizado para gerenciar dados de produtos.

**Funcionalidades:**
- Carregamento de dados
- Operações CRUD
- Gerenciamento de estado
- Tratamento de erros

## 🔧 **Utilitários**

### **1. validation.js**
Utilitários de validação para formulários.

**Funcionalidades:**
- Validação de campos
- Validação de formulários
- Formatação de dados
- Validações específicas (CPF, CNPJ, etc.)

### **2. products.js (API Service)**
Serviço para comunicação com APIs de produtos.

**Funcionalidades:**
- Configuração do Axios
- Interceptors para autenticação
- Tratamento de erros
- APIs organizadas por funcionalidade

## 🚀 **Como Usar**

### **1. Backend**
```bash
cd backend
npm install
node server.js
```

### **2. Frontend**
```bash
cd src
npm start
```

### **3. Testar APIs**
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Criar produto
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name":"Produto Teste","description":"Descrição","price":99.99}'
```

## 📋 **Validações Implementadas**

### **Produtos**
- Nome: 3-255 caracteres
- Descrição: 10-2000 caracteres
- Preço: 0.01-999999.99
- Categoria: obrigatória
- Garantia: 0-365 dias
- E-mail: formato válido
- URLs: formato válido

### **Planos**
- Nome: 3-255 caracteres
- Descrição: máximo 1000 caracteres
- Preço: 0.01-999999.99
- Parcelas: 1-12

### **Cupons**
- Código: 3-50 caracteres, apenas maiúsculas/números
- Nome: 3-255 caracteres
- Descrição: máximo 500 caracteres
- Tipo: percentage ou fixed
- Valor: 0.01-999999.99

### **URLs**
- Descrição: 3-255 caracteres
- URL: formato válido, máximo 500 caracteres

## 🔒 **Segurança**

### **Autenticação**
- JWT tokens
- Interceptors automáticos
- Redirecionamento em caso de token expirado

### **Validação**
- Validação no frontend
- Validação no backend (planejado)
- Sanitização de dados

### **Autorização**
- Verificação de propriedade do produto
- Controle de acesso por usuário

## 📈 **Performance**

### **Otimizações Implementadas**
- Lazy loading de componentes
- Debounce em inputs
- Cache de dados
- Paginação (planejado)

### **Monitoramento**
- Logs de erro
- Métricas de performance (planejado)
- Health checks

## 🧪 **Testes**

### **APIs Testadas**
- ✅ Login/Autenticação
- ✅ CRUD de Produtos
- ✅ CRUD de Planos
- ✅ CRUD de Checkouts
- ✅ CRUD de Cupons
- ✅ CRUD de URLs
- ✅ CRUD de Comissões
- ✅ CRUD de Metas
- ✅ CRUD de Arquivos
- ✅ CRUD de Afiliados
- ✅ CRUD de Componentes

### **Frontend Testado**
- ✅ Carregamento de dados
- ✅ Estados de loading/erro
- ✅ Formulários
- ✅ Upload de arquivos
- ✅ Validações

## 🔄 **Próximos Passos**

### **Backend**
1. Implementar validação com express-validator
2. Adicionar logs estruturados
3. Implementar cache com Redis
4. Adicionar testes automatizados
5. Implementar rate limiting

### **Frontend**
1. Implementar testes com Jest/React Testing Library
2. Adicionar PWA capabilities
3. Implementar cache offline
4. Adicionar analytics
5. Otimizar bundle size

### **DevOps**
1. Configurar CI/CD
2. Implementar monitoramento
3. Configurar backups automáticos
4. Implementar staging environment

## 📞 **Suporte**

Para dúvidas ou problemas:
- Criar issue no repositório
- Documentar steps to reproduce
- Incluir logs de erro
- Especificar ambiente (OS, versões, etc.)

---

**Versão**: 1.0.0  
**Data**: Janeiro 2025  
**Autor**: Equipe Pagmus 