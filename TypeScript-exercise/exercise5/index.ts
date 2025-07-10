
function echo<T> (input:T):T {
    return input
}

console.log(echo(20));

console.log(echo("Abdi Ali"));
 
console.log(echo({name:"Ali",age:20}));
 
console.log(echo([10,20,30,]));


interface APiResult<T>{
    status:string,
    data:T
}

const result:APiResult<string> =  {
    status:"pending",
    data:"Abdi"
}
console.log("result: ",result);

const user:APiResult<{id:number,name:string}> = {
    status:"completed",
    data:{id:1,name:"ali"}
}
console.log("user: ",user);


function first<T>(items:T[]):T{

    return items[0]
}

const names:string[] = ["farax","Amiin","Ali"];

const numbers :number[]  = [20,30,60,50];

const users:{}[] =  [{id:1, name:"Ali"},{id:2, name:"faarah"},{id:4, name:"Amin"}] ;

console.log(first(names));
console.log(first(numbers));
console.log(first(users));
