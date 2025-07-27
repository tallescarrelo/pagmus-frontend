# 🎨 **Padrão Visual de Modais - Pagmus Dash**

Este documento define o **padrão visual único** para todos os modais da aplicação, garantindo consistência e profissionalismo em toda a interface.

---

## 🎯 **Visão Geral do Padrão**

Todos os modais da aplicação seguem um **padrão visual consistente** baseado no design moderno e profissional:

- ✅ **Header azul** com ícone e título
- ✅ **Body organizado** em cards com padding adequado  
- ✅ **Footer estilizado** com fundo claro e botões bem posicionados
- ✅ **Switches melhorados** (30% maiores)
- ✅ **Ícones contextuais** em labels e seções
- ✅ **Cores consistentes** e hierarquia visual clara

---

## 🏗️ **Estrutura Padrão dos Modais**

### **📋 Template Base:**

```jsx
<Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
  {/* 🔵 HEADER AZUL PADRÃO */}
  <Modal.Header closeButton className="bg-primary text-white">
    <Modal.Title>
      <Icon icon="mdi:icon-name" className="me-2" />
      Título do Modal
    </Modal.Title>
  </Modal.Header>

  {/* 📦 BODY ORGANIZADO */}
  <Modal.Body className="p-4">
    <div className="row g-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom">
            <h6 className="card-title mb-0 d-flex align-items-center">
              <Icon icon="mdi:icon-name" className="me-2 text-primary" />
              Título da Seção
            </h6>
            <small className="text-muted">Descrição da seção</small>
          </div>
          <div className="card-body">
            {/* Conteúdo do modal aqui */}
          </div>
        </div>
      </div>
    </div>
  </Modal.Body>

  {/* 🎨 FOOTER ESTILIZADO */}
  <Modal.Footer className="bg-light border-top">
    <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
      <Icon icon="mdi:close" className="me-2" />
      Cancelar
    </Button>
    <Button variant="primary" size="lg">
      <Icon icon="mdi:content-save" className="me-2" />
      Salvar
    </Button>
  </Modal.Footer>
</Modal>
```

---

## 🎨 **Especificações Visuais**

### **🔵 Header (Cabeçalho):**
- **Background:** `bg-primary` (azul)
- **Texto:** `text-white` (branco)
- **Ícone:** Sempre presente, relacionado ao contexto
- **Botão Close:** `closeButton` com contraste adequado

### **📦 Body (Corpo):**
- **Padding:** `p-4` para espaçamento adequado
- **Estrutura:** Grid responsivo `row g-4`
- **Cards:** `border-0 shadow-sm` para profundidade
- **Headers de Cards:** `bg-white border-bottom` para separação clara

### **🎨 Footer (Rodapé):**
- **Background:** `bg-light` para separação visual
- **Border:** `border-top` para delimitação  
- **Botões:** Sempre com ícones e alinhados à direita
- **Botão primário:** `size="lg"` para destaque

---

## 🔄 **Componentes Padronizados**

### **🎛️ Switches Melhorados:**
```jsx
<div className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
  <div>
    <label className="form-label mb-1 fw-semibold">Título do Switch</label>
    <small className="text-muted d-block">Descrição explicativa</small>
  </div>
  <div className="form-check form-switch">
    <input 
      className="form-check-input" 
      type="checkbox" 
      style={{ transform: "scale(1.3)" }} 
    />
  </div>
</div>
```

### **🏷️ Labels com Ícones:**
```jsx
<label className="form-label fw-semibold">
  <Icon icon="mdi:icon-name" className="me-1 text-primary" />
  Nome do Campo
</label>
```

### **📝 Campos com Ajuda:**
```jsx
<input type="text" className="form-control" placeholder="Placeholder" />
<small className="text-muted">Texto de ajuda explicativo</small>
```

### **🎨 Fundos Coloridos (Contextuais):**
```jsx
{/* Sucesso */}
<div className="bg-success-subtle rounded p-3">

{/* Aviso */}  
<div className="bg-warning-subtle rounded p-3">

{/* Informação */}
<div className="bg-info-subtle rounded p-3">

{/* Neutro */}
<div className="bg-light rounded p-3">
```

---

## 🎯 **Padrões de Cores**

### **🎨 Ícones por Contexto:**
- **Primary (Azul):** `text-primary` - Configurações principais
- **Success (Verde):** `text-success` - Sucesso, aprovações, vendas
- **Warning (Amarelo):** `text-warning` - Avisos, limitações  
- **Info (Azul claro):** `text-info` - Informações, upload, dados
- **Secondary (Cinza):** `text-secondary` - Secundário, termos
- **Danger (Vermelho):** `text-danger` - Erros, exclusões

### **🎨 Botões por Ação:**
- **Primary:** Ação principal (Salvar, Confirmar)
- **Success:** Ações positivas (Criar, Adicionar)  
- **Warning:** Ações de atenção (Editar, Alterar)
- **Outline-Secondary:** Ações secundárias (Cancelar, Fechar)
- **Outline-Danger:** Ações destrutivas (Excluir, Remover)

---

## 📏 **Tamanhos e Espaçamentos**

### **📦 Tamanhos de Modal:**
- **Small:** `size="sm"` - Confirmações simples
- **Default:** Sem especificar - Formulários médios  
- **Large:** `size="lg"` - Formulários complexos
- **Extra Large:** `size="xl"` - Formulários com abas/seções

### **🔄 Espaçamentos:**
- **Modal Body:** `p-4` (padding 1.5rem)
- **Grid Gaps:** `g-4` (gap 1.5rem)
- **Card Padding:** `p-3` (padding 1rem)
- **Switch Containers:** `p-3` (padding 1rem)

---

## 📋 **Checklist de Implementação**

Ao criar um novo modal, verificar:

### **✅ Estrutura:**
- [ ] Header azul com ícone e título
- [ ] Body com padding `p-4`
- [ ] Conteúdo em cards com shadow
- [ ] Footer com background `bg-light`

### **✅ Componentes:**
- [ ] Switches com `transform: scale(1.3)`
- [ ] Labels com ícones coloridos
- [ ] Botões com ícones e tamanhos adequados
- [ ] Textos de ajuda em campos

### **✅ Visual:**
- [ ] Cores consistentes com o padrão
- [ ] Espaçamentos adequados
- [ ] Responsividade garantida
- [ ] Acessibilidade (IDs, labels)

---

## 🏆 **Exemplos Implementados**

### **✅ Modal Novo Plano:**
- **6 abas funcionais** com navegação por pills
- **Header azul** com ícone de package
- **Switches melhorados** em todas as seções
- **Footer com botões** bem posicionados

### **✅ Modal Novo Upsell:**
- **Card organizado** com header colorido
- **Campos com ícones** contextuais
- **Switch de comissão** no padrão
- **Footer estilizado** consistente

### **✅ Modal Checkout:**
- **6 abas funcionais** com navegação por pills
- **Configurações completas** (pagamento, pixel, usuário, chat, promoções, personalização)
- **Header azul** com ícone de carrinho
- **Switches melhorados** em todas as seções
- **Footer estilizado** consistente
- **Acessibilidade garantida** (botões ao invés de links)

---

## 🚀 **Benefícios do Padrão**

### **🎯 Para Usuários:**
- **Consistência visual** em toda a aplicação
- **Navegação intuitiva** e previsível
- **Interface profissional** e confiável

### **🛠️ Para Desenvolvedores:**
- **Template reutilizável** para novos modais
- **Manutenção simplificada** com padrões claros
- **Velocidade de desenvolvimento** increased

### **📈 Para o Negócio:**
- **Identidade visual única** da aplicação
- **Experiência de usuário premium**
- **Aparência competitiva** no mercado

---

## 📝 **Próximos Passos**

1. **Aplicar padrão** em modais existentes restantes
2. **Criar component** reutilizável `StandardModal`
3. **Documentar variações** específicas quando necessário
4. **Manter consistência** em futuras implementações

---

**💡 Lembre-se:** Este padrão garante que todos os modais tenham a **mesma qualidade visual e experiência de usuário** dos modais Novo Plano e Novo Upsell! 🎨✨ 