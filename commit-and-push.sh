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

# ========================================
# FRONTEND REPOSITORY
# ========================================
echo "\n📱 === FRONTEND REPOSITORY ==="
cd frontend || { echo "❌ Pasta frontend não encontrada"; exit 1; }

if git status --porcelain | grep -q .; then
    echo "✅ Mudanças detectadas no frontend"
    git add src/ public/ package.json package-lock.json yarn.lock tsconfig.json server.ts start/ config/ docs/ env.example env.local README.md README_FUNCIONALIDADES.md REPOSITORIOS_SETUP.md commit-and-push.sh create-backup.sh
    git commit -m "feat: $COMMIT_MESSAGE"
    git push origin main
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
    git push origin main
    echo "✅ Backend commitado e enviado com sucesso!"
else
    echo "ℹ️  Nenhuma mudança detectada no backend"
fi
cd ..

echo "\n🎉 Processo concluído!"
echo "📊 Status dos repositórios:"
echo "   Frontend: https://github.com/tallescarrelo/pagmus-frontend"
echo "   Backend:  https://github.com/tallescarrelo/pagmus-backend" 