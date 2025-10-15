import * as express from "express";
import { calculate } from "./main/calculate/calculate";

const app = express();
console.log("тёма жук");

const result = calculate("200*2/1*190");

app.get("/calculate", (req, res) => {
  res.send(result);
});

//https://www.tema-juk.yes/calculate/?name=anatoliy&age=12

/* const query = {
  name: 'anatoliy',
  age: 12
}  */
const dbUsers = [
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

app.get("/user", (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.send(`ID поле АБЯЗАТИЛЬНА!!!!`);
    return;
  }

  const findUser = dbUsers.find((user) => {
    return user.id == id;
  });

  if (!findUser) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }

  res.send(`Имя ${findUser.name}  возраст ${findUser.age}`);
});

app.post("/user", (req, res) => {
  const id = Math.ceil(Math.random() * 1000);
  const name = req.query.name;
  const age = Number(req.query.age);

  if (typeof id != "number" || typeof name != "string" || isNaN(age)) {
    res.send(`ERR`);
    return;
  }

  dbUsers.push({
    id: String(id),
    name: name,
    age: age,
  });

  res.send(`Пользователь успешно создан ID ${id}`);
});

app.put("/user", (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const age = Number(req.query.age);

  if (typeof id != "string" || typeof name != "string" || isNaN(age)) {
    res.send(`ERR`);
    return;
  }

  const findUserIndex = dbUsers.findIndex((user) => {
    return user.id == id;
  });

  if (findUserIndex == -1) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }

  dbUsers[findUserIndex] = {
    id: id,
    name: name,
    age: age,
  };

  res.send(`Пользователь с ID:${id} успешно изменён`);
});

const USERS: User[] = [
  {
    id: "1",
    name: "artem",
    age: 28,
    books: ["1"],
  },
  {
    id: "2",
    name: "vika",
    age: 18,
    books: ["1", "2"],
  },
];
interface User {
  id: string;
  name: string;
  age: number;
  books: string[];
}

const USERS_HELPERS = {
  users: USERS,
  addUser: (user: Omit<User, "id">) => {
    const id = String(Math.ceil(Math.random() * 1000));
    USERS_HELPERS.users.push({ ...user, id });
  },
  getUsers: () => {
    return USERS_HELPERS.users;
  },
  getUserById: (id: string) => {
    return USERS_HELPERS.users.find((user) => user.id === id);
  },
  updateUser: (id: string, user: Omit<User, "id">) => {
    const findUserIndex = USERS_HELPERS.users.findIndex((user) => user.id === id);
    if (findUserIndex === -1) {
      throw new Error("User not found");
    }
    USERS_HELPERS.users[findUserIndex] = { ...user, id };
  },
};

class UsersHelper {
  private users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
  private generateId() {
    return String(Math.ceil(Math.random() * 1000));
  }
  public addUser(user: Omit<User, "id">) {
    const id = this.generateId();
    this.users.push({ ...user, id });
  }
  public getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
  public getUsers() {
    return this.users;
  }
}

const usersHelper = new UsersHelper(USERS);

console.log(usersHelper.getUserById("1"));

const BOOKS = [
  {
    id: "1",
    title: "book1",
  },
  {
    id: "2",
    title: "book2",
  },
];
//map
//find
//forEach
//filter
//slice
const USERS_WITH_BOOKS = USERS.map((user) => {
  return {
    ...user,
    books: user.books.map((bookId) => {
      return BOOKS.find((book) => book.id === bookId);
    }),
  };
});

console.log(JSON.stringify(Object.keys(USERS_WITH_BOOKS[0]), null, 2));
/* const USERS_WITH_BOOKS = [
  {
    id: "1",
    name: "artem",
    age: 28,
    books: [{ id: "1", title: "book1" }],
  },
  {
    id: "2",
    name: "vika",
    age: 18,
    books: [
      { id: "1", title: "book1" },
      { id: "2", title: "book2" },
    ],
  },
]; */

app.listen(3001);
