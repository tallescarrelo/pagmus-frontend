# 🚀 Setup dos Repositórios Pagmus

## ✅ O que foi feito

Criamos dois repositórios Git separados para o projeto Pagmus:

### 📦 Backend (`pagmus-backend`)
- **Localização**: `/backend/`
- **Tecnologias**: Express.js + Sequelize + PostgreSQL
- **Porta**: 3001
- **Status**: ✅ Repositório Git inicializado
- **Commits**: 2 commits (código + README)

### 📦 Frontend (`pagmus-frontend`)
- **Localização**: `/src/`
- **Tecnologias**: React.js + Redux + Axios
- **Porta**: 3002
- **Status**: ✅ Repositório Git inicializado
- **Commits**: 2 commits (código + README)

## 🔧 Como fazer o push para o GitHub

### Opção 1: Usar o script automático
```bash
./push-repositories.sh
```

### Opção 2: Manual

#### Backend
```bash
cd backend
git remote set-url origin https://github.com/tallescarrelo/pagmus-backend.git
git push -u origin main
```

#### Frontend
```bash
cd src
git remote add origin https://github.com/tallescarrelo/pagmus-frontend.git
git push -u origin main
```

## 📋 Pré-requisitos

1. **Criar os repositórios no GitHub**:
   - `pagmus-backend` (privado)
   - `pagmus-frontend` (privado)

2. **Configurar as variáveis de ambiente**:
   - Backend: `.env` baseado em `env.express`
   - Frontend: `.env.local` com `REACT_APP_API_URL`

## 🚀 Como usar os repositórios

### Backend
```bash
git clone https://github.com/tallescarrelo/pagmus-backend.git
cd pagmus-backend
npm install
cp env.express .env
# Editar .env com suas credenciais
npm start
```

### Frontend
```bash
git clone https://github.com/tallescarrelo/pagmus-frontend.git
cd pagmus-frontend
npm install
# Criar .env.local com REACT_APP_API_URL=http://localhost:3001
npm start
```

## 📁 Estrutura dos Repositórios

### Backend (`pagmus-backend`)
```
backend/
├── models/           # Modelos Sequelize
├── config/           # Configurações do banco
├── server.js         # Servidor Express
├── package.json      # Dependências
├── README.md         # Documentação
└── .gitignore        # Arquivos ignorados
```

### Frontend (`pagmus-frontend`)
```
src/
├── components/       # Componentes React
├── pages/           # Páginas da aplicação
├── services/        # Serviços e APIs
├── redux/           # Gerenciamento de estado
├── assets/          # Recursos estáticos
├── README.md        # Documentação
└── .gitignore       # Arquivos ignorados
```

## 🔐 Configurações Importantes

### Backend
- **Banco**: PostgreSQL no Railway
- **Porta**: 3001
- **JWT**: Configurado para autenticação
- **CORS**: Habilitado para frontend

### Frontend
- **API URL**: `http://localhost:3001`
- **Porta**: 3002
- **Autenticação**: JWT via localStorage
- **Responsivo**: Mobile, tablet, desktop

## 📊 Status Atual

- ✅ Backend conectado ao PostgreSQL
- ✅ Frontend funcionando com React
- ✅ Autenticação JWT implementada
- ✅ Dashboard carregando dados
- ✅ Repositórios Git separados
- ⏳ Aguardando push para GitHub

## 🎯 Próximos Passos

1. **Criar repositórios no GitHub**
2. **Executar o script de push**
3. **Testar os repositórios separados**
4. **Configurar CI/CD se necessário**
5. **Implementar testes automatizados**

## 📞 Suporte

Se houver problemas:
1. Verificar se os repositórios foram criados no GitHub
2. Confirmar as URLs dos remotes
3. Verificar as credenciais do banco de dados
4. Testar a conectividade entre frontend e backend 