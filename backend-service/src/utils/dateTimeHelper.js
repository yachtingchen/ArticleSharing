const moment = require('moment-timezone');

exports.toTaipeiTimeZoneFormat = (time) => {
  const format = 'YYYY/MM/DD HH:mm:ss ZZ';
  return moment(time, format).tz("Asia/Taipei").format(format);
};