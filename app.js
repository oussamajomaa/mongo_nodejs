// CREATE EXPRESS APP

const express = require('express')

// create instance of express app
const app  = express()

// lesten for requests
app.listen(3000)

app.get('/', (req,res) => {
    // send html code
    // res.send('<h1>HOME</h1>')

    // send an html code
    res.sendFile('./public/index.html', { root: __dirname})
})

app.get('/about', (req,res) => {
    // res.send('<h1>ABOUT</h1>')

    // send an html code
    res.sendFile('./public/about.html', { root: __dirname})
})

// redirects
app.get('/about-me', (req,res) => {
    res.redirect('/about')
})

// 404 page ... method use to create middleware -- at the end of code -- 
// this function will fire when no route mathc
app.use((req,res) => {
    // res.sendFile('./public/404.html', { root : __dirname})
    res.status(404).sendFile('./public/404.html', { root : __dirname})
})


