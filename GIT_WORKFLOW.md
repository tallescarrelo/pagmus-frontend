# 🔄 Git Workflow - Pagmus Dashboard

## 📋 Visão Geral

Este documento descreve o workflow de Git para o projeto Pagmus Dashboard, que possui dois repositórios separados:

- **Frontend**: https://github.com/tallescarrelo/pagmus-frontend
- **Backend**: https://github.com/tallescarrelo/pagmus-backend

## 🛠️ Scripts Disponíveis

### 1. Commit e Push Automático
```bash
./commit-and-push.sh "sua mensagem de commit"
```

**Exemplo:**
```bash
./commit-and-push.sh "implementação do sistema de cupons"
```

### 2. Criar Backup
```bash
./create-backup.sh "descrição do backup"
```

**Exemplo:**
```bash
./create-backup.sh "sistema de produtos completo"
```

## 📁 Estrutura dos Repositórios

### Frontend (pagmus-frontend)
```
src/
├── components/
│   └── products/
│       ├── EnhancedProductRegistration.jsx
│       ├── RegisterProductSteps.jsx
│       ├── ViewProduct.jsx
│       └── ...
├── pages/
│   └── products/
│       ├── RegisterProduct.jsx
│       ├── MyProductsPage.jsx
│       └── ...
├── services/
│   └── api/
│       ├── products-stable.js
│       └── product-related.js
└── ...
```

### Backend (pagmus-backend)
```
models/
├── Product.js
├── User.js
├── ProductAffiliate.js
└── ...
server.js
migrations/
└── ...
```

## 🔄 Workflow Recomendado

### 1. Desenvolvimento Diário
1. Faça suas alterações no código
2. Teste localmente
3. Execute: `./commit-and-push.sh "descrição das mudanças"`

### 2. Antes de Implementações Grandes
1. Execute: `./create-backup.sh "antes da implementação X"`
2. Faça suas alterações
3. Teste tudo
4. Execute: `./commit-and-push.sh "implementação X completa"`

### 3. Após Implementações Importantes
1. Execute: `./create-backup.sh "implementação X finalizada"`

## 🚨 Regras Importantes

### ✅ O que FAZER:
- Sempre use os scripts para commit e push
- Crie backups antes de implementações grandes
- Mantenha commits pequenos e descritivos
- Teste localmente antes de fazer push

### ❌ O que NÃO FAZER:
- Nunca force push na main sem backup
- Não misture mudanças de frontend e backend no mesmo commit
- Não delete branches de backup sem necessidade
- Não faça commits sem testar

## 📊 Status dos Repositórios

### Frontend
- **URL**: https://github.com/tallescarrelo/pagmus-frontend
- **Branch Principal**: `main`
- **Branches de Backup**: `backup-*`

### Backend
- **URL**: https://github.com/tallescarrelo/pagmus-backend
- **Branch Principal**: `main`
- **Branches de Backup**: `backup-*`

## 🔍 Comandos Úteis

### Verificar Status
```bash
# Frontend
git status

# Backend
cd backend && git status
```

### Ver Branches de Backup
```bash
# Frontend
git branch | grep backup

# Backend
cd backend && git branch | grep backup
```

### Restaurar Backup
```bash
# Frontend
git checkout backup-nome-do-backup

# Backend
cd backend && git checkout backup-nome-do-backup
```

## 📝 Exemplos de Uso

### Cenário 1: Implementação de Nova Funcionalidade
```bash
# 1. Criar backup antes
./create-backup.sh "antes do sistema de cupons"

# 2. Fazer implementação
# ... código ...

# 3. Commit e push
./commit-and-push.sh "implementação do sistema de cupons"

# 4. Backup após implementação
./create-backup.sh "sistema de cupons implementado"
```

### Cenário 2: Correção de Bug
```bash
# 1. Commit e push da correção
./commit-and-push.sh "correção do bug na listagem de produtos"
```

## 🆘 Troubleshooting

### Problema: Erro de Push
```bash
# Verificar se o token está válido
# Verificar se a branch está atualizada
git pull origin main
```

### Problema: Conflitos de Merge
```bash
# 1. Fazer backup atual
./create-backup.sh "antes de resolver conflitos"

# 2. Resolver conflitos
# 3. Commit e push
./commit-and-push.sh "resolução de conflitos"
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se os scripts têm permissão de execução: `chmod +x *.sh`
2. Verifique se está no diretório correto
3. Verifique se os repositórios estão configurados corretamente

---

**Última atualização**: $(date +"%Y-%m-%d")
**Versão**: 1.0 