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

    let argsRedon = [];
    let result = args[0];

    for(let i = 1; i<args.length;i=i+2)
    {
        const sign = args[i] 
        const buf = args[i+1]
        const currentOperation =  getOperationFunc(sign);

        if(sign == '*' || sign == '/' )
        {
            const buf2 = args[i-1] 
            argsRedon[argsRedon.length-1]=currentOperation(buf2,buf);
        }
        else
        {
            if(i == 1)
            {
                argsRedon.push(args[0]);
            }
            argsRedon.push(sign,buf);
        }
        //console.log(i);
    }

console.log(argsRedon);

result = argsRedon[0];

    for(let i = 1; i<argsRedon.length;i=i+2)
    {
        const sign = argsRedon[i] 
        const buf = argsRedon[i+1]
        const currentOperation =  getOperationFunc(sign);
        if(currentOperation)
        {
            result = currentOperation(result,buf);
        }
    }
    return result;
}

console.log(calculate(4,'-',6,'*',4,'-',1,'+',2,'*',6,));


