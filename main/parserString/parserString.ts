export function parserString(string: string) {
  let arrPars: (string | number)[] = [];
  for (let i = 0; i < string.length; i++) {
    const num = Number(string[i]);
    if (isNaN(num)) {
      arrPars.push(Number(string[i]));
    } else {
      const lastIndex: number = arrPars.length - 1;
      const lastElementItem = arrPars[lastIndex];
      if (!isNaN(Number(lastElementItem))) {
        arrPars[lastIndex] = Number(`${lastElementItem}${string[i]}`);
      } else {
        arrPars.push(num);
      }
    }
  }
  return arrPars;
}
