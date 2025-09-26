const incrementation = (n1,n2) => n1 + n2;
const decrementation = (n1,n2) => n1 - n2;
const multiplication = (n1,n2) => n1 * n2;
const division = (n1,n2) => n1 / n2;

function getOperationFunc(sign)
{
        switch(sign)
        {
        case '+':
            return incrementation;
        case '-':
            return decrementation;
        case '*':
            return multiplication;
        case '/':
            return division;
        default:
             console.log('ERR');
             return null;
        }
}

function calculate (...args)
{

    console.log(args);

    let result = args[0];

    for(let i = 1; i<args.length;i=i+2)
    {
        const sign = args[i] 
        const buf = args[i+1]
        const currentOperation =  getOperationFunc(sign);
        if(currentOperation)
        {
            result = currentOperation(result,buf);
        }
        console.log(i);
    }


    return result;
}

console.log(calculate(4,'-',6,'*',4,'-',1,'+',7));


