import { Request as ExpressRequest, Response as ExpressResponse } from "../../node_modules/@types/express";
import { Ifriend, IUser } from "./type";
// TODO: тут нужно использовать IUser для типизации dbUsers
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
  // TODO: res.send и res.json оба метода отправки, ты вначале говоришь отправь данные через send а потом снова но уже через json, оставь только json и убери преписку "У пользователя ${userID} => :", ты бек шли сырые данные, попросили список друзей ты только их и должен отправить)
  res.send(`У пользователя ${userID} => : ${res.json(findUser.friends)}`);
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

  const friendIndex = findUser.friends.findIndex((user) => user.id === friendID);

  if (findUser) {
    //TODO: если типизировать dbUsers, то TS выведит сам тип findUsers
    //TODO: Переименнуй bufDbUser по смыслу, допустим friendsWithoutDeletFriend или newFriendsArray...
    const bufDbUser = findUser.friends.filter(
      // TODO: ты итерируешься по массиву friends, его фильтруешь, аргумент луше назвать friend, а не findUsers
      (findUsers: Ifriend) => {
        //TODO: ты запутался и пошел фильтровать не то что нужно, друзья-друзей))
        findUsers.friends[friendIndex]?.id !== friendID;
        console.log(findUser.friends[friendIndex]?.id);
      }
    );
    // TODO лучше менять массив друзей
    findUser.friends = bufDbUser;
    res.send(`Друг с ID ${friendID} удален`);
    return;
  }
  res.send(`Друг с ID ${friendID} не найден`);
};
// Прочитай про статусы http (404, 200, 204, 400), и попробуй добавить их во все поинты, через метод res.status
