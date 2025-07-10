const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();
const bookRoutes = require("./routes/books")


//middle where
app.use(express.json())

// routes

app.use("/books",bookRoutes)



// connect to mongo db
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✅ mongodb connected locally"))
.catch((err) => console.log("❌ connection error",err))


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})