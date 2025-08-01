# Sistema de Planos - Documentação Técnica

## 📋 Visão Geral

O sistema de planos permite que produtos tenham diferentes opções de compra com preços, benefícios e características específicas. Cada produto pode ter múltiplos planos.

## 🏗️ Arquitetura

### Relacionamentos
```
Product (1) ←→ (N) Plan
```

### Fluxo de Dados
```
Produto → Planos → API → Banco → Frontend → Renderização
```

## 🗄️ Estrutura do Banco

### Tabela: plans
```sql
CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'active',
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  hide_from_affiliates BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Campos Principais
- `product_id`: ID do produto relacionado
- `name`: Nome do plano
- `description`: Descrição detalhada
- `price`: Preço atual
- `original_price`: Preço original (para descontos)
- `status`: Status do plano (active/inactive)
- `sort_order`: Ordem de exibição
- `is_featured`: Plano em destaque
- `hide_from_affiliates`: Ocultar de afiliados

## 🔧 API Endpoints

### GET /api/products/:productId/plans
**Descrição**: Busca todos os planos de um produto

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "name": "Plano Básico",
      "description": "Acesso básico ao curso",
      "price": "97.00",
      "original_price": "197.00",
      "status": "active",
      "sort_order": 1,
      "is_featured": false,
      "hide_from_affiliates": false
    }
  ]
}
```

### POST /api/products/:productId/plans
**Descrição**: Cria um novo plano para o produto

**Body**:
```json
{
  "name": "Plano Premium",
  "description": "Acesso completo com bônus",
  "price": 297.00,
  "original_price": 397.00,
  "status": "active",
  "sort_order": 2,
  "is_featured": true
}
```

## 🎯 Funcionalidades Implementadas

### ✅ Frontend
- [x] Lista de planos do produto
- [x] Formulário de criação de planos
- [x] Edição de planos existentes
- [x] Exclusão de planos
- [x] Ordenação por sort_order
- [x] Status visual (active/inactive)
- [x] Preços formatados

### ✅ Backend
- [x] API RESTful para planos
- [x] Validação de dados
- [x] Relacionamentos Sequelize
- [x] CRUD completo
- [x] Ordenação automática

## 📊 Dados de Teste

### Planos Criados
1. **Plano Básico**
   - Preço: R$ 97,00
   - Preço Original: R$ 197,00
   - Status: ACTIVE
   - Ordem: 1

2. **Plano Premium**
   - Preço: R$ 297,00
   - Preço Original: R$ 397,00
   - Status: ACTIVE
   - Ordem: 2
   - Featured: true

## 🔧 Scripts de Manutenção

### populate-product-data.js
```bash
cd backend
node populate-product-data.js
```

**Cria**:
- 2 planos por produto
- Dados de teste realistas
- Relacionamentos corretos

## 🧪 Testes

### Teste da API
```bash
# Buscar planos
curl -X GET "http://localhost:3001/api/products/1/plans" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"

# Criar plano
curl -X POST "http://localhost:3001/api/products/1/plans" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Plano Teste",
    "description": "Descrição do plano",
    "price": 150.00,
    "status": "active"
  }'
```

### Teste do Frontend
1. Acesse: http://localhost:3002
2. Faça login: test@pagmus.com / 123456
3. Navegue para um produto
4. Vá na aba "Planos"
5. Verifique os planos carregados

## 📈 Métricas

### Por Produto
- **Total de Planos**: 2 planos
- **Planos Ativos**: 2 planos
- **Preço Médio**: R$ 197,00
- **Desconto Médio**: 25%

### Por Plano
- **Plano Básico**: 50% de desconto
- **Plano Premium**: 25% de desconto
- **Featured**: 1 plano em destaque

## 🔄 Próximas Funcionalidades

### 📋 Pendentes
- [ ] Sistema de cupons por plano
- [ ] Limite de vendas por plano
- [ ] Planos com acesso por tempo
- [ ] Planos recorrentes
- [ ] Sistema de upsell
- [ ] Planos com garantia
- [ ] Planos com suporte diferenciado

### 🔄 Em Desenvolvimento
- [ ] Planos com bônus
- [ ] Planos com acesso a comunidade
- [ ] Planos com certificado
- [ ] Planos com mentoria

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Planos não aparecem
**Causa**: Produto sem planos ou API não respondendo
**Solução**: Verificar dados do produto e status da API

#### 2. Preços incorretos
**Causa**: Formatação de dados
**Solução**: Verificar tipos de dados no banco

#### 3. Ordenação incorreta
**Causa**: sort_order não definido
**Solução**: Definir valores de sort_order

## 📝 Logs e Debug

### Logs do Backend
```bash
# Ver logs do servidor
cd backend
node server.js

# Logs importantes:
# - Requisições de planos
# - Criação/edição de planos
# - Erros de validação
```

### Debug do Frontend
```javascript
// Console do navegador
console.log('Planos:', plans);
console.log('Produto:', product);
console.log('Loading:', loadingPlans);
```

---

*Documentação atualizada em: 01/08/2025* 