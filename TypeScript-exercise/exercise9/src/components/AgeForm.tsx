import { useState } from "react";

interface AgeProps{

    onSubmit(age:number) : void
}

const AgeForm = ({onSubmit}:AgeProps) => {

    const [age,setAge] = useState<number>(0);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const age = parseInt(e.target.value)
        setAge(age)
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        onSubmit(age)
    }

  return (
     <form onSubmit={handleSubmit}>
        <h1>Age Form</h1>
      <input 
      type="number" 
      placeholder="age" 
      value={age} 
      onChange={handleChange} />

      <button disabled={age < 18}>Submit</button>
    </form>
  )
}

export default AgeForm
