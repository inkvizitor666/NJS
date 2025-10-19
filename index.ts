import * as express from "express";
import { calculate } from "./main/calculate/calculate";

const app = express();
console.log("тёма жук");

const result = calculate("200*2/1*190");

app.get("/calculate", (req, res) => {
  res.send(result);
});

let dbUsers = [
  {
    id: "1",
    name: "artem",
    age: 28,
  },
  {
    id: "2",
    name: "vika",
    age: 18,
  },
];

app.get("/user/:userID/", (req, res) => {
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
});

app.post("/user", (req, res) => {
  const id = Math.ceil(Math.random() * 1000);
  const name = req.query.name;
  const age = Number(req.query.age);

  if (typeof name == "string" && !isNaN(age)) {
    dbUsers.push({
      id: String(id),
      name: name,
      age: age,
    });

    res.send(`Пользователь успешно создан ID ${id}`);
  } else {
    res.send(`ERR`);
  }
});

app.put("/user/:userID/", (req, res) => {
  const { userID } = req.params;
  const name = req.query.name;
  const age = Number(req.query.age);

  if (typeof userID == "string" && typeof name == "string" && !isNaN(age)) {
    const findUserIndex = dbUsers.findIndex((user) => {
      return user.id == userID;
    });

    if (findUserIndex != -1) {
      dbUsers[findUserIndex] = {
        id: userID,
        name: name,
        age: age,
      };

      res.send(`Пользователь с ID:${userID} успешно изменён`);
      return;
    }
    res.send(`Пользователь с ID:${userID} не найден`);
  }
});

app.delete("/user/:userID/", (req, res) => {
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
});

app.get("/users", (req, res) => {
  res.json(dbUsers);
  return;
});

//###########################################

app.get("/calculate", (req, res) => {
  const mathematicalExpression = String(req.query.mathExp);

  if (mathematicalExpression) {
    res.send(`ERROR mathematicalExpression: ${mathematicalExpression}`);
    return;
  }
  const resultMathematicalExpression = calculate(mathematicalExpression);
  res.send(`Пользователь с ID ${resultMathematicalExpression} не найден`);
});

//###########################################
app.listen(3000);
console.log();
