const path = require('path');
const express = require('express');
const app = express();
const createError = require('http-errors');
//const helmet = require('helmet');
//const logger = require('logger').express;
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require('express-session');
const FileStore = require('session-file-store')(session);
//const MongoStore = require('connect-mongo')(session);
//var sassMiddleware = require("node-sass-middleware");
const log = require('logger').common;

// Роуты
const indexRouter = require('routes/http/index');

//-------passport------
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());
//-------end passport-----

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

app.use(logger("dev"));
//app.use(logger); // логер. Там внутри pino
//app.use(helmet()); // хелмет фильтрует вредные заголовки и кривые запросы. Смотри доку хелмета для подробностей.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: 'ds23$%sdww3f',
    cookie: {
      path: '/',
      httpOnly: true, 
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, '../../public')));

// это специальный мидлвейр, который выключает роуты. Используеться раннером чтобы роуты не стали доступны раньше времени.
let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503)); // код 503 это "сервис временно недоступен", другими словами - сервер живой, но занят чем-то другим, постучите позже.
});

// Routes prefix
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. Don`t remove 'next' attribute
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status !== 404) {
    log.error(err);
  }

  res.status(err.status || 500);
  res.end();
});

// Включатель роутов
const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    log.info('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
