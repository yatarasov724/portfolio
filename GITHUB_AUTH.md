# Решение проблемы аутентификации GitHub

## Проблема
GitHub больше не поддерживает аутентификацию по паролю. Нужно использовать **Personal Access Token**.

## Решение: Создать Personal Access Token

### Шаг 1: Создайте токен на GitHub

1. Зайдите на https://github.com
2. Войдите в аккаунт
3. Нажмите на **аватар** (правый верхний угол) → **Settings**
4. В левом меню найдите **Developer settings** (внизу списка)
5. Выберите **Personal access tokens** → **Tokens (classic)**
6. Нажмите **Generate new token** → **Generate new token (classic)**
7. Заполните форму:
   - **Note**: `Portfolio deployment` (любое название)
   - **Expiration**: выберите срок (например, 90 days или No expiration)
   - **Select scopes**: поставьте галочку на **`repo`** (полный доступ к репозиториям)
8. Прокрутите вниз и нажмите **Generate token**
9. ⚠️ **ВАЖНО**: Скопируйте токен сразу! Он показывается только один раз!
   - Токен будет выглядеть примерно так: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Шаг 2: Используйте токен вместо пароля

Теперь в терминале, когда git попросит пароль:

1. **Username**: введите ваш GitHub username (`yatarasov724`)
2. **Password**: вставьте **токен** (не ваш пароль от GitHub!)

```bash
# Выполните команду снова
git push -u origin main

# Когда попросит:
# Username: yatarasov724
# Password: [вставьте токен, который скопировали]
```

## Альтернатива: Сохранить токен в системе (чтобы не вводить каждый раз)

### Для macOS (через Keychain):

```bash
# Используйте токен в URL (Git запомнит его)
git remote set-url origin https://yatarasov724:YOUR_TOKEN@github.com/yatarasov724/portfolio.git

# Замените YOUR_TOKEN на ваш реальный токен
# Затем попробуйте push снова
git push -u origin main
```

⚠️ **Внимание**: Токен будет сохранен в URL, но это безопасно для личных проектов.

### Или используйте SSH (более безопасно, но сложнее):

Если хотите настроить SSH ключи (рекомендуется для долгосрочного использования):

1. Создайте SSH ключ (если еще нет):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Скопируйте публичный ключ:
```bash
cat ~/.ssh/id_ed25519.pub
```

3. Добавьте его на GitHub:
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Вставьте ключ

4. Измените remote на SSH:
```bash
git remote set-url origin git@github.com:yatarasov724/portfolio.git
git push -u origin main
```

## Быстрое решение (самое простое):

1. Создайте токен (см. Шаг 1 выше)
2. Выполните в терминале:

```bash
cd /Users/aroslavtarasov/portfolio

# Замените YOUR_TOKEN на ваш токен
git remote set-url origin https://yatarasov724:YOUR_TOKEN@github.com/yatarasov724/portfolio.git

# Теперь push должен работать
git push -u origin main
```

---

**После успешного push** переходите к Шагу 2 (деплой на Vercel).
