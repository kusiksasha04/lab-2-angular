# Лабораторна робота №3 — Angular

SPA «Каталог товарів» на Angular 19: standalone-компоненти, маршрутизація, CRUD через HttpClient, Reactive Forms, signals, інтерцептор, unit-тести.

## Запуск

Потрібен [Node.js LTS](https://nodejs.org/en) і браузер Chrome (для тестів).

```bash
npm install        # встановити залежності (один раз)
npm run api        # фейковий бекенд json-server на http://localhost:3000
npm start          # у другому терміналі: застосунок на http://localhost:4200
npm test           # unit-тести (Karma + Jasmine)
```

Якщо Chrome не встановлено, тести можна запустити в Edge (PowerShell):

```powershell
$env:CHROME_BIN = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
npm test
```

## Структура

```
src/app/
  app.component.ts        кореневий компонент, меню Home / Products
  app.routes.ts           маршрути
  app.config.ts           провайдери: router, HttpClient + інтерцептор
  logging.interceptor.ts  логування запитів і помилок
  home.component.ts       головна сторінка
  products/
    products.service.ts         CRUD-сервіс (list/get/create/update/delete)
    products-list.component.ts  список: фільтр за категорією, пагінація, @for + track
    product-details.component.ts деталі товару, стан на signals (loading/error/product)
    product-form.component.ts   форма додавання/редагування (Reactive Forms + валідація)
    *.spec.ts                   тести сервісу та компонента списку
db.json                   дані для json-server
```

## Маршрути

| URL | Компонент |
|---|---|
| `/` | HomeComponent |
| `/products` | ProductsListComponent |
| `/products/new` | ProductFormComponent (створення) |
| `/products/:id` | ProductDetailsComponent |
| `/products/:id/edit` | ProductFormComponent (редагування) |
