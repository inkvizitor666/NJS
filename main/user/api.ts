import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "../../node_modules/@types/express";
import { friendArr } from "./Arr";
import {
  IFriend,
  IFriendGetParams,
  IFriendPostParams,
  IUser,
  IUserDeleteParams,
  IUserGetParams,
  IUserPostBody,
  IUserPutBody,
  IUserPutParams,
} from "./type";

const newDbUser = new Map<string, IUser>();

newDbUser.set("1", {
  id: "1",
  name: "artem",
  age: 28,
  friends: new Map<string, IFriend>([
    ["2", { id: "2", name: "vika", age: 18 }],
    ["5", { id: "5", name: "nina1", age: 50 }],
    ["6", { id: "6", name: "nina2", age: 50 }],
    ["7", { id: "7", name: "nina3", age: 50 }],
    ["8", { id: "8", name: "nina4", age: 50 }],
    ["9", { id: "9", name: "nina5", age: 50 }],
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

//console.log(Array.from(newDbUser.values()));

//##############################USER################################

export const getUserById = (
  req: ExpressRequest<IUserGetParams>,
  res: ExpressResponse<IUser | string>
) => {
  const { id } = req.params;

  if (!id) {
    res.send(`ID поле АБЯЗАТИЛЬНА!!!!`);
    return;
  }

  const findUser = newDbUser.get(id);
  if (!findUser) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }

  res.json(findUser);
};
export const postUser = (
  req: ExpressRequest<IUserPostBody>,
  res: ExpressResponse<IUser | string>
) => {
  const id = String(Math.ceil(Math.random() * 1000));
  const name: String = req.body.name;
  const age = Number(req.body.age);
  const friends = req.body.friends;

  if (typeof name == "string" && !isNaN(age)) {
    newDbUser.set(id, {
      id: id,
      name: name,
      age: age,
      friends: friends,
    });

    res.json(newDbUser.get(id));
  } else {
    res.send(`ERR`);
  }
};
export const putUser = (
  req: ExpressRequest<IUserPutParams, any, IUserPutBody>,
  res: ExpressResponse<IFriend | string>
) => {
  const { id } = req.params;
  const name: String = req.body.name;
  const age = Number(req.body.age);

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    isNaN(age) ||
    !newDbUser.has(id)
  ) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }
  newDbUser.set(id, {
    id: id,
    name: name,
    age: age,
    friends: newDbUser.get(id)?.friends || new Map(),
  });
  res.json(newDbUser.get(id));
};
export const deleteUser = (
  req: ExpressRequest<IUserDeleteParams>,
  res: ExpressResponse<IUser | string>
) => {
  const { id } = req.params;

  if (!id) {
    res.send(`Поле ID обязательно`);
    return;
  }

  if (!newDbUser.delete(id)) {
    res.send(`Пользователь с ID ${id} не найден`);
    return;
  }
  res.send(`${id}`);
};
export const getUsers = (
  req: ExpressRequest,
  res: ExpressResponse<IUser[]>
) => {
  res.json(Array.from(newDbUser.values()));
  return;
};
//##############################FRIENDS################################

export const getFriends = (
  req: ExpressRequest<IFriendGetParams>,
  res: ExpressResponse<IFriend[] | string>
) => {
  const { id } = req.params;

  if (!id) {
    res.send(`Укажите ID`);
    return;
  }
  if (typeof id !== "string" || !newDbUser.has(id)) {
    res.send(`Введены неверные данные`);
    return;
  }

  const bufArr: IFriend[] = [];

  newDbUser.get(id)?.friends.forEach((friend) => {
    bufArr.push(friend);
  });

  //newDbUser.get(id)?.friends

  res.json(bufArr);
};

export const postFriend = (
  req: ExpressRequest<IFriendPostParams>,
  res: ExpressResponse<string>
) => {
  const { id, friendId } = req.params;

  const findUser = newDbUser.get(id);
  console.log(findUser);
  if (!findUser) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }

  const findFriend = newDbUser.get(friendId);
  if (!findFriend) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }

  if (id !== friendId) {
    findUser.friends.set(friendId, findFriend);
    res.send(`Добавлен друг с  ID ${friendId}`);
  } else {
    res.send(`ERR нельзя добавлять в друзья себя либо друг уже в друзьях`);
  }
};
/* export const deleteFriend = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID, friendID } = req.params;
  if (!userID) {
    res.send(`Укажите ID пользователя`);
    return;
  }
  if (!friendID) {
    res.send(`Укажите ID друга`);
    return;
  }
  const findUser = newDbUser.get(userID);

  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }

  if (!findUser.delete(userID)) {
    res.send(`Друг с ID ${friendID} удален`);
    return;
  }
  res.send(`Друг с ID ${friendID} не найден`);
}; */

/* export const postFriend_OWER_NEW = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;
  const id: String = req.body.id;
  const name: String = req.body.name;
  const age = Number(req.body.age);
  const friends: Ifriend[] = req.body.friends;

  const findUser = newDbUser.find((user) => {
    return user.id == userID;
  });
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }

  if (typeof id === "string" && typeof name === "string" && !isNaN(age)) {
    findUser.friends.push({
      id: id,
      name: name,
      age: age,
      friends: friends,
    });
    //
    res.send(`Добавлен друг с  ID ${id}`);
  } else {
    res.send(`ERR`);
  }
}; */
