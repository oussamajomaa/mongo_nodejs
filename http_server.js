// creating http server

const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {

    // lodash
    const num = _.random(0,10)
    console.log(num);


    // console.log(req.url, req.method);

    // set header content type
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello</h1>')
    // res.end()

    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break

        // redirect
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break
        default:
            path += '404.html'
            break
    }

    // send an HTML file to browser
    fs.readFile(path, (err, data) => {
        if (!err) {
            res.write(data)
            res.end()
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})