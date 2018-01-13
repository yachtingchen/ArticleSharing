module.exports = (fileExteion) => {  
  fileExteion = fileExteion.replace('.', '');
  if(!fileExteion.match(/(jpg|jpeg|png|gif)$/i)){
    throw new Error('invalid file extension: ' + fileExteion);
  }
  return true;
};