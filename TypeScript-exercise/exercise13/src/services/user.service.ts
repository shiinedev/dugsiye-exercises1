import User from "../models/User.model";
import { IUser, loginData, loginResponse, registerData } from "../types/user";
import bcrypt from "bcryptjs";

export async function createUser(data: registerData): Promise<IUser> {

  const { email,password } = data;

  if(!email || !password) return {message:"email and password are required"} as any

  const exist = await User.findOne({ email });
  if(exist) return {message:"user al ready exists"} as any

  const user = await User.create(data);

  await user.save();

  return user;
}

export async function loginUser(data: loginData): Promise<loginResponse> {
  const { email, password } = data;

  if (!email || !password) {
    return { message: "email and password are required" } as any;
  }
  const user = await User.findOne({ email });
  
  if (!user || !await bcrypt.compare(password, user.password)) {
     return { message: "invalid credentials" } as any;
  }
   

  user.password = "" 

  return user;
}
