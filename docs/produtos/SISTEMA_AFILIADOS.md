# Sistema de Afiliados - Documentação Técnica

## 📋 Visão Geral

O sistema de afiliados permite que usuários se tornem promotores de produtos, ganhando comissões por vendas realizadas. Cada produto pode ter múltiplos afiliados com diferentes taxas de comissão.

## 🏗️ Arquitetura

### Relacionamentos
```
Product (1) ←→ (N) ProductAffiliate (N) ←→ (1) User
```

### Fluxo de Dados
```
Produto → Afiliados → API → Banco → Frontend → Renderização
```

## 🗄️ Estrutura do Banco

### Tabela: product_affiliates
```sql
CREATE TABLE product_affiliates (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id),
  manager_id INTEGER REFERENCES users(id),
  commission_rate DECIMAL(10,2) DEFAULT 25.00,
  commission_type VARCHAR(20) DEFAULT 'percentage',
  status VARCHAR(20) DEFAULT 'pending',
  sales_count INTEGER DEFAULT 0,
  total_commission DECIMAL(10,2) DEFAULT 0.00,
  awards_count INTEGER DEFAULT 0,
  joined_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Campos Principais
- `product_id`: ID do produto
- `user_id`: ID do afiliado (usuário)
- `manager_id`: ID do gerente responsável
- `commission_rate`: Taxa de comissão (ex: 25.00)
- `commission_type`: Tipo de comissão (percentage/fixed)
- `status`: Status do afiliado (active/pending/inactive)
- `sales_count`: Número de vendas realizadas
- `total_commission`: Comissão total ganha
- `awards_count`: Número de prêmios/conquistas

## 🔧 API Endpoints

### GET /api/products/:productId/affiliates
**Descrição**: Busca todos os afiliados de um produto

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
      "id": 20,
      "name": "João Silva",
      "email": "joao.afiliado@email.com",
      "manager": "Teste",
      "since": "01/08/2025",
      "sales": 25,
      "commission": "R$ 1250,00",
      "status": "ACTIVE",
      "awards": 3,
      "commission_rate": "25.00",
      "commission_type": "percentage"
    }
  ]
}
```

### POST /api/products/:productId/affiliates
**Descrição**: Adiciona um novo afiliado ao produto

**Body**:
```json
{
  "user_id": 2,
  "manager_id": 1,
  "commission_rate": 25.00,
  "commission_type": "percentage"
}
```

## 🎯 Funcionalidades Implementadas

### ✅ Frontend
- [x] Lista de afiliados com loading state
- [x] Dados reais carregados da API
- [x] Formatação de valores monetários
- [x] Status visual (ACTIVE/PENDING)
- [x] Tratamento de erros
- [x] Responsividade

### ✅ Backend
- [x] API RESTful
- [x] Autenticação JWT
- [x] Formatação de dados
- [x] Relacionamentos Sequelize
- [x] Validação de dados
- [x] Scripts de população

## 📊 Dados de Teste

### Afiliados Criados
1. **João Silva** (joao.afiliado@email.com)
   - Status: ACTIVE
   - Comissão: 25%
   - Vendas: 25
   - Total: R$ 1.250,00
   - Prêmios: 3

2. **Maria Santos** (maria.afiliado@email.com)
   - Status: PENDING
   - Comissão: 30%
   - Vendas: 18
   - Total: R$ 900,00
   - Prêmios: 1

3. **Pedro Oliveira** (pedro.afiliado@email.com)
   - Status: ACTIVE
   - Comissão: 20%
   - Vendas: 42
   - Total: R$ 2.100,00
   - Prêmios: 5

4. **Ana Rodriguez** (ana.afiliado@email.com)
   - Status: PENDING
   - Comissão: 15%
   - Vendas: 8
   - Total: R$ 400,00
   - Prêmios: 0

5. **Carlos Ferreira** (carlos.afiliado@email.com)
   - Status: PENDING
   - Comissão: 22%
   - Vendas: 15
   - Total: R$ 750,00
   - Prêmios: 2

## 🔧 Scripts de Manutenção

### fix-affiliates.js
Script para corrigir estrutura de afiliados:
```bash
cd backend
node fix-affiliates.js
```

**Funcionalidades**:
- Remove registros duplicados
- Cria usuários afiliados
- Estabelece relacionamentos corretos
- Popula dados de teste

### populate-product-data.js
Script para criar dados de teste:
```bash
cd backend
node populate-product-data.js
```

**Funcionalidades**:
- Cria produtos de teste
- Cria planos
- Cria afiliados
- Cria dados relacionados

## 🧪 Testes

### Teste da API
```bash
# Login
curl -X POST "http://localhost:3001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@pagmus.com","password":"123456"}'

# Buscar afiliados
curl -X GET "http://localhost:3001/api/products/1/affiliates" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

### Teste do Frontend
1. Acesse: http://localhost:3002
2. Faça login: test@pagmus.com / 123456
3. Navegue para um produto
4. Vá na aba "Comissionamento / Afiliação"
5. Verifique os afiliados carregados

## 📈 Métricas e KPIs

### Métricas por Afiliado
- **Vendas**: Número de vendas realizadas
- **Comissão**: Valor total ganho
- **Taxa**: Percentual de comissão
- **Status**: Ativo/Pendente/Inativo
- **Prêmios**: Conquistas alcançadas

### Métricas do Produto
- **Total de Afiliados**: 5 afiliados
- **Afiliados Ativos**: 2 afiliados
- **Afiliados Pendentes**: 3 afiliados
- **Comissão Média**: 22.4%
- **Vendas Totais**: 108 vendas

## 🔄 Próximas Funcionalidades

### 📋 Pendentes
- [ ] Aprovação/reprovação de afiliados
- [ ] Sistema de metas e objetivos
- [ ] Dashboard de performance
- [ ] Relatórios detalhados
- [ ] Sistema de notificações
- [ ] Integração com pagamentos
- [ ] Sistema de ranking
- [ ] Gamificação

### 🔄 Em Desenvolvimento
- [ ] Sistema de cupons para afiliados
- [ ] Links de afiliado personalizados
- [ ] Tracking de conversões
- [ ] Sistema de comissões em cascata

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Afiliados não aparecem
**Causa**: Token inválido ou API não respondendo
**Solução**: Verificar autenticação e status do servidor

#### 2. Dados incorretos
**Causa**: Estrutura do banco inconsistente
**Solução**: Executar `fix-affiliates.js`

#### 3. Loading infinito
**Causa**: Erro na API ou rede
**Solução**: Verificar console do navegador e logs do servidor

#### 4. Erro de formatação
**Causa**: Dados não numéricos no banco
**Solução**: Verificar tipos de dados nas migrações

## 📝 Logs e Debug

### Logs do Backend
```bash
# Ver logs do servidor
cd backend
node server.js

# Logs importantes:
# - Conexão com banco
# - Requisições da API
# - Erros de autenticação
# - Erros de formatação
```

### Debug do Frontend
```javascript
// Console do navegador
console.log('Afiliados:', realAffiliates);
console.log('Loading:', loadingAffiliates);
console.log('Erro:', error);
```

---

*Documentação atualizada em: 01/08/2025* 