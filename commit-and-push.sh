#!/bin/bash

# Script para commit e push automático dos repositórios
# Uso: ./commit-and-push.sh "mensagem do commit"

if [ -z "$1" ]; then
    echo "❌ Erro: Forneça uma mensagem de commit"
    echo "Uso: ./commit-and-push.sh \"sua mensagem de commit\""
    exit 1
fi

COMMIT_MESSAGE="$1"
CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")

echo "🚀 Iniciando commit e push..."
echo "📅 Data: $CURRENT_DATE"
echo "💬 Mensagem: $COMMIT_MESSAGE"
echo ""

# ========================================
# FRONTEND REPOSITORY
# ========================================
echo "📱 === FRONTEND REPOSITORY ==="

# Verificar se há mudanças no frontend
if git status --porcelain | grep -q .; then
    echo "✅ Mudanças detectadas no frontend"
    
    # Adicionar arquivos do frontend (excluindo backend)
    git add src/ public/ package.json package-lock.json yarn.lock tsconfig.json server.ts start/ config/ docs/ env.example env.local README.md README_FUNCIONALIDADES.md REPOSITORIOS_SETUP.md
    
    # Commit
    git commit -m "feat: $COMMIT_MESSAGE"
    
    # Push
    git push origin main
    
    echo "✅ Frontend commitado e enviado com sucesso!"
else
    echo "ℹ️  Nenhuma mudança detectada no frontend"
fi

echo ""

# ========================================
# BACKEND REPOSITORY
# ========================================
echo "🔧 === BACKEND REPOSITORY ==="

# Verificar se a pasta backend existe
if [ -d "backend" ]; then
    cd backend
    
    # Verificar se há mudanças no backend
    if git status --porcelain | grep -q .; then
        echo "✅ Mudanças detectadas no backend"
        
        # Adicionar todos os arquivos do backend
        git add .
        
        # Commit
        git commit -m "feat: $COMMIT_MESSAGE"
        
        # Push
        git push origin main
        
        echo "✅ Backend commitado e enviado com sucesso!"
    else
        echo "ℹ️  Nenhuma mudança detectada no backend"
    fi
    
    cd ..
else
    echo "⚠️  Pasta backend não encontrada"
fi

echo ""
echo "🎉 Processo concluído!"
echo "📊 Status dos repositórios:"
echo "   Frontend: https://github.com/tallescarrelo/pagmus-frontend"
echo "   Backend:  https://github.com/tallescarrelo/pagmus-backend" 