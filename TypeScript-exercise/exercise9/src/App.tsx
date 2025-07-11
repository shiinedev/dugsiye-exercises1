import AgeForm from "./components/AgeForm";
import ContactForm from "./components/ContactForm";
import Form from "./components/Form";


function App() {
  
  const handleFormSubmit = (data:string) =>{
      console.log(data);
      
  }
  const handleSubmitAgeForm = (age:number) =>{
    console.log(age);
    
  }
  const handleSubmitContactForm = (data:{name:string, email:string}) =>{
    console.log(data);
    
  }

  return (
    <>
    <Form onSubmit={handleFormSubmit} />
    <AgeForm onSubmit={handleSubmitAgeForm}  />
    <ContactForm onSubmit={handleSubmitContactForm} />
    </>
  )
}

export default App
