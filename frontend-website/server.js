const express = require('express');
const path = require('path');
//const open = require('open');
const compression = require('compression');
const winston = require('winston');
const mailer = require('./src/utils/mailer');
const dateTimeHelper = require('./src/utils/dateTimeHelper');

const app = express();

//Log setup
if (app.get('env') === 'development'){
  winston.level = 'debug';
}

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: () => dateTimeHelper.toTaipeiTimeZoneFormat(new Date()) });
winston.add(winston.transports.File, { filename: 'winstonlog.log', json: false, timestamp: () => dateTimeHelper.toTaipeiTimeZoneFormat(new Date()) });

process.on('uncaughtException', function (err) {
    winston.error('uncaughtException', { message : err.message, stack : err.stack });    
    process.exit(1); // exit with failure
});

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = 80;
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }    
  else {
    winston.info('server started');
    mailer('server started');
    //open(`http://localhost:${port}`);
  }
});