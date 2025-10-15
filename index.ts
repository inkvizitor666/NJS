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

  res.send(`Имя ${findUser?.name}  возраст ${findUser?.age}`);
});

app.post("/user", (req, res) => {


const id = Math.ceil(Math.random() * 1000);
const name = req.query.name;
const age = Number(req.query.age);

if(typeof name == 'string' && !isNaN(age))
{

  dbUsers.push({
    id: String(id),
    name: name,
    age: age
  })

  res.send(`Пользователь успешно создан ID ${id}`);
}
else
{
  res.send(`ERR`);
}

});

app.put("/user",(req, res) => {

const id = req.query.id;
const name = req.query.name;
const age = Number(req.query.age);

if(typeof id == "string" && typeof name =="string" && !isNaN(age) )
{
   const findUserIndex = dbUsers.findIndex((user) => {
    return user.id == id;



  });

  if (findUserIndex != -1) {

    dbUsers[findUserIndex] = {
      id: id,
      name: name,
      age: age
    }

    res.send(`Пользователь с ID:${id} успешно изменён`);
    return;
  }
  else{
    res.send(`Пользователь с ID:${id} не найден`);

  }

}

})

app.listen(3000);

console.log();
