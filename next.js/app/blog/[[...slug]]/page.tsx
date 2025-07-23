
interface BlogProps{
    params:{
        slug?:string[]
    }
}

const blog = ({params}:BlogProps) => {
  return (
    <div>
      Blog {params.slug?.join("/")}
    </div>
  )
}

export default blog
