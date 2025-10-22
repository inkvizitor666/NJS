export interface Ifriend {
  id: string;
  name: string;
  age: number;
  friends: Ifriend[];
}
export interface IUser {
  id: string;
  name: string;
  age: number;
  friends: Ifriend[];
}

interface IHome {
  countWindow: number;
  countDoor: number;
  addres: string;
}
interface IHomeWithOutAddres extends Omit<IHome, "addres" | "countDoor"> {}

interface IHomeWithPeole<PEOPLE = string> extends IHome {
  people: PEOPLE[];
}
const home: IHome = {
  countWindow: 0,
  countDoor: 0,
  addres: "Улица пушкина дом колотушкина",
};
const homeWithPeople: IHomeWithPeole = {
  countWindow: 1,
  countDoor: 1,
  addres: "zzzzzzzzzzzzzzz",
  people: ["I", "I2"],
};

const homeWithPeople2: IHomeWithPeole<IUser> = {
  countWindow: 1,
  countDoor: 1,
  addres: "zzzzzzzzzzzzzzz",
  people: [{ id: "0", name: "aaaa", age: 0, friends: [] }],
};

const homeWithOutAddres: IHomeWithOutAddres = {
  countWindow: 2,
};
