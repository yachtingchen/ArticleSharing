const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const winston = require('winston');
const Mailer = require('./utils/mailer');
const dateTimeHelper = require('./utils/dateTimeHelper');
//const { graphql, buildSchema } = require('graphql');

const datastore = require('@google-cloud/datastore')(); //connect to the database
require('gstore-node').connect(datastore);
//load models
require('./model/user');
require('./model/category');
require('./model/work');

const app = express();

app.use(require('cors')());
app.use(require('compression')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Log setup
if (app.get('env') === 'development'){
  //app.use(logger('dev'));//morgan logging OOO 要開啟
  winston.level = 'debug';
}

if (app.get('env') !== 'test') {
  app.use(logger('dev'));//morgan logging OOO 要拿掉
}

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: () => dateTimeHelper.toTaipeiTimeZoneFormat(new Date()) });
winston.add(winston.transports.File, { filename: 'winstonlog.log', json: false, timestamp: () => dateTimeHelper.toTaipeiTimeZoneFormat(new Date()) });

process.on('uncaughtException', function (err) {
  winston.error('api_srv_uncaughtException', { message : err.message, stack : err.stack });    
  process.exit(1); // exit with failure
});
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());

//OOO
app.get('/fail', () => {
  throw new Error('Nope!');
});
//OOO
app.get('/epic-fail', () => {
  process.nextTick(() => {
    throw new Error('Kaboom!');
  });
});

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// routes setup
app.use('/auth', require('./routes/auth'));

app.use('/api', require('./routes/api-public'));

//================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

    // var xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';
    // xhr.open("POST", "http://localhost:8080/graphql");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.onload = function () {
    //   debugger;
    //   console.log('data returned:', xhr.response);
    // }
    // var query = `{
    //   allWorks {
    //     title
    //     isVisible
    //     createdOn
    //     downloadInstruction
    //   }
    // }`;
    // xhr.send(JSON.stringify({
    //   query: query
    // }));

const schema = require('./model/schema');
const resolver = require('./model/resolver');
const { makeExecutableSchema } = require('graphql-tools');

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
});

app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
 //rootValue: resolver,
  graphiql: true
}));

app.use('/api', require('./middleware/auth-check')); // authenticaion (before non-public api calls)
app.use('/api', require('./routes/api'));
app.use('/api/upload', require('./routes/api-upload'));

app.use('/', require('./routes/index'));//from express sta  rter template
app.use('/users', require('./routes/users'));//from express starter template

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  winston.error('api_srv_error_handler', { message : err.message, stack : err.stack });
  Mailer.SendTextMail('api_srv_error_handler' + err.stack);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
