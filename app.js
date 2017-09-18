require('dotenv').config()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

// fill this in and move to dir
const models = {
  daf: sequelize.define('daf', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    
    tractate: Sequelize.STRING,
    tractateShort: Sequelize.STRING,
    
    book: Sequelize.STRING,
    bookShort: Sequelize.STRING,
    
    chapter: Sequelize.STRING,
    chapterShort: Sequelize.STRING,

    section: Sequelize.STRING,
    sectionShort: Sequelize.STRING,
    
    dafNumber: Sequelize.INTEGER,

    raw: Sequelize.TEXT,
    plain: Sequelize.TEXT,
    html: Sequelize.TEXT,
    md: Sequelize.TEXT,

    url: Sequelize.STRING,
  }),
};

// force: true will drop the table if it already exists
true || models.daf.sync({force: true}).then(() => {
  // Table created
  console.log('syncd');
});
// here optionally sync the tables



var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




var index = require('./routes/index');
var users = require('./routes/users');

const dafRoutes = require('./routes/dafs')(models.daf);

const dafAPI = [
  { method: 'GET', path: '/id/:id', handler: dafRoutes.readOne },
  { method: 'POST', path: '/', handler: dafRoutes.create },
  { method: 'GET', path: '/raw/:tr/:ct/:file', handler: dafRoutes.readRaw },
];

const dafRouter = express.Router();

dafAPI.forEach(({ method, path, handler })=>
  dafRouter[method.toLowerCase()]( path, handler )
);


app.use('/', index);
app.use('/users', users);
app.use('/dafs', dafRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err});
});

module.exports = app;
