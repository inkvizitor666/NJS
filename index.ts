import * as express from "express";
import { calculate } from "./main/calculate/calculate";
import {
  deleteFriend,
  deleteUser,
  getFriends,
  getUserById,
  getUsers,
  postFriend,
  postUser,
  putUser,
} from "./main/user/api";

const app = express();
app.use(express.json());
//###################USER####################
app.get("/user/:userID/", getUserById);
app.post("/user", postUser);
app.put("/user/:userID/", putUser);
app.delete("/user/:userID/", deleteUser);
app.get("/user", getUsers);
//#################FRIENDS####################
app.get("/user/:userID/friends/", getFriends);
app.delete("/user/:userID/friends/:friendID", deleteFriend);
app.post("/user/:userID/friends/:friendID", postFriend);
//################CALCULETE###################
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
console.log("МЫ СТАРТАНУЛИ!");
