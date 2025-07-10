const express = require('express');
const { getBooks, getBookInfo, createBook, updateBook, deleteBook } = require('../controllers/books');

const router = express.Router();

router.get("/",getBooks);
router.get("/:id",getBookInfo);
router.post("/",createBook);
router.put("/update/:id",updateBook);
router.delete("/delete/:id",deleteBook);


module.exports = router