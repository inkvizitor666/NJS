function parserString(string) {
  let arrPars = [];

  for (let i = 0; i < string.length; i++) {
    const num = Number(string[i]);
    if (Number.isNaN(num)) {
      arrPars.push(string[i]);
    } else {
      const lastIndex = arrPars.length - 1;
      const lastElementItem = arrPars[lastIndex];
      if (!Number.isNaN(Number(lastElementItem))) {
        arrPars[lastIndex] = Number(`${lastElementItem}${string[i]}`);
      } else {
        arrPars.push(num);
      }
    }
  }
  return arrPars;
}

module.exports = {
    parserString,
}