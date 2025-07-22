import { Document } from "mongoose"

export interface IUser extends Document{
    username?:string,
    email:string,
    password:string
}

export type registerData = Omit<IUser,"createdAt, _id">

export type loginData = {
    email:string,
    password:string
}


export type loginResponse = Omit<IUser,"password">