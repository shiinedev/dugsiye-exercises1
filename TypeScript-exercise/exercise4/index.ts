
interface User{
    username:string;
    password:string
}

interface Admin extends User{
    email?:string
}

type userWithId = Admin & {readonly id:string}

function login (user:userWithId) : void{
    console.log(user)
}

const user:userWithId = {
username:"Ali",
password:"1234",email:
"abdi@gmail.com",
id:"hy777890"
}

user.email = "ali@gmail.com"
user.id = "098877" //Cannot assign to 'id' because it is a read-only property
login(user);
