const Config = require('../constants/Config');

module.exports = {
  getOriginFromTmpUrl: (tmpUrl) => {
    return tmpUrl.substring(0, tmpUrl.indexOf(Config.WORK_TEMP_IMGS_FOLDER) - 1);
  },

  // getWorkImgMoveInfo: (tmpUrl, origin, workId) => {
  //   //const newUrl = `${origin}/works/${workId}/cover.${fileExtension}`;    
  // }


};