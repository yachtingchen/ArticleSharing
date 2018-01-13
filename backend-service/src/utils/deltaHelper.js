module.exports = {
  getImgUrls: (deltaObj) => {
    let resultUrls = [];
    
    if (!deltaObj.ops)
      return resultUrls;

    deltaObj.ops.forEach((op) => {
      if (op.insert && op.insert.image)
        resultUrls.push(op.insert.image);
    });

    return resultUrls;
  }

};