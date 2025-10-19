import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "../../node_modules/@types/express";

let dbUsers = [
  {
    id: "1",
    name: "artem",
    age: 28,
    friends: [{ id: "2", name: "vika", age: 18 }],
  },
  {
    id: "2",
    name: "vika",
    age: 18,
    friends: [],
  },
];

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
