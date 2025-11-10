import { Request as ExpressRequest, Response as ExpressResponse } from "../../node_modules/@types/express";
import { newDbUser } from "./base";
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
  IPageGetParams,
  ICalculateParams,
} from "./type";
import { calculate } from "../calculate";
import e = require("../../node_modules/@types/express");

//##############################USER################################

export const getUserById = (req: ExpressRequest<IUserGetParams>, res: ExpressResponse<IUser | string>) => {
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
export const postUser = (req: ExpressRequest<IUserPostBody>, res: ExpressResponse<IUser | string>) => {
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

  if (typeof id !== "string" || typeof name !== "string" || isNaN(age) || !newDbUser.has(id)) {
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
export const deleteUser = (req: ExpressRequest<IUserDeleteParams>, res: ExpressResponse<IUser | string>) => {
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
export const getUsers = (req: ExpressRequest, res: ExpressResponse<IUser[]>) => {
  res.json(Array.from(newDbUser.values()));
  return;
};
//##############################FRIENDS################################

export const getFriends = (req: ExpressRequest<IFriendGetParams>, res: ExpressResponse<IFriend[] | string>) => {
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

export const postFriend = (req: ExpressRequest<IFriendPostParams>, res: ExpressResponse<string>) => {
  const { id, friendId } = req.params;

  const findUser = newDbUser.get(id);
  if (!findUser) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }

  const findFriend = newDbUser.get(friendId);
  if (!findFriend) {
    res.send(`Пользователь с ID:${friendId} не найден`);
    return;
  }

  if (id !== friendId && !findUser.friends.get(friendId)) {
    const { friends, ...friend } = findFriend;
    findUser.friends.set(friendId, friend);
    res.send(`Добавлен друг с  ID ${friendId}`);
  } else {
    res.send(`ERR нельзя добавлять в друзья себя либо друг уже в друзьях`);
  }
};

export const deleteFriend = (req: ExpressRequest, res: ExpressResponse) => {
  const { id, friendId } = req.params;
  if (!id) {
    res.send(`Укажите ID пользователя`);
    return;
  }
  if (!friendId) {
    res.send(`Укажите ID друга`);
    return;
  }
  const findUser = newDbUser.get(id);

  if (!findUser) {
    res.send(`Пользователь с ID:${id} не найден`);
    return;
  }
  console.log(findUser);
  if (findUser.friends.delete(friendId)) {
    res.send(`Друг с ID ${friendId} удален`);
    return;
  }
  res.send(`Друг с ID ${friendId} не найден`);
};

//############################CALCULATE###############################
export const getCalculate = (req: ExpressRequest, res: ExpressResponse) => {
  const { mathematicalExpression } = req.query;
  console.log(mathematicalExpression);
  if (typeof mathematicalExpression !== "string") {
    res.send(`ERROR mathematicalExpression: ${mathematicalExpression}`);
    return;
  }
  const resultMathematicalExpression = calculate(mathematicalExpression);
  res.send(`${resultMathematicalExpression}`);
};
//##############################PAGES################################
export const getPage = (req: ExpressRequest<IPageGetParams>, res: ExpressResponse<IUser[] | string>) => {
  const { numPage, quantityElements } = req.query;

  console.log("numPage:  ", numPage, "quantityElements:  ", quantityElements);
  if (!numPage) {
    res.send(`введен не корректный номер страницы не : ${numPage}`);
  }
  if (!quantityElements) {
    res.send(`введено не корректное колличество элементов : ${numPage}`);
  }
  let beginningDesiredPage: number = Number(quantityElements) * Number(numPage) - Number(quantityElements) + 1; //первый элемент нужной страницы
  console.log(beginningDesiredPage);
  let bufArr = Array.from(newDbUser.values());
  if (newDbUser.size % Number(quantityElements) != 0) {
    bufArr = bufArr.filter((obj) => {
      return (
        Number(obj.id) >= beginningDesiredPage && Number(obj.id) <= beginningDesiredPage + Number(quantityElements) - 1
      );
    });
    res.json(bufArr);
    return;
  }
  if (Number(quantityElements)! <= 1) {
    res.json(bufArr.filter((obj) => Number(obj.id) == beginningDesiredPage));
    return;
  }
  if (newDbUser.size % Number(quantityElements) == 0) {
    bufArr = bufArr.filter((obj) => {
      return Number(obj.id) >= beginningDesiredPage;
    });
    res.json(bufArr);
  }

  res.json(`ERR     ШО ТЫ ОТ МЕНЯ ХОЧЕШЬ!?!?!?!    `);
  return;
};
