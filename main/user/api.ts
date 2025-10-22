import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "../../node_modules/@types/express";
import { Ifriend, IUser } from "./type";

let dbUsers: IUser[] = [
  {
    id: "1",
    name: "artem",
    age: 28,
    friends: [
      { id: "2", name: "vika", age: 18, friends: [] },
      { id: "5", name: "nina1", age: 50, friends: [] },
      { id: "6", name: "nina2", age: 50, friends: [] },
      { id: "7", name: "nina3", age: 50, friends: [] },
      { id: "8", name: "nina4", age: 50, friends: [] },
      { id: "9", name: "nina5", age: 50, friends: [] },
    ],
  },
  {
    id: "2",
    name: "vika",
    age: 18,
    friends: [],
  },
  {
    id: "3",
    name: "stas",
    age: 40,
    friends: [],
  },
];

const newDbUser = new Map<string, IUser>();
newDbUser.set("99", { id: "99", name: "nina5", age: 50, friends: [] });
newDbUser.set("98", { id: "99", name: "nina10", age: 50, friends: [] });
console.log(Array.from(newDbUser.values()));

//##############################USER################################

export const getUserById = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;

  if (!userID) {
    res.send(`ID поле АБЯЗАТИЛЬНА!!!!`);
    return;
  }

  const findUser = newDbUser.get(userID);
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }

  res.json(findUser);
};
export const postUser = (
  req: ExpressRequest<any, any, Omit<IUser, "id">>,
  res: ExpressResponse
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
export const putUser = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;
  const name: String = req.body.name;
  const age = Number(req.body.age);
  const friends = req.body.friends;

  if (
    typeof userID !== "string" ||
    typeof name !== "string" ||
    isNaN(age) ||
    !newDbUser.has(userID)
  ) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }
  newDbUser.set(userID, {
    id: userID,
    name: name,
    age: age,
    friends: friends,
  });
  res.json(newDbUser.get(userID));
};
export const deleteUser = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;

  if (!userID) {
    res.send(`Поле ID обязательно`);
    return;
  }

  if (!newDbUser.delete(userID)) {
    res.send(`Пользователь с ID ${userID} не найден`);
    return;
  }
  res.send(`${userID}`);
};
export const getUsers = (req: ExpressRequest, res: ExpressResponse) => {
  res.json(Array.from(newDbUser.values()));
  return;
};
//##############################FRIENDS################################

export const getFriends = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;

  if (!userID) {
    res.send(`Укажите ID`);
  }
  const findUser = dbUsers.find((user) => {
    return user.id == userID;
  });
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }
  res.json(findUser.friends);
};

export const deleteFriend = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID, friendID } = req.params;
  if (!userID) {
    res.send(`Укажите ID пользователя`);
    return;
  }
  if (!friendID) {
    res.send(`Укажите ID друга`);
    return;
  }
  const findUser = dbUsers.find((user) => {
    return user.id == userID;
  });
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }

  const friendIndex = findUser.friends.findIndex(
    (user) => user.id === friendID
  );
  if (friendIndex === -1) {
    res.send(`Не предусмотренный ндекс массива друзей  ${friendIndex}`);
  }

  if (findUser) {
    findUser.friends.splice(friendIndex, 1);
    res.send(`Друг с ID ${friendID} удален`);
    return;
  }
  res.send(`Друг с ID ${friendID} не найден`);
};

/* export const postFriend_OWER_NEW = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;
  const id: String = req.body.id;
  const name: String = req.body.name;
  const age = Number(req.body.age);
  const friends: Ifriend[] = req.body.friends;

  const findUser = dbUsers.find((user) => {
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

export const postFriend = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID, friendID } = req.params;

  const findUser = dbUsers.find((user) => {
    return user.id == userID;
  });
  const findFriend = dbUsers.find((user) => {
    return user.id == friendID;
  });
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }
  const userIndex = dbUsers.findIndex((user) => user.id === userID);
  if (userIndex === -1) {
    res.send(`Не предусмотренный ндекс массива друзей  ${userIndex}`);
  }

  if (!findFriend) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }
  const friendIndex = dbUsers.findIndex((user) => user.id === friendID);
  if (friendIndex === -1) {
    res.send(`Не предусмотренный ндекс массива друзей  ${friendIndex}`);
  }
  const findClone = findUser.friends.find((user) => {
    return user.id == friendID;
  });

  if (userID !== friendID && !findClone) {
    findUser.friends.push(findFriend);
    res.send(`Добавлен друг с  ID ${friendID}`);
  } else {
    res.send(`ERR нельзя добавлять в друзья себя либо друг уже в друзьях`);
  }
};
