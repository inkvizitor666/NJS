export const friendArr = [
  { id: "2", name: "vika", age: 18, friends: [] },
  { id: "5", name: "nina1", age: 50, friends: [] },
  { id: "6", name: "nina2", age: 50, friends: [] },
  { id: "7", name: "nina3", age: 50, friends: [] },
  { id: "8", name: "nina4", age: 50, friends: [] },
  { id: "9", name: "nina5", age: 50, friends: [] },
];

//реализовать функцию которая первым аргументом будет принимать массив
// вторым аргументом будет принимать функцию которая будет принимать аргументом элемент и возвращать тру или фолс
//сама функция будет возвращать массив

const mainFunc = (
  arr: any[],
  func: (element: any, index: number) => boolean
) => {
  const bufArr = [];
  for (let i = 0; i < arr.length; i++) {
    const bufElement: any = arr[i];
    if (bufElement) {
      const buf = func(bufElement, i);
      if (buf) {
        bufArr.push(bufElement);
      }
    }
  }
  return bufArr;
};

const noMainFunc = (element: any, index: number) => {
  if (element.age != 18 && index != 3) {
    return true;
  }
  return false;
};

const friendArr2 = mainFunc(friendArr, noMainFunc);

console.log(friendArr2);
