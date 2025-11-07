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
  getPage,
  getCalculate,
} from "./main/user/api";

const app = express();
app.use(express.json());
//###################USER####################
app.get("/user/:id/", getUserById);
app.post("/user", postUser);
app.put("/user/:id/", putUser);
app.delete("/user/:id/", deleteUser);
app.get("/user", getUsers);
//#################FRIENDS####################
app.get("/user/:id/friends/", getFriends);
app.post("/user/:id/friends/:friendId", postFriend);
app.delete("/user/:id/friends/:friendId", deleteFriend);
//################CALCULETE###################
app.get("/calculate/:mathematicalExpression", getCalculate);
//##################PAGES#####################
app.get("/page", getPage);

//############################################
app.listen(3000);
console.log("НУ ЧЕ, ПОХГНУЛИ! \n");
