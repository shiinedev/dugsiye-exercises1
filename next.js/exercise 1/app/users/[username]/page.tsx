

interface UserProps{
    params:{
        username:string
    }
}

const UserPage = ({params}:UserProps) => {
  return (
    <div>
    <h1> Welcome , {params.username}</h1>
    </div>
  )
}

export default UserPage
