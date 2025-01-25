# Налаштування Prettier в WebStorm

### Крок 1. Налаштування WebStorm для використання Prettier (https://www.jetbrains.com/help/webstorm/prettier.html#ws_prettier_configure)

1. Відкрийте WebStorm.
2. Перейдіть в меню File → Settings (або WebStorm → Settings на macOS).
3. У лівій панелі виберіть Languages & Frameworks → JavaScript → Prettier.
4. Виберіть режим "Automatic prettier configuration"
5. Також можна увімкнути опцію On save для автоматичного форматування файлів при їх збереженні.

### Крок 2. Додавання налаштувань в WebStorm (https://www.jetbrains.com/help/webstorm/prettier.html#ws_prettier_apply_code_style)

1. Відкрийте файл [package.json](../package.json)
2. Відкрийте actions (SHIFT+SHIFT, далі вкладка actions), впишіть туди "Apply Prettier Code Style Rules"
3. Нажміть apply

---

З цими налаштуваннями ваш код у WebStorm буде автоматично форматуватися за допомогою Prettier, забезпечуючи єдиний стиль коду в проєкті.
