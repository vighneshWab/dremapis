var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var currency = require('./currency/currencyRoutes')
var vendor = require('./vendor/vendorRoutes')
var invoice = require('./invoice/invoiceRoutes')




var mongodbUrl = "mongodb://admin:admin123*@ds141796.mlab.com:41796/dremcrm"
// var mongodbUrl = "mongodb://localhost:27017/cab_db"
mongoose.connect(mongodbUrl, {
  useMongoClient: true
});


var db = mongoose.createConnection(mongodbUrl, {
  useMongoClient: true
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('MongoDB connection established');
});

var index = require('./routes/index');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/currency', currency);
app.use('/vendor', vendor);
app.use('/invoice', invoice);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
