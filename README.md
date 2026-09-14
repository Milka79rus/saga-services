# Список и детали услуг — Redux-Saga
[![Deploy React App to GitHub Pages](https://github.com/Milka79rus/saga-services/actions/workflows/deploy.yml/badge.svg)](https://github.com/Milka79rus/saga-services/actions/workflows/deploy.yml)

 Приложение отображает список услуг сервисного центра и детальную информацию по каждой услуге с обработкой состояний загрузки, ошибок и возможностью повторить запрос.

## Описание задания

Реализовать SPA-приложение, которое:

- Загружает список услуг с REST API и отображает их в виде карточек
- При клике на карточку переходит на страницу деталей услуги
- Обрабатывает три состояния каждого запроса: загрузка, успех, ошибка
- Показывает индикатор загрузки во время запроса
- При ошибке отображает сообщение и кнопку «Повторить запрос»
- Использует Redux-Saga для управления асинхронными запросами
- Хранит состояния списка и деталей раздельно в store

## Быстрый старт

### Установка зависимостей

```bash
npm install
cd backend && npm install && cd ..
```

### Запуск приложения

Нужны два терминала одновременно:

```bash
# Терминал 1 — бэкенд (порт 7070)
cd backend
npm start

# Терминал 2 — фронтенд (порт 5173)
npm run dev
```

Приложение откроется автоматически на http://localhost:5173/

## Технологический стек

- **React**  — библиотека для UI
- **TypeScript**  — типизация
- **Redux Toolkit**  — управление состоянием
- **Redux-Saga** — side-effects
- **React Router**  — маршрутизация
- **Vite** — сборщик и dev-сервер
- **Express**  — REST API бэкенд

## Структура проекта

```
saga-services/
│
├── backend/
│   ├── server.js          # Express: /api/services, /api/services/:id
│   └── package.json
│
├── src/
│   ├── api/
│   │   └── servicesAPI.ts        # fetch-обёртки, обработка ошибок
│   │
│   ├── assets/
│   │   ├── spinner.png           # индикатор загрузки
│   │   └── retry.png             # экран ошибки
│   │
│   ├── components/
│   │   ├── Spinner.tsx           # общий спиннер
│   │   ├── ErrorView.tsx         # экран ошибки + кнопка повтора
│   │   └── ServiceCard.tsx       # карточка-ссылка на детали
│   │
│   ├── pages/
│   │   ├── ServicesListPage.tsx      # маршрут /
│   │   └── ServiceDetailsPage.tsx    # маршрут /:id/details
│   │
│   ├── store/
│   │   ├── services/
│   │   │   ├── servicesSlice.ts      # редьюсер
│   │   │   ├── servicesSaga.ts       # worker/watcher саги
│   │   │   └── servicesSelectors.ts  # селекторы
│   │   ├── hooks.ts              # типизированные хуки Redux
│   │   ├── rootSaga.ts           # корневая сага
│   │   └── store.ts              # configureStore + sagaMiddleware
│   │
│   ├── App.tsx              # роутер
│   ├── App.css              # все стили
│   ├── main.tsx             # точка входа
│   └── vite-env.d.ts        # декларации типов
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Архитектура Redux-Saga

### Состояние store

```typescript
{
  services: {
    list: {
      data: ServiceListItem[],
      loading: boolean,
      error: string | null
    },
    details: {
      data: ServiceDetails | null,
      loading: boolean,
      error: string | null
    }
  }
}
```

### Жизненный цикл запроса

```
1. Пользователь открывает главную страницу
   ↓
2. useEffect диспатчит listRequested()
   ↓
3. Saga перехватывает (takeLatest)
   ↓
4. Saga вызывает call(servicesAPI.fetchList)
   ↓
5а. Успех → put(listSucceeded(data))
    Редьюсер: loading=false, data=[...], error=null
    UI показывает список
   
5б. Ошибка → put(listFailed(error.message))
    Редьюсер: loading=false, error="текст ошибки"
    UI показывает ErrorView с кнопкой повтора
```

### Ключевые эффекты Saga

- **call** — вызов асинхронной функции fetch
- **put** — диспатч действия в store
- **takeLatest** — отмена предыдущего запроса при новом

## API

### Список услуг

```
GET http://localhost:7070/api/services
```

Ответ (200):

```json
[
  { "id": 1, "name": "Замена стекла", "price": 21000 },
  { "id": 2, "name": "Замена дисплея", "price": 25000 },
  { "id": 3, "name": "Замена аккумулятора", "price": 4000 },
  { "id": 4, "name": "Замена микрофона", "price": 2500 }
]
```

### Детали услуги

```
GET http://localhost:7070/api/services/:id
```

Ответ (200):

```json
{
  "id": 1,
  "name": "Замена стекла",
  "price": 21000,
  "content": "Стекло оригинал от Apple"
}
```

### Особенность бэкенда

Функция `fortune()` в `server.js` намеренно имитирует нестабильную сеть:

- Задержка ответа: 3 секунды
- Вероятность успеха: 30%
- Вероятность ошибки 500: 70%

Это заложено автором задания для проверки обработки ошибок и кнопки «Повторить запрос».





