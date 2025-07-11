
// interface UserProps{
//     username:string;
//     isPremium:boolean
// }


type UserProps = {
    username:string;
    isPremium:boolean
}


const Welcome = ({username,isPremium}:UserProps) => {
  return (
    <div>
      <h1>Welcome ,{isPremium ? ` ${username}` : "Guest"}</h1>
    </div>
  )
}

export default Welcome
