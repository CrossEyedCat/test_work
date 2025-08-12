# Test Work - React Application

Современное React приложение с красивым UI, построенное на Vite и Tailwind CSS.

## 🚀 Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```

### Предварительный просмотр сборки
```bash
npm run preview
```

## 🌐 Развертывание на GitHub Pages

### Автоматический деплой (рекомендуется)

1. **Создайте репозиторий на GitHub** с именем `test_work`

2. **Замените `YOUR_USERNAME` в `package.json`** на ваше реальное имя пользователя GitHub:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/test_work"
   ```

3. **Загрузите код в GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/test_work.git
   git push -u origin main
   ```

4. **Настройте GitHub Pages:**
   - Перейдите в Settings → Pages
   - В Source выберите "GitHub Actions"
   - GitHub Actions автоматически развернет ваш сайт при каждом push в main ветку

### Ручной деплой

Если хотите развернуть вручную:

```bash
npm run deploy
```

## 📁 Структура проекта

```
test_work/
├── src/
│   ├── components/
│   │   ├── AuthForm.jsx      # Форма авторизации
│   │   └── CompanyForm.jsx   # Форма регистрации компании
│   ├── App.jsx               # Главный компонент
│   └── main.jsx              # Точка входа
├── public/                   # Статические файлы
├── .github/workflows/        # GitHub Actions
└── dist/                     # Собранные файлы (после build)
```

## 🛠 Технологии

- **React 19** - современная библиотека для UI
- **Vite** - быстрый сборщик
- **Tailwind CSS** - utility-first CSS фреймворк
- **HeroUI** - компоненты UI
- **Framer Motion** - анимации
- **TypeScript** - типизация

## 🔧 Настройка

### Переменные окружения
Создайте файл `.env.local` для локальной разработки:
```env
VITE_API_URL=http://localhost:3000
```

### Кастомизация
- Цвета и темы настраиваются в `tailwind.config.js`
- Стили компонентов в `src/App.css`
- Глобальные стили в `src/index.css`

## 📱 Адаптивность

Приложение полностью адаптивно и работает на всех устройствах:
- Мобильные устройства
- Планшеты
- Десктопы

## 🚀 Производительность

- Оптимизированная сборка с Vite
- Ленивая загрузка компонентов
- Оптимизированные изображения
- Минификация CSS и JavaScript

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Поддержка

Если у вас есть вопросы или проблемы, создайте Issue в репозитории.
