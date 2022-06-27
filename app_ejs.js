// CREATE EXPRESS APP WITH EJS VIEWS

const express = require('express')
const { redirect } = require('express/lib/response')
const mongoose = require('mongoose')
// const Book = require('./models/book')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')
const cookieParser = require("cookie-parser")


const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

// create instance of express app
const app = express()
 let msg

 app.post("/token", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
    const username = req.body.username
    const user = {name:username}
    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({token:token})
});

app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

// connect to mongodb
const dbURI = "mongodb+srv://osm:osm@osmmongodb.bjusm.mongodb.net/osmmongodb?retryWrites=true&w=majority"
mongoose.connect(dbURI)
    .then(result => {
        app.listen(3000, () => {
            console.log('Server listening on port 3000 & connected to MongoDB')
        })
    }).catch(err => {
        console.log(err)
    })



// Setting ejs template view
app.set('view engine', 'ejs')

// lesten for requests


// Middleware && Static Files --  images / css ... --
app.use(express.static("assets"))
app.use(express.urlencoded())
app.use(cors())
app.use(cookieParser());



app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', url: req.url })
})

app.use(bookRoutes)
app.use(userRoutes)
// redirects
app.get('/about-me', (req, res) => {
    res.redirect('about')
})

// book routes



// 404 page ... method use to create middleware -- at the end of code -- 
// this function will fire when no route mathc
app.use((req, res) => {
    res.status(404).render('404', { title: '404', url: req.url })
})


