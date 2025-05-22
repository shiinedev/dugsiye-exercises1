const express = require("express");

const app = express();

app.use(express.json())

let books = [
    {
        id:1,
        title:"keep building",
        author:"john"

    },
    {
        id:2,
        title:"go for walk",
        author:"james"
    }
]

// get all books
app.get("/",(req,res) =>{
    res.json(books);
})

// get single book with id

app.get("/books/:id",(req,res) =>{

    const book = books.find(b => b.id == req.params.id);

    if(!book) return res.status(401).send("book not found");

    res.json(book);
})

// create new book

app.post("/books",(req,res) =>{
    
    const bookData = req.body;

    if( !bookData.title || !bookData.author) return res.send("please fill title and author")

    const newBook = {
        id:books.length + 1,
        title:bookData.title,
        author:bookData.author
    }

    books.push(newBook);

    res.status(201).json(`created new book`)
})


// update book

app.put("/books/:id",(req,res)=>{

   const book = books.find(b => b.id == req.params.id);

   const bookData = req.body;

  if(!book) return res.status(401).send("book not found");

   book.title = bookData.title;
   book.author = bookData.author;
   res.json(`student ${book.id} updated`)
})

// delete book

app.delete("/books/:id",(req,res)=>{

     const book = books.find(b => b.id == req.params.id);

     if(!book) return res.status(401).send("book not found");

     books = books.filter(b => b.id != book.id);

     res.send(`user ${book.id} delete successfully!`)

})

app.listen(4000, ()=>{
    console.log("server is running on http://localhost:300");
    
})