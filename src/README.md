# Pagmus Frontend

Frontend React para o Pagmus Dashboard, conectado ao backend Express.js.

## 🚀 Tecnologias

- **React.js** 18+
- **Redux** para gerenciamento de estado
- **Axios** para requisições HTTP
- **React Router** para navegação
- **ApexCharts** para gráficos
- **CSS3** com design responsivo

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando em `http://localhost:3001`

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd pagmus-frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

4. **Execute o servidor de desenvolvimento**
```bash
npm start
```

O frontend estará rodando em `http://localhost:3002`

## 📱 Funcionalidades

### 🔐 Autenticação
- Login/Logout
- Registro de usuários
- Recuperação de senha
- Perfil do usuário

### 📊 Dashboard
- Visão geral das vendas
- Estatísticas de produtos
- Gráficos de performance
- Métricas de afiliados

### 🛍️ Produtos
- Listagem de produtos
- Cadastro de produtos
- Visualização detalhada
- Gestão de planos e preços

### 👥 Afiliados
- Gestão de afiliados
- Performance de vendas
- Comissões
- Relatórios

### 💰 Vendas
- Histórico de vendas
- Relatórios financeiros
- Indicadores de performance
- Análise de abandono

### 🛠️ Ferramentas
- API de integração
- Configurações de frete
- Postback tracking
- Gestão de equipe

## 🎨 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── child/          # Componentes filhos
│   ├── products/       # Componentes de produtos
│   ├── sales/          # Componentes de vendas
│   └── ...
├── pages/              # Páginas da aplicação
├── services/           # Serviços e APIs
├── redux/              # Gerenciamento de estado
├── helper/             # Funções auxiliares
└── assets/             # Recursos estáticos
```

## 🔗 Integração com Backend

O frontend se conecta ao backend através das seguintes APIs:

- **Autenticação**: `/api/auth/*`
- **Produtos**: `/api/products/*`
- **Vendas**: `/api/sales/*`
- **Afiliados**: `/api/affiliates/*`
- **Dashboard**: `/api/dashboard`

## 🚀 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta configurações do Create React App

## 🔐 Autenticação

O sistema usa JWT para autenticação. O token é armazenado no localStorage e incluído automaticamente nas requisições.

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎯 Próximos Passos

- [ ] Implementar testes unitários
- [ ] Adicionar PWA capabilities
- [ ] Otimizar performance
- [ ] Implementar cache offline
- [ ] Adicionar mais gráficos e métricas

## 📝 Licença

Este projeto é privado e proprietário. 