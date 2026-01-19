# Проблема: сайт просит залогиниться в другом браузере

## Возможные причины:

### 1. Вы используете Preview URL (не production)

Vercel создает два типа URL:
- **Production URL**: `https://portfolio-xxxxx.vercel.app` - публичный, доступен всем
- **Preview URL**: `https://portfolio-git-main-xxxxx.vercel.app` - может требовать авторизацию

**Решение**: Используйте production URL (основной URL проекта)

### 2. Настройки Vercel - Password Protection

Возможно, случайно включена защита паролем.

**Как проверить и отключить:**
1. Зайдите в Vercel Dashboard
2. Выберите проект `portfolio`
3. Перейдите в **Settings** → **Deployment Protection**
4. Проверьте, что **Password Protection** выключена
5. Если включена - отключите и сохраните

### 3. Preview Deployments требуют авторизацию

По умолчанию preview deployments могут быть приватными.

**Как сделать preview публичными:**
1. Vercel Dashboard → **Settings** → **Git**
2. Найдите настройку **"Preview Deployment Protection"**
3. Убедитесь, что она выключена или настроена правильно

### 4. Вы используете не тот URL

Проверьте, какой именно URL вы используете:
- Должен быть: `https://portfolio-xxxxx.vercel.app` (production)
- НЕ должен быть: `https://portfolio-git-xxxxx.vercel.app` (preview)

## Как найти правильный Production URL:

1. Зайдите в Vercel Dashboard
2. Выберите проект `portfolio`
3. На главной странице проекта увидите:
   - **Production**: `https://portfolio-xxxxx.vercel.app` ← используйте этот
   - Preview URLs (если есть)

## Быстрое решение:

1. Откройте Vercel Dashboard
2. Проект `portfolio` → вкладка **Deployments**
3. Найдите deployment со статусом **"Production"** (зеленая галочка)
4. Скопируйте URL из этого deployment
5. Используйте именно этот URL

## Если проблема не решается:

Проверьте настройки проекта:
1. **Settings** → **General**
2. Убедитесь, что проект не приватный
3. **Settings** → **Deployment Protection** → все должно быть выключено

---

**Важно**: Production URL должен быть доступен всем без авторизации!
