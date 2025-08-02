#!/bin/bash

# Script para commit e push automático dos repositórios
# Uso: ./commit-and-push.sh "mensagem do commit"
# 
# Para usar com token, configure a variável de ambiente:
# export GITHUB_TOKEN="seu_token_aqui"

# Verificar se o token está configurado
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  GITHUB_TOKEN não configurado"
    echo "Configure com: export GITHUB_TOKEN=\"seu_token_aqui\""
    echo "Ou adicione no ~/.bashrc ou ~/.zshrc"
fi

if [ -z "$1" ]; then
    echo "❌ Erro: Forneça uma mensagem de commit"
    echo "Uso: ./commit-and-push.sh \"sua mensagem de commit\""
    exit 1
fi

COMMIT_MESSAGE="$1"
CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")

# ========================================
# FRONTEND REPOSITORY
# ========================================
echo "\n📱 === FRONTEND REPOSITORY ==="
cd frontend || { echo "❌ Pasta frontend não encontrada"; exit 1; }

if git status --porcelain | grep -q .; then
    echo "✅ Mudanças detectadas no frontend"
    git add src/ public/ package.json package-lock.json yarn.lock tsconfig.json server.ts start/ config/ docs/ env.example env.local README.md README_FUNCIONALIDADES.md REPOSITORIOS_SETUP.md commit-and-push.sh create-backup.sh
    git commit -m "feat: $COMMIT_MESSAGE"
    
    # Push com token se configurado
    if [ -n "$GITHUB_TOKEN" ]; then
        git remote set-url origin https://$GITHUB_TOKEN@github.com/tallescarrelo/pagmus-frontend.git
        git push origin main
        git remote set-url origin https://github.com/tallescarrelo/pagmus-frontend.git
    else
        git push origin main
    fi
    echo "✅ Frontend commitado e enviado com sucesso!"
else
    echo "ℹ️  Nenhuma mudança detectada no frontend"
fi
cd ..

# ========================================
# BACKEND REPOSITORY
# ========================================
echo "\n🔧 === BACKEND REPOSITORY ==="
cd backend || { echo "❌ Pasta backend não encontrada"; exit 1; }

if git status --porcelain | grep -q .; then
    echo "✅ Mudanças detectadas no backend"
    git add .
    git commit -m "feat: $COMMIT_MESSAGE"
    
    # Push com token se configurado
    if [ -n "$GITHUB_TOKEN" ]; then
        git remote set-url origin https://$GITHUB_TOKEN@github.com/tallescarrelo/pagmus-backend.git
        git push origin main
        git remote set-url origin https://github.com/tallescarrelo/pagmus-backend.git
    else
        git push origin main
    fi
    echo "✅ Backend commitado e enviado com sucesso!"
else
    echo "ℹ️  Nenhuma mudança detectada no backend"
fi
cd ..

echo "\n🎉 Processo concluído!"
echo "📊 Status dos repositórios:"
echo "   Frontend: https://github.com/tallescarrelo/pagmus-frontend"
echo "   Backend:  https://github.com/tallescarrelo/pagmus-backend" 