


const incrementation = (n1, n2) => n1 + n2;
const decrementation = (n1, n2) => n1 - n2;
const multiplication = (n1, n2) => n1 * n2;
const division = (n1, n2) => n1 / n2;

function getOperationFunc(sign) {
  switch (sign) {
    case "+":
      return incrementation;
    case "-":
      return decrementation;
    case "*":
      return multiplication;
    case "/":
      return division;
    default:
      console.log("ERR");
      return null;
  }
}

module.exports = {
    incrementation,
    decrementation,
    multiplication,
    division,
    getOperationFunc
}