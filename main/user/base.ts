import { IFriend, IUser } from "./type";

export const newDbUser = new Map<string, IUser>();

newDbUser.set("1", {
  id: "1",
  name: "artem",
  age: 28,
  friends: new Map<string, IFriend>([
    ["2", { id: "2", name: "vika", age: 18 }],
    ["5", { id: "5", name: "nina", age: 50 }],
    ["90", { id: "90", name: "test1", age: 50 }],
    ["91", { id: "91", name: "test2", age: 50 }],
    ["92", { id: "92", name: "test3", age: 50 }],
    ["93", { id: "93", name: "test4", age: 50 }],
  ]),
});
newDbUser.set("2", {
  id: "2",
  name: "vika",
  age: 18,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("3", {
  id: "3",
  name: "stas",
  age: 40,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("4", {
  id: "4",
  name: "katua",
  age: 38,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("5", {
  id: "5",
  name: "nina",
  age: 60,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("6", {
  id: "6",
  name: "tania",
  age: 34,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("7", {
  id: "7",
  name: "nikolai",
  age: 41,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("8", {
  id: "8",
  name: "edyard",
  age: 36,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("9", {
  id: "9",
  name: "luba",
  age: 34,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("10", {
  id: "10",
  name: "anjela",
  age: 32,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("11", {
  id: "11",
  name: "daniil",
  age: 20,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("12", {
  id: "12",
  name: "alena",
  age: 14,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("13", {
  id: "13",
  name: "sofia",
  age: 6,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("14", {
  id: "14",
  name: "vladimir",
  age: 67,
  friends: new Map<string, IFriend>([]),
});
newDbUser.set("15", {
  id: "15",
  name: "maria",
  age: 64,
  friends: new Map<string, IFriend>([]),
});

/* const friendArr = [
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

const mainFunc = (arr: any[], func: (element: any, index: number) => boolean) => {
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

console.log(friendArr2); */
