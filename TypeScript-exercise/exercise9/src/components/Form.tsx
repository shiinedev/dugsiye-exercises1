import { useState } from "react"

interface FormProps{
    onSubmit: (email:string) => void

}

const Form = ({onSubmit}:FormProps) => {

    const [email,setEmail] = useState("");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        onSubmit(email)

    }
  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      placeholder="email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />

      <button>Submit</button>
    </form>
  )
}

export default Form
