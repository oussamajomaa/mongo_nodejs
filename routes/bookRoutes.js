const express = require('express')
const router = express.Router()

// Import controller functions
const bookController = require('../controller/bookController')

// import data model
const Book = require('../models/book')


// creat book object
router.get('/books/new', bookController.create)

// add book
router.post('/books', bookController.add)

// get all books
router.get('/books', bookController.allBooks)

// get one book (book's details)
router.get('/books/:id', bookController.oneBook)

// delete one book
router.get('/books/delete/:id', bookController.remove)

// update one book
router.post('/books/update/:id', bookController.update)


module.exports = router

