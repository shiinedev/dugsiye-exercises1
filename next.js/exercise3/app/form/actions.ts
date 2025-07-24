"use server"

type FormState =  {
    message:string,
    error:string

}


export async function requiredField  ( prevState: FormState,formdata:FormData): Promise<FormState> {
      const email = formdata.get("email");
      const password:string = formdata.get("password")?.toString();
      
      if(email === "" || password == ""){
      return {message:"", error:"email and password are required"}
      }
      if(password?.length < 6){
        return {message:"", error:"password at least 6 characters"}
        }

      return {message:"Thanks for submitting", error:""}
}

export async function greet(prevState: FormState,formdata:FormData): Promise<FormState> {
    const firstName = formdata.get("firstName");
    const lastName = formdata.get("lastName");
    
    if(firstName === "" || lastName == ""){
    return {message:"", error:"first name and last name are required"}
    }
  

    return {message:`Hello, ${firstName} ${lastName} `, error:""}
}


