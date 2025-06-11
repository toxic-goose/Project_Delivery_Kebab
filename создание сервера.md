## 1. Настройка базовой структуры проекта

### Установка необходимых пакетов

```bash
# Создание нового проекта
npm init -y

# Установка основных зависимостей
npm install express dotenv sequelize sequelize-cli pg pg-hstore morgan

# Установка dev-зависимостей
npm install nodemon --save-dev

# Установка линтера
npm init @eslint/config

# Добавление файла .gitignore
npx gitignore node
```

### Создание базовой структуры папок

```bash
# Создание основных директорий
mkdir -p src/{config,middleware,public,routes,controllers,services,utils}
```

### Настройка .sequelizerc

```javascript
const path = require('path');
require('dotenv').config();

module.exports = {
  config: path.resolve('src', 'db', 'config', 'database.json'),
  'models-path': path.resolve('src', 'db', 'models'),
  'seeders-path': path.resolve('src', 'db', 'seeders'),
  'migrations-path': path.resolve('src', 'db', 'migrations'),
};
```

## 2. Настройка конфигурации

### Создание файла .env

```bash
# .env
DB="postgres://user:password@localhost:5432/database"
PORT=3000
```

## 3. Настройка базы данных

### Инициализация Sequelize

```bash
npx sequelize-cli init
```

### Настройка конфигурации базы данных

```javascript
// src/db/config/database.json
{
  "development": {
    "use_env_variable": "DB"
  },
  "test": {
    "use_env_variable": "DB"
  },
  "production": {
    "use_env_variable": "DB"
  }
}
```

### Создание модели и миграции

```bash
npx sequelize-cli model:generate --name Task --attributes title:string,body:string
```

## 4. Доработка файла index.js в папке db/models

```javascript
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '..', '.env'),
});
```

## 5. Накатывание базы данных и миграций

```bash
npx sequelize db:create && npx sequelize db:migrate
```

## 6. Написание утилит для серверного приложения

### formatResponse - Собирает единый формат ответа от сервера

```javascript
// src/utils/formatResponse.js

function formatResponse(statusCode, message, data = null, error = null) {
  return {
    statusCode,
    message,
    data,
    error,
  };
}

module.exports = formatResponse;
```

### isValidId - Проверяет валидность ID.

```javascript
// src/utils/isValidId.js

function isValidId(id) {
  return !isNaN(id);
}

module.exports = isValidId;
```

### TaskValidator - Проверяет валидность данных для записи новых экземпляров сущности Task.

```javascript
// src/utils/Task.validator.js

class TaskValidator {
  static validate(data) {
    const { title, body } = data;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return {
        isValid: false,
        error: 'Title is required and must be a non-empty string.',
      };
    }

    if (!body || typeof body !== 'string' || body.trim() === '') {
      return {
        isValid: false,
        error: 'Body is required and must be a non-empty string.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = TaskValidator;
```

## 7. Создание кастомной мидлварки на удаление заголовка

```javascript
// src/middleware/removeHeader.js

const removeHTTPHeader = (req, res, next) => {
  res.removeHeader('x-powered-by');
  next();
};

module.exports = removeHTTPHeader;
```

## 8. Создание конфигурации сервера

```javascript
// src/config/serverConfig.js

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const removeHTTPHeader = require('../middleware/removeHeader');

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(removeHTTPHeader);
  app.use(
    '/static/images',
    express.static(path.resolve(__dirname, '..', 'public', 'images'))
  );
};

module.exports = serverConfig;
```

## 9. Создание сервисов

```javascript
// src/services/Task.service.js
const { Task } = require('../db/models');

class TaskService {
  static async getAll() {
    return await Task.findAll();
  }

  static async getById(id) {
    return await Task.findByPk(id);
  }

  static async create(data) {
    return await Task.create(data);
  }

  static async update(id, data) {
    const task = await this.getById(id);
    if (task) {
      task.title = data.title;
      task.body = data.body;
      await task.save();
    }
    return task;
  }

  static async delete(id) {
    const task = await this.getById(id);
    if (task) {
      await task.destroy();
    }
    return task;
  }
}

module.exports = TaskService;
```

## 10. Создание контроллеров

```javascript
// src/controllers/Task.controller.js
const TaskService = require('../services/Task.service');
const isValidId = require('../utils/isValidId');
const TaskValidator = require('../utils/Task.validator');
const formatResponse = require('../utils/formatResponse');

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAll();

      if (tasks.length === 0) {
        return res.status(200).json(formatResponse(200, 'No tasks found', []));
      }

      res.status(200).json(formatResponse(200, 'success', tasks));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getTaskById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    try {
      const task = await TaskService.getById(+id);

      if (!task) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', task));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createTask(req, res) {
    const { title, body } = req.body;

    const { isValid, error } = TaskValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      const newTask = await TaskService.create({ title, body });

      if (!newTask) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new task`));
      }

      res.status(201).json(formatResponse(201, 'success', newTask));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async updateTask(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    const { isValid, error } = TaskValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      const updatedTask = await TaskService.update(+id, { title, body });

      if (!updatedTask) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, 'success', updatedTask));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deleteTask(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    try {
      const deletedTask = await TaskService.delete(+id);

      if (!deletedTask) {
        return res
          .status(404)
          .json(formatResponse(404, `Task with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Task with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = TaskController;
```

## 11. Настройка маршрутов

### Создание маршрутов для задач

```javascript
// src/routes/task.routes.js
const router = require('express').Router();
const TaskController = require('../controllers/Task.controller');

router
  .get('/', TaskController.getAllTasks)
  .get('/:id', TaskController.getTaskById)
  .post('/', TaskController.createTask)
  .put('/:id', TaskController.updateTask)
  .delete('/:id', TaskController.deleteTask);

module.exports = router;
```

### Настройка основного файла маршрутов

```javascript
// src/routes/index.routes.js
const router = require('express').Router();
const taskRoutes = require('./task.routes');
const formatResponse = require('../utils/formatResponse');

router.use('/tasks', taskRoutes);

router.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports = router;
```

## 12. Настройка основного файла приложения

```javascript
// src/app.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes');

const app = express();

serverConfig(app);

const PORT = process.env.PORT || 3000;

app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
```

## 13. Настройка скриптов в package.json

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "dbHelp": "npx sequelize help",
    "dbCreate": "npx sequelize db:create",
    "dbDrop": "npx sequelize db:drop",
    "dbMig": "npx sequelize db:migrate",
    "dbMigUndo": "npx sequelize db:migrate:undo:all",
    "dbSeed": "npx sequelize db:seed:all",
    "dbSeedUndo": "npx sequelize db:seed:undo:all",
    "dbInit": "npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all"
  }
}
```

## 14. Запуск приложения

```bash
# Запуск приложения в режиме разработки
npm run dev
```
