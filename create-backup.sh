#!/bin/bash

# Script para criar backup automático das implementações
# Uso: ./create-backup.sh "descrição do backup"

if [ -z "$1" ]; then
    echo "❌ Erro: Forneça uma descrição do backup"
    echo "Uso: ./create-backup.sh \"descrição do backup\""
    exit 1
fi

BACKUP_DESCRIPTION="$1"
CURRENT_DATE=$(date +"%Y%m%d")
CURRENT_TIME=$(date +"%H%M")
BRANCH_NAME="backup-$(echo $BACKUP_DESCRIPTION | tr ' ' '-')-$CURRENT_DATE-$CURRENT_TIME"

echo "🔄 Criando backup..."
echo "📅 Data: $(date +"%Y-%m-%d %H:%M:%S")"
echo "🏷️  Descrição: $BACKUP_DESCRIPTION"
echo "🌿 Branch: $BRANCH_NAME"
echo ""

# ========================================
# FRONTEND BACKUP
# ========================================
echo "📱 === FRONTEND BACKUP ==="

# Criar branch de backup
git checkout -b "$BRANCH_NAME"

# Commit das mudanças atuais (se houver)
if git status --porcelain | grep -q .; then
    echo "✅ Commitando mudanças atuais..."
    git add src/ public/ package.json package-lock.json yarn.lock tsconfig.json server.ts start/ config/ docs/ env.example env.local README.md README_FUNCIONALIDADES.md REPOSITORIOS_SETUP.md
    git commit -m "backup: $BACKUP_DESCRIPTION - $(date +"%Y-%m-%d %H:%M:%S")"
fi

# Push da branch de backup
git push origin "$BRANCH_NAME"

echo "✅ Backup do frontend criado: $BRANCH_NAME"

# Voltar para main
git checkout main

echo ""

# ========================================
# BACKEND BACKUP
# ========================================
echo "🔧 === BACKEND BACKUP ==="

if [ -d "backend" ]; then
    cd backend
    
    # Criar branch de backup no backend
    git checkout -b "$BRANCH_NAME"
    
    # Commit das mudanças atuais (se houver)
    if git status --porcelain | grep -q .; then
        echo "✅ Commitando mudanças atuais do backend..."
        git add .
        git commit -m "backup: $BACKUP_DESCRIPTION - $(date +"%Y-%m-%d %H:%M:%S")"
    fi
    
    # Push da branch de backup
    git push origin "$BRANCH_NAME"
    
    echo "✅ Backup do backend criado: $BRANCH_NAME"
    
    # Voltar para main
    git checkout main
    
    cd ..
else
    echo "⚠️  Pasta backend não encontrada"
fi

echo ""
echo "🎉 Backup concluído!"
echo "📊 Branches de backup criadas:"
echo "   Frontend: $BRANCH_NAME"
echo "   Backend:  $BRANCH_NAME"
echo ""
echo "💡 Para restaurar um backup:"
echo "   git checkout $BRANCH_NAME" 