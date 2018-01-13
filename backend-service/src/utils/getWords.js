module.exports = (sentence) => {
  //'。,.I。Am，我是loving陳it彥廷!'.match(/\b(\w+)\b/g).map((_)=>_.toLowerCase())
  //[ 'i', 'am', 'loving', 'it' ]
  let engResult = [];
  let enWords = sentence.match(/\b(\w+)\b/g);
  if (enWords)
    engResult = enWords.map((_)=>_.toLowerCase());
  //'。,.I。Am，我是loving陳it彥廷!'.match(/([\u4E00-\u9FCC])/g)
  //[ '我', '是', '陳', '彥', '廷' ]
  let chineseResult = [];
  const chineseCharactors = sentence.match(/([\u4E00-\u9FCC])/g);
  if (chineseCharactors)
    chineseResult = chineseCharactors;

  let result = [...engResult, ...chineseResult];
  return result;
};