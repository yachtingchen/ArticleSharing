const moment = require('moment-timezone');

exports.Format = (dateTime) => {
    return dateTime.getFullYear() + "-" + 
    ("00" + (dateTime.getMonth() + 1)).slice(-2) + "-" + 
    ("00" + dateTime.getDate()).slice(-2) + " " + 
    ("00" + dateTime.getHours()).slice(-2) + ":" + 
    ("00" + dateTime.getMinutes()).slice(-2) + ":" + 
    ("00" + dateTime.getSeconds()).slice(-2);
};


exports.toTaipeiTimeZoneFormat = (time) => {
    const format = 'YYYY/MM/DD HH:mm:ss ZZ';
    return moment(time, format).tz("Asia/Taipei").format(format);
}