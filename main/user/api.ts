import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "../../node_modules/@types/express";
import { Ifriend, IUser } from "./type";

let dbUsers = [
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

//##############################USER################################

export const getUserById = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;

  if (!userID) {
    res.send(`ID поле АБЯЗАТИЛЬНА!!!!`);
    return;
  }

  const findUser = dbUsers.find((user) => {
    return user.id == userID;
  });
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }

  res.send(`Имя ${findUser?.name}  возраст ${findUser?.age}`);
};
export const postUser = (req: ExpressRequest, res: ExpressResponse) => {
  const id = Math.ceil(Math.random() * 1000);
  const name = req.body.name;
  const age = Number(req.body.age);
  const friends = req.body.friends;

  if (typeof name == "string" && !isNaN(age)) {
    dbUsers.push({
      id: String(id),
      name: name,
      age: age,
      friends: friends,
    });

    res.send(`Пользователь успешно создан ID ${id}`);
  } else {
    res.send(`ERR`);
  }
};
export const putUser = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;
  const name = req.body.name;
  const age = Number(req.body.age);
  const friends = req.body.friends;

  if (typeof userID == "string" && typeof name == "string" && !isNaN(age)) {
    const findUserIndex = dbUsers.findIndex((user) => {
      return user.id == userID;
    });

    if (findUserIndex != -1) {
      dbUsers[findUserIndex] = {
        id: userID,
        name: name,
        age: age,
        friends: friends,
      };

      res.send(`Пользователь с ID:${userID} успешно изменён`);
      return;
    }
    res.send(`Пользователь с ID:${userID} не найден`);
  }
};
export const deleteUser = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;

  const findUser = dbUsers.find((user) => {
    return user.id == userID;
  });

  if (findUser) {
    const bufDbUser = dbUsers.filter((bufId) => bufId.id !== userID);
    dbUsers = bufDbUser;
    res.send(`Пользователь с ID ${userID} удален`);
    return;
  }
  res.send(`Пользователь с ID ${userID} не найден`);
};
export const getUsers = (req: ExpressRequest, res: ExpressResponse) => {
  res.json(dbUsers);
  return;
};
//##############################FRIENDS################################

//реализовать методы post delete get,
// post- добавить друга к пользователю по ID ,
// delete - удалить друга по ID ,

export const getFriends = (req: ExpressRequest, res: ExpressResponse) => {
  const { userID } = req.params;

  if (!userID) {
    res.send(`Укажите ID`);
    return;
  }
  const findUser = dbUsers.find((user) => {
    return user.id == userID;
  });
  if (!findUser) {
    res.send(`Пользователь с ID:${userID} не найден`);
    return;
  }

  const userIndex = dbUsers.findIndex((user) => user.id === userID);

  res.send(
    `У пользователя ${userID} => : ${res.json(dbUsers[userIndex].friends)}`
  );
  return;
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
  const userIndex = dbUsers.findIndex((user) => user.id === userID);

  const friendIndex = findUser.friends.findIndex(
    (user) => user.id === friendID
  );

  if (findUser) {
    const bufDbUser = dbUsers[userIndex].friends.filter(
      (findUsers: Ifriend) => {
        findUsers.friends[friendIndex].id !== friendID;
        console.log(findUsers.friends[friendIndex]);
      }
    );
    dbUsers[userIndex].friends = bufDbUser;
    res.send(`Друг с ID ${friendID} удален`);
    return;
  }
  res.send(`Друг с ID ${friendID} не найден`);
};
