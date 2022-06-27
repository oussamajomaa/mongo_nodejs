const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create a new instance of Schema object and define the structure of document
const bookSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
    },
    publication_date: {
        type: String
    },
    publication_place: {
        type: String
    }
}, { timestamps: true})

// Create a model
// The first argument of the model and the seconde is the name of schema
const Book = mongoose.model('Book', bookSchema)

// export the model so we can use elsewhere in the project
module.exports = Book