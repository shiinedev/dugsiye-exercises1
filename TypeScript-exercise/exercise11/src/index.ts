import express from 'express'
import goodby from './routes/goodby.router'

const app = express();

app.use(express.json());

app.use("/goodby",goodby)

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})