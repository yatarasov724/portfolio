# Пошаговая инструкция: Шаг 1 - GitHub

## Что нужно сделать:

### Часть 1: Создать репозиторий на GitHub (в браузере)

1. Откройте браузер
2. Зайдите на https://github.com
3. Войдите в свой аккаунт (или создайте новый)
4. Нажмите кнопку **"+"** в правом верхнем углу
5. Выберите **"New repository"**
6. Заполните:
   - **Repository name**: `portfolio`
   - **Description**: (можно оставить пустым)
   - **Public** или **Private** (на ваш выбор)
   - ⚠️ **НЕ ставьте галочки** на "Add a README file", "Add .gitignore", "Choose a license"
7. Нажмите **"Create repository"**

### Часть 2: Подключить локальный проект к GitHub (в терминале)

**Откройте терминал** (на Mac это приложение "Терминал" или iTerm)

Выполните команды по порядку:

```bash
# 1. Перейдите в папку проекта
cd /Users/aroslavtarasov/portfolio

# 2. Проверьте, что вы в правильной папке (должен показать путь к portfolio)
pwd

# 3. Замените YOUR_USERNAME на ваш реальный GitHub username
# Например, если ваш username "yaroslav", то команда будет:
git remote add origin https://github.com/yaroslav/portfolio.git

# 4. Отправьте код на GitHub
git push -u origin main
```

**Если при `git push` попросит пароль:**
- Используйте **Personal Access Token** вместо пароля
- Как создать токен:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token (classic)
  3. Выберите scope: `repo` (полный доступ)
  4. Скопируйте токен и используйте его как пароль

### Альтернативный способ (через скрипт):

Если хотите использовать готовый скрипт:

```bash
# 1. Перейдите в папку проекта
cd /Users/aroslavtarasov/portfolio

# 2. Запустите скрипт (замените YOUR_USERNAME на ваш GitHub username)
./scripts/setup-github.sh YOUR_USERNAME
```

Скрипт сам:
- Настроит подключение к GitHub
- Спросит, создан ли репозиторий
- Если да, то отправит код автоматически

## Как узнать свой GitHub username?

1. Зайдите на github.com
2. В правом верхнем углу нажмите на аватар
3. Ваш username будет в выпадающем меню (или в URL профиля)

## Проверка, что всё получилось:

После выполнения команд откройте в браузере:
`https://github.com/YOUR_USERNAME/portfolio`

Вы должны увидеть все файлы вашего проекта.

---

**Следующий шаг:** После успешной отправки кода на GitHub → переходите к Шагу 2 (Vercel)
