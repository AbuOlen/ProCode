var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var app = express();
var indexRouter = require('./routes/index');

                  const cors = require('cors')
                  const bodyParser = require('body-parser')
                  const passport = require('passport');
                  const cookieSession = require('cookie-session');

                            require('./strategies/google');     // *** 3 function

                  app.use(cors())

                  // parse application/x-www-form-urlencoded
                  app.use(bodyParser.urlencoded({ extended: false }))
                  
                  // parse application/json
                  app.use(bodyParser.json())

                  // For an actual app you should configure this with an experation time, better keys, proxy and secure
                  app.use(cookieSession({
                      name: 'tuto-session',
                      keys: ['key1', 'key2']
                    }))

                  // Initializes passport and passport sessions
                  app.use(passport.initialize());
                  app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


 //app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))

module.exports = app;
