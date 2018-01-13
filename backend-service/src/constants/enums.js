module.exports = {
  Visibility: {
    VISIBLE: "VISIBLE",
    HIDDEN: "HIDDEN"
  },
  isInstanceOf: (textToCheck, enumDefObj) => {
    for (const key of Object.keys(enumDefObj)) {
      if( textToCheck === enumDefObj[key]){
        return true;
      }      
    }

    return false;
  }
};
