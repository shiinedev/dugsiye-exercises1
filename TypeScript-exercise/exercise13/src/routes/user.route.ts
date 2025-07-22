import express from 'express'
import { handleCreateUser, handleLoginUser } from '../controller/user.controller';

const route = express.Router();

route.post("/register",handleCreateUser)
route.post("/login",handleLoginUser)

export default route