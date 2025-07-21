import express from 'express'
import userRoutes from "./routes/user.routes"
const app = express();

app.use(express.json());

app.use('/users',userRoutes)


app.listen(6000,() =>{
    console.log("server is running on  6000");  
});

