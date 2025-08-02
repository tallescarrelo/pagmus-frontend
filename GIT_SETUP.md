# 🔧 Configuração do Git para o Projeto Pagmus

## 📋 Pré-requisitos

Para fazer push nos repositórios, você precisa configurar um token de acesso pessoal do GitHub.

## 🔑 Configuração do Token

### 1. Gerar Token no GitHub

1. Acesse: [GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Clique em **"Generate new token (classic)"**
3. Configure:
   - **Note:** `Pagmus Project Token`
   - **Expiration:** `90 days` (ou sua preferência)
   - **Scopes:** Selecione:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
4. Clique em **"Generate token"**
5. **Copie o token** (começa com `ghp_`)

### 2. Configurar Token Localmente

#### Opção A: Temporário (só para esta sessão)
```bash
export GITHUB_TOKEN="ghp_seu_token_aqui"
```

#### Opção B: Permanente (recomendado)
```bash
# Adicionar ao arquivo de configuração do shell
echo 'export GITHUB_TOKEN="ghp_seu_token_aqui"' >> ~/.zshrc

# Recarregar configurações
source ~/.zshrc
```

### 3. Verificar Configuração
```bash
echo $GITHUB_TOKEN
```

## 🚀 Usando o Script de Commit

Agora você pode usar o script automaticamente:

```bash
# Na raiz do projeto (pagmus-monorepo/)
./frontend/commit-and-push.sh "sua mensagem de commit"
```

O script vai:
- ✅ Fazer commit no frontend
- ✅ Fazer commit no backend  
- ✅ Fazer push automático usando o token
- ✅ Limpar o token das URLs por segurança

## 🔒 Segurança

- O token nunca fica exposto no código
- É usado apenas durante o push
- As URLs são limpas automaticamente
- Recomenda-se renovar o token a cada 90 dias

## 🆘 Troubleshooting

### Erro 403 (Permission Denied)
- Verifique se o token está configurado: `echo $GITHUB_TOKEN`
- Verifique se o token tem permissões corretas
- Gere um novo token se necessário

### Token Expirado
- Acesse GitHub.com → Settings → Developer settings → Personal access tokens
- Gere um novo token
- Atualize a variável `GITHUB_TOKEN`

## 📝 Exemplo Completo

```bash
# 1. Configurar token
export GITHUB_TOKEN="ghp_abc123..."

# 2. Fazer commit e push
./frontend/commit-and-push.sh "feat: nova funcionalidade implementada"

# 3. Verificar resultado
git log --oneline -5
```

---

**💡 Dica:** Adicione o token no seu `~/.zshrc` para não precisar configurar toda vez! 