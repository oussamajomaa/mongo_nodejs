const Book = require('../models/book')

const create = (req,res) => {
    res.render('book/add-book', { title: 'Add Book', url: req.url })
}

const add = (req,res) => {
    const book = new Book(req.body)
    book.save((err,data) => {
        if (!err) res.redirect('/')
        else console.log(err)
    })
}

const allBooks = (req, res) => {
    Book.find((err,books) => {
        if (!err) 
        // res.send(books)
           res.render('book/index', { title: 'Home', books, url: req.url })
        else console.log(err)
    })
}

const oneBook = (req, res) => {
    const id = req.params.id
    Book.findById(id)
        .then(book => res.render('book/details', {title: "details", book, url:""}))
        .catch(err => console.log(err))
}

const remove = (req, res) => {
    const id = req.params.id
    Book.findByIdAndDelete(id)
        .then(result =>  res.redirect('/'))
        .catch(err => console.log(err))
}

const update = (req,res) => {
    const id = req.params.id
    Book.findByIdAndUpdate(id,req.body,(err,data) =>{
        if (!err) res.redirect(`/`)
        else console.log(err)
    })
}

module.exports = { create, add, allBooks, oneBook, remove, update }