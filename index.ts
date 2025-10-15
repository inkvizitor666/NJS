import * as express from 'express'
import { calculate } from "./main/calculate/calculate";

const app = express()
console.log("тёма жук");

const result = calculate('200*2/1*190');



app.get('/calculate', (req, res) => {
  res.send(result);
});



app.get('/hello', (req, res) => {
    res.send('Hello World3');
});

app.listen(3000)

console.log();