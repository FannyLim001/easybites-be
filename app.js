var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var protect = require("./middleware/authMiddleware");

var authRouter = require('./routes/auth');
var foodsRouter = require('./routes/foods');

var app = express();

require("dotenv").config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Apply protect middleware globally (except for auth routes)
app.use((req, res, next) => {
  if (req.path.startsWith("/api/auth")) return next(); // Allow login/register
  protect(req, res, next);
});

app.use('/api/auth', authRouter);
app.use('/api/foods', foodsRouter);

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

mongoose.set('debug', true);

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@easybitesdb.pi0qk.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority&appName=EasyBitesDB`;

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.error("Connection failed:", err));

module.exports = app;