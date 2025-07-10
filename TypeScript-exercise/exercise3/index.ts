
// get fullName
function getFullname(first: string, last: string): string {
  return first + last;
}

console.log(getFullname("Abdi", "Ali"));


// register User
function registerUser(username:string, isAdmin?:boolean , language:string = 'en'):void{
    console.log({username,isAdmin,language});
}

registerUser("Abdi",true);


//Average

function average(...scores:number[]):number {
    let sum:number = 0
    for(let score of scores){
        sum += score
    }

    return sum/scores.length
}


console.log(average(50,60,40,90));


