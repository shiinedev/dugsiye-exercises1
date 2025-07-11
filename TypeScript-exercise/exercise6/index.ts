enum Role{
    SuperAdmin = "superAdmin",
    Moderator = "moderator",
    Viewer = "viewer"
}

const canEdit = (role:Role) =>{
    if(role == Role.Viewer){
        return false
    }else{
        return true
    }
}

console.log( canEdit(Role.Moderator));
console.log( canEdit(Role.Viewer));



const Button = document.createElement("button") as HTMLButtonElement;

Button.disabled = true;