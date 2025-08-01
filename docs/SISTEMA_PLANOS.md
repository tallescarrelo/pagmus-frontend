# 📦 Sistema de Planos - Pagmus Dashboard

## 📋 Resumo Executivo

O Sistema de Planos permite criar, editar e gerenciar planos para produtos, oferecendo funcionalidades avançadas como:

1. ✅ **Criação de Planos** - Interface completa para criar planos
2. ✅ **Order Bump** - Sistema de ofertas adicionais
3. ✅ **Comissionamento** - Configuração de comissões para afiliados
4. ✅ **Upload de Arquivos** - Arquivos específicos por plano
5. ✅ **Validação Robusta** - Validação em tempo real
6. ✅ **Interface Moderna** - Design responsivo e intuitivo

---

## 🎯 Funcionalidades Implementadas

### 1. 📝 Gerenciamento de Planos

**Arquivo:** `src/components/products/ProductPlansManager.jsx`

#### ✨ Características Principais

- **Criação/Edição** - Modal completo para criar e editar planos
- **Visualização em Cards** - Interface visual com cards dos planos
- **Validação em Tempo Real** - Validação de campos obrigatórios
- **Upload de Arquivos** - Arquivos específicos por plano
- **Order Bump** - Sistema de ofertas adicionais
- **Comissionamento** - Configuração de comissões para afiliados

#### 🔧 Estrutura de Dados do Plano

```javascript
const planData = {
  // Informações Básicas
  id: null,
  name: '',
  description: '',
  price: '',
  original_price: '',
  max_installments: '',
  max_installments_no_interest: '',
  is_featured: false,
  is_active: true,
  
  // Order Bump
  order_bump: {
    enabled: false,
    title: '',
    description: '',
    price: '',
    original_price: ''
  },
  
  // Comissionamento
  affiliate_commission: {
    type: 'percentage', // percentage | fixed
    value: ''
  },
  
  // Arquivos
  files: [],
  
  // Termos
  terms_conditions: '',
  
  // Relacionamentos
  product_id: null,
  created_at: null,
  updated_at: null
};
```

---

### 2. 🎯 Order Bump

#### ✨ Características Principais

- **Ativação/Desativação** - Toggle para ativar order bump
- **Configuração Completa** - Título, descrição, preço
- **Preço Original** - Para mostrar desconto
- **Integração Automática** - Vinculado ao plano

#### 🔧 Exemplo de Configuração

```javascript
const orderBumpConfig = {
  enabled: true,
  title: "Bônus Exclusivo: Guia Avançado",
  description: "Receba um guia completo com técnicas avançadas",
  price: "R$ 47,00",
  original_price: "R$ 97,00"
};
```

---

### 3. 💰 Comissionamento de Afiliados

#### ✨ Características Principais

- **Tipos de Comissão** - Porcentagem ou valor fixo
- **Configuração por Plano** - Cada plano pode ter comissão diferente
- **Validação** - Validação de valores
- **Flexibilidade** - Diferentes estratégias de comissionamento

#### 🔧 Exemplos de Configuração

```javascript
// Comissão por porcentagem
{
  type: 'percentage',
  value: '25' // 25%
}

// Comissão por valor fixo
{
  type: 'fixed',
  value: 'R$ 50,00'
}
```

---

### 4. 📤 Upload de Arquivos por Plano

#### ✨ Características Principais

- **Arquivos Específicos** - Cada plano pode ter arquivos únicos
- **Múltiplos Formatos** - JPG, PNG, PDF, DOC, DOCX, ZIP, RAR
- **Limite de Tamanho** - 50MB por arquivo
- **Preview** - Visualização de imagens
- **Organização** - Arquivos organizados por plano

---

## 🛠️ Como Usar

### Para Desenvolvedores

#### 1. Implementar o Sistema

```jsx
import ProductPlansManager from './components/products/ProductPlansManager';

const ProductPlansPage = () => {
  const [plans, setPlans] = useState([]);
  
  const handlePlansUpdate = async (updatedPlans) => {
    try {
      // Salvar no backend
      await savePlans(updatedPlans);
      setPlans(updatedPlans);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <ProductPlansManager
      productId={productId}
      plans={plans}
      onPlansUpdate={handlePlansUpdate}
    />
  );
};
```

#### 2. Configurar Validação Personalizada

```javascript
// Adicionar regras específicas para planos
const planValidationRules = {
  minPrice: 10,
  maxPrice: 10000,
  maxInstallments: 12,
  requiredFields: ['name', 'price']
};

// Usar no componente
<ProductPlansManager
  validationRules={planValidationRules}
  onPlansUpdate={handlePlansUpdate}
/>
```

#### 3. Integrar com Backend

```javascript
// API para salvar planos
const savePlans = async (plans) => {
  const response = await fetch('/api/products/plans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plans })
  });
  
  return response.json();
};

// API para carregar planos
const loadPlans = async (productId) => {
  const response = await fetch(`/api/products/${productId}/plans`);
  return response.json();
};
```

### Para Usuários Finais

#### 1. Acessar Gerenciamento de Planos

1. **Navegue** para Produtos → [Seu Produto]
2. **Clique** na aba "Planos"
3. **Clique** em "Gerenciar Planos"
4. **Ou acesse** diretamente: `/products/{id}/plans`

#### 2. Criar um Novo Plano

1. **Clique** em "Novo Plano"
2. **Preencha** informações básicas:
   - Nome do plano
   - Descrição
   - Preço
   - Preço original (opcional)
   - Máximo de parcelas
3. **Configure** Order Bump (opcional)
4. **Configure** comissionamento
5. **Adicione** arquivos específicos
6. **Defina** termos e condições
7. **Salve** o plano

#### 3. Editar um Plano Existente

1. **Clique** no ícone de editar no card do plano
2. **Modifique** os campos desejados
3. **Salve** as alterações

#### 4. Configurar Order Bump

1. **Ative** o toggle "Ativar Order Bump"
2. **Preencha**:
   - Título do produto adicional
   - Descrição
   - Preço do order bump
3. **Salve** o plano

---

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   └── products/
│       ├── ProductPlansManager.jsx        # ✅ Sistema principal
│       ├── EnhancedFileUpload.jsx         # ✅ Upload de arquivos
│       └── ViewProduct.jsx                # ✅ Integração na visualização
├── pages/
│   └── products/
│       └── ProductPlansPage.jsx           # ✅ Página de gerenciamento
├── contexts/
│   └── AuthContext.jsx                    # ✅ Autenticação
├── utils/
│   └── validation.js                      # ✅ Validação
└── docs/
    └── SISTEMA_PLANOS.md                  # ✅ Documentação
```

---

## 🎨 Interface e UX

### Design System

#### Cores Utilizadas
```css
/* Estados dos planos */
--success: #28a745;    /* Verde para planos ativos */
--warning: #ffc107;    /* Amarelo para planos em destaque */
--danger: #dc3545;     /* Vermelho para planos inativos */
--info: #17a2b8;       /* Azul para informações */
--primary: #0d6efd;    /* Azul primário */
```

#### Componentes Padrão
```jsx
// Card de plano
<div className="plan-card">
  <div className="plan-header">
    <h5 className="plan-name">{plan.name}</h5>
    <div className="plan-price">
      <span className="current-price">{formatCurrency(plan.price)}</span>
      {plan.original_price && (
        <span className="original-price">{formatCurrency(plan.original_price)}</span>
      )}
    </div>
  </div>
</div>

// Modal de criação/edição
<div className="plan-modal">
  <div className="modal-content">
    {/* Conteúdo do modal */}
  </div>
</div>
```

### Responsividade

- **Desktop**: Grid de 3-4 colunas para cards
- **Tablet**: Grid de 2 colunas
- **Mobile**: Layout em coluna única

---

## 🔒 Segurança e Validação

### Validações Implementadas

1. **Campos Obrigatórios** - Nome e preço são obrigatórios
2. **Validação de Preços** - Preços devem ser números válidos
3. **Validação de Parcelas** - Máximo de 12 parcelas
4. **Validação de Comissões** - Valores válidos para comissões
5. **Sanitização** - Remoção de caracteres perigosos

### Relacionamentos

```javascript
// Estrutura no banco de dados
{
  id: 1,
  name: "Plano Premium",
  price: 99.99,
  product_id: 1, // Relacionamento com produto
  user_id: 1,    // Relacionamento com usuário
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}
```

---

## 🚀 Performance

### Otimizações Implementadas

1. **Debounce na Validação** - 300ms de delay
2. **Lazy Loading** - Modal carregado sob demanda
3. **Memoização** - React.memo para componentes pesados
4. **Upload Otimizado** - Progresso individual por arquivo

### Métricas Esperadas

- **Tempo de Criação**: < 2s para criar um plano
- **Tempo de Edição**: < 1s para editar
- **Upload de Arquivos**: Progressivo com feedback
- **Responsividade**: < 300ms para interações

---

## 🧪 Testes

### Testes Unitários Sugeridos

```javascript
// Testar criação de plano
describe('Plan Creation', () => {
  test('should create plan with valid data', () => {
    const planData = {
      name: 'Test Plan',
      price: 99.99,
      product_id: 1
    };
    
    const result = createPlan(planData);
    expect(result.id).toBeDefined();
    expect(result.name).toBe('Test Plan');
  });
});

// Testar order bump
describe('Order Bump', () => {
  test('should enable order bump with valid data', () => {
    const orderBump = {
      enabled: true,
      title: 'Bônus Exclusivo',
      price: 47.00
    };
    
    const result = validateOrderBump(orderBump);
    expect(result.isValid).toBe(true);
  });
});
```

---

## 📈 Monitoramento

### Logs Implementados

```javascript
// Log de criação de plano
console.log('Plan created:', { id, name, price, product_id });

// Log de order bump
console.log('Order bump configured:', { enabled, title, price });

// Log de comissionamento
console.log('Commission set:', { type, value, plan_id });
```

### Métricas Sugeridas

- Taxa de criação de planos
- Tempo médio de configuração
- Uso de order bump
- Performance de comissionamento

---

## 🎯 Próximos Passos

### Funcionalidades Planejadas

1. **Sistema de Templates**
   - Templates de planos pré-configurados
   - Duplicação de planos
   - Biblioteca de templates

2. **Sistema de Preços Dinâmicos**
   - Preços baseados em data/hora
   - Preços baseados em estoque
   - Preços promocionais automáticos

3. **Sistema de Upsell Automático**
   - Upsell baseado em comportamento
   - Upsell sequencial
   - Upsell personalizado

4. **Sistema de Analytics**
   - Métricas de conversão por plano
   - A/B testing de planos
   - Relatórios de performance

### Melhorias Técnicas

1. **Cache Inteligente**
   - Cache de planos
   - Cache de configurações
   - Otimização de re-renders

2. **Testes Automatizados**
   - Testes E2E para fluxo completo
   - Testes de integração
   - Testes de performance

3. **API Avançada**
   - Endpoints RESTful
   - Webhooks para mudanças
   - Rate limiting

---

## 📞 Suporte

### Documentação Adicional

- [Sistema de Cadastro de Produtos](./SISTEMA_CADASTRO_PRODUTOS.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Estrutura de Produtos](./ESTRUTURA_PRODUTOS.md)

### Contato

Para dúvidas sobre o sistema de planos:

- **Email**: suporte@pagmus.com
- **Documentação**: [docs/](./)
- **Issues**: [GitHub Issues](https://github.com/pagmus/dashboard/issues)

---

## 🏆 Conclusão

O Sistema de Planos foi implementado com sucesso, fornecendo:

✅ **Completude**: Todas as funcionalidades necessárias implementadas
✅ **Usabilidade**: Interface intuitiva e responsiva
✅ **Flexibilidade**: Configurações avançadas como order bump
✅ **Performance**: Otimizações para melhor experiência
✅ **Escalabilidade**: Estrutura preparada para expansão

O sistema está pronto para uso em produção e pode ser facilmente estendido conforme necessário.

### 🎉 Funcionalidades Principais

1. **Criação/Edição de Planos** - Interface completa
2. **Order Bump** - Sistema de ofertas adicionais
3. **Comissionamento** - Configuração de comissões
4. **Upload de Arquivos** - Arquivos específicos por plano
5. **Validação Robusta** - Validação em tempo real
6. **Interface Moderna** - Design responsivo

O sistema está **100% funcional** e integrado ao dashboard! 🚀 