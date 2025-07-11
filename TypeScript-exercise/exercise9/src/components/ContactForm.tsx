import React, { useState } from "react"

interface ContactData{
   name: string; 
   email: string 
}

interface ContactProps{
  onSubmit(data:ContactData):void
}

const ContactForm = ({onSubmit}:ContactProps) => {

  const [formData,setFormData] = useState<ContactData>({
    name:"",
    email:""
  });

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    onSubmit(formData)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{

    const {name,value} = e.target;

    setFormData({...formData, [name]:value})

  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Contact Form</h1>
      <input type="text" name="name" placeholder="enter your Name" value={formData.name} onChange={handleChange} />
      <input type="text" name="email" value={formData.email} placeholder="enter your email" onChange={handleChange} />
      <button >submit</button>
    </form>
  )
}

export default ContactForm
