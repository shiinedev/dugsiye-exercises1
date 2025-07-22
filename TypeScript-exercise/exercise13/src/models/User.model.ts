
import mongoose, {Schema} from "mongoose"
import { IUser } from "../types/user";
import bcrypt  from "bcryptjs";




const userSchema = new Schema<IUser>({
    username:String,
    email:String,
    password:String
});

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    const salt = 12;
    this.password = await bcrypt.hash(this.password,salt)
})


const User  = mongoose.model<IUser>("User",userSchema);

export default User