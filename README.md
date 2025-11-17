## Описание проекта
 Web-сервер для управления балансом пользователей

## Технологии
- TypeScript, NestJS, PostgreSQL, TypeORM
- Кеширование (cache-manager)
- Валидация (class-validator)

## Настройка окружения
- Заполнить .env, скопирова содержание из .env.example
- Запустите инфраструктуру: docker-compose up -d
- Установите зависимости: npm install

## Запуск сервиса
- Development (watch mode): npm run start:dev
- Приложение стартует на http://localhost:3000.

