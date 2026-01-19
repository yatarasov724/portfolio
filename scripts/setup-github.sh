#!/bin/bash

# Скрипт для настройки GitHub репозитория
# Использование: ./scripts/setup-github.sh YOUR_USERNAME

set -e

if [ -z "$1" ]; then
  echo "❌ Ошибка: укажите ваш GitHub username"
  echo "Использование: ./scripts/setup-github.sh YOUR_USERNAME"
  exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="portfolio"

echo "🔗 Настройка GitHub репозитория..."

# Проверка существования remote
if git remote | grep -q "origin"; then
  echo "⚠️  Remote 'origin' уже существует"
  read -p "Перезаписать? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git remote remove origin
  else
    echo "Отменено"
    exit 0
  fi
fi

# Добавление remote
echo "📝 Добавление remote..."
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Переименование ветки в main (если нужно)
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
  echo "🔄 Переименование ветки в main..."
  git branch -M main
fi

echo "✅ Remote настроен!"
echo ""
echo "Следующие шаги:"
echo "1. Создайте репозиторий на github.com:"
echo "   https://github.com/new"
echo "   Название: ${REPO_NAME}"
echo "   НЕ ставьте галочки на 'Initialize with README'"
echo ""
echo "2. После создания репозитория выполните:"
echo "   git push -u origin main"
echo ""
read -p "Репозиторий уже создан? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "📤 Отправка кода на GitHub..."
  git push -u origin main
  echo ""
  echo "✅ Код отправлен на GitHub!"
  echo ""
  echo "Теперь можно деплоить на Vercel:"
  echo "1. Зайдите на vercel.com"
  echo "2. Add New Project"
  echo "3. Выберите репозиторий ${REPO_NAME}"
  echo "4. Deploy"
else
  echo "Создайте репозиторий и затем выполните: git push -u origin main"
fi
