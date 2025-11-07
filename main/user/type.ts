type WithoutId<I> = Omit<I, "id">;

export interface IUserBase {
  id: string;
  name: string;
  age: number;
}

export interface IFriend extends IUserBase {}

export interface IUser extends IUserBase {
  friends: Map<string, IFriend>;
}

export interface IUserGetParams extends Pick<IUser, "id"> {}
export interface IUserPutBody extends Omit<WithoutId<IUser>, "friends"> {}
export interface IUserPutParams extends Pick<IUser, "id"> {}
export interface IUserPostBody extends WithoutId<IUser> {}
export interface IUserDeleteParams extends Pick<IUser, "id"> {}

export interface IFriendGetParams extends Pick<IFriend, "id"> {}
export interface IFriendPostParams extends Pick<IUser, "id"> {
  friendId: string;
}
export interface IFriendDeleteParams extends Pick<IUser, "id"> {
  friendId: string;
}

export interface IPageGetParams {
  numPage: number;
  quantityElements: number;
}
export interface ICalculateParams {
  mathematicalExpression: string;
}

/* interface IHome {
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
  addres: "ул Вавилова",
  people: ["I", "I2"],
};

const homeWithPeople2: IHomeWithPeole<IUser> = {
  countWindow: 1,
  countDoor: 1,
  addres: "zzzzzzzzzzzzzzz",
  people: [{ id: "0", name: "aaaa", age: 0, friends: new Map() }],
};

const homeWithOutAddres: IHomeWithOutAddres = {
  countWindow: 2,
}; */
