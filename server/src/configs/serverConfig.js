const express = require('express');
const morgan = require('morgan');

const path = require('path')

const cors = require('cors')

const removeXPoweredBy = require('../middlewares/removeHeader')
const multer = require('multer')

const indexRouter = require('../routes/index.router')

// * Подключаем cookie-parser
const cookieParser = require('cookie-parser');


const corsOptions = {
  origin: [process.env.CLIENT_URL],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // * Мы передаём куки на клиент 
}

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/uploads/'); // Папка для сохранения загруженных файлов
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Сохранение файла с оригинальным именем
    }
  });
  const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/; // Разрешенные типы файлов
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb('Ошибка: файл должен быть изображением!');
    }, 
  });

const serverConfig = (app) => {
  // * Подключаем CORS
  app.use(cors(corsOptions))

  app.use(express.urlencoded({ extended: true }));
  // * express.json() - чтобы отправлять данные из postman в json тело
  app.use(express.json());
  // Подключение Morgan
  app.use(morgan('dev'));

  app.use(express.static(path.join(__dirname, '../../public')))

  // * Чтение куки-файлов
  app.use(cookieParser());

  // * Подключение самописной мидлварки
  app.use(removeXPoweredBy)

  app.use('/api', indexRouter)

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send('Файл загружен успешно!');
  });
  
}

module.exports = serverConfig
