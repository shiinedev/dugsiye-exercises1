const Book = require("../models/Book")


exports.getBooks = async (req,res) =>{
    const books = await Book.find();
    res.json(books);
}

exports.getBookInfo = async (req,res) =>{

    const book = await Book.findById(req.params.id);

    if(!book) return res.status(404).send("book not found")

    res.json(book)
}

exports.createBook =async (req,res) =>{
    const {title,author} = req.body;
    if(!title || !author) return res.send("title and author are require please fill");
    const newBook = new Book(req.body)
    const saved = await newBook.save();

    res.status(201).json(saved)
}

exports.updateBook = async (req,res) =>{
    const {id} = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true});

        if(!updatedBook) return res.status(404).send("book not found")
        
        res.json(updatedBook)

    } catch (error) {
        res.status(500).send("server error : ",error)
    }
}


exports.deleteBook = async (req,res) =>{
    const {id} = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) return res.status(404).send("book not found")
        
        res.send(`book ${id} delete successfully`)
    } catch (error) {
        res.status(500).send("server error: ",error)
    }
}