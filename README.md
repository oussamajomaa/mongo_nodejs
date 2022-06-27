https://www.youtube.com/watch?v=_GJKAs7A0_4&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=8

# **INSTALLING PACKAGES GLOBALLY**
## **nodemon:**
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
<br>
*npm install -g nodemon*



## **package.json file:**
The package.json file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.\
*npm init*

<br><br>

---
# **INSTALLING PACKAGES LOCALLY**
## **lodash:**
Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
Lodash’s modular methods are great for:
- Iterating arrays, objects, & strings
- Manipulating & testing values
- Creating composite functions
<br>

*npm install lodash*

<br><br>

---
# **DEPENDENCIES**
## **Install all dependencies in package.json:**
*npm install*

<br>

## **EXPRESS**
The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.
<br>
Express does not force you to use any specific ORM or template engine. With support for over 14 template engines via Consolidate.js, you can quickly craft your perfect framework.
npm install express

### **CREATE EXPRESS APP**
```js
const express = require('express')
const app  = express()
app.listen(3000)
app.get('/', (req,res) => {
    res.sendFile('./public/index.html', { root: __dirname})
})

app.get('/about', (req,res) => {
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
```
<br>

### **CREATE EXPRESS APP WITH EJS VIEWS**
#### **install ejs:**
*npm install ejs*

#### **setting ejs:**

```js
app.set('view engine', 'ejs)
```

<br>

#### **Then: we create folder named views and put inside all ejs files**

```js
app.get('/', (req,res) => {
   res.render('index')
})
```
<br> 

### **PASSING DATA INTO VIEW**
```js
app.get('/', (req,res) => {
   res.render('index', {virable})
})
```

in ejs file:
```
<%= variable %>
```
INCLUDE ejs file:
```
<%- include('path/fileName') %>
```
<br>


# **MIDDLEWARE**
https://blog.logrocket.com/express-middleware-a-complete-guide

Middleware is just a function or code which runs on the server between requests coming and the response going back to the browser. So, the order of middleware is very important to how is runs.<br>
Middleware runs from top to bottom in our code and it runs that way until we exit the process or explicity send a response to the browser.

## **Middleware exapmles:**
- Logger middleware to log details of every request
- Authentification check middleware for protected routes
- Middleware to parse JSON data from requests
- Return 404 pages

<br>

## Create Middleware:

We use the method "use" to create a middleware:
```js
app.use((req,res) => {
    console.log('new request made')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
})
```
So we've seen how the browser  hangs when we run this middleware right here, beacause 'express' doesn't automatically know how to move on. We to explicity tell it to move on to the next function down here and we do that by using a function called "next()".
<br>

## **Using next function**
```js
app.use((req,res, next) => {
    console.log('new request made')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    next()
})
```
<br>

---

# **STATIC FILES**
To get access to files into a folder, we muste use a middleware express static and specify the folder name where files are stored
```js
app.use(express.static("assets"))
```
<br>

---
# **USING MONGO DB**

## **Mongodb Setup & Atlas**
MongoDB is a *document-based* database management system which leverages a JSON-style storage format known as binary JSON, or BSON, to achieve high throughput. BSON makes it easy for applications to extract and manipulate data, as well as allowing properties to be efficiently indexed, mapped, and nested in support of complex query operations and expressions.<br>

Go to https://mongodb.com/cloud/atlas
And Create an organization and then create a project et a cluster or database...<br>
Then create a collection & an user & click on connect button & select **Connect your application**. Copy the link and past it in your application...
```js
const urlDB = "mongodb+srv://osm:<password>@osmmongodb.bjusm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
```

<br>
We'll be using something called Mongoose to connect and interact with mongoDb.<br><br>

## **Mongoose**
MongooseJS is an Object Document Mapper (ODM) that makes using MongoDB easier by translating documents in a MongoDB database to objects in the program. 

## **Schemas & Models**

### **Schema**
- Schemas defines the structure of  type of data / document (properties & property types)
<br>

### example:<br>
**Blog Schema:**
- title (string), required
- snipet (string), required
- body (string), required

### **Models**
Models allow us to communicate with database collections. 
<br>

### **Install Mongoose:**
*npm install mongosse*

<br>

```
const mongoose = require('mongoose')

// connect to mongodb
const dbURI = "mongodb+srv://username:password@db_name.bjusm.mongodb.net/db_name?retryWrites=true&w=majority"
mongoose.connect(dbURI)
.then(result => {
    console.log('connexion to data base')
}).catch (err => {
    console.log(err)
}) 
```

Or we can move the listening for requests after the connexion to the database..

```
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
```

<br>

### **Create schema**
```
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
    puplication_place: {
        type: String
    }
}, { timestamps: true})
```

<br>

### **Create model**
The first argument of the model is the name of model. It is very important to name it the same name of the collection but in singular. The reason is when we communicate with the database, we pluralize the model name and look for the collection that corresponds.
<br>
The seconde argument is the name of schema we want to base this model on... what type of object we'er going to store inside this collection.
```
// The first argument of the model and the seconde is the name of schema
const Book = mongoose.model('Book', bookSchema)

// export the model so we can use elsewhere in the project
module.exports = Book
```

<br>

## **Add Item to mongoDB**
First of all, we import the model:
```
const Book = require('./models/book')
```

<br>

Then we create a new instance of Book document and we passs the req.body as a params and then we call save() method:
```
    app.post('/add-book',(req,res) => {
    console.log(req.body);
    const book = new Book(req.body)
    book.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})
```

<br>

## **Get all items from mongoDB**
First of all, we import the model:
```
const Book = require('./models/book')
```

<br>

Then we call the method find():

```
app.get('/all-book', (req, res) => {
    Book.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})
```


## **Get one item from mongoDB**
First of all, we import the model:
```
const Book = require('./models/book')
```

Then we get the id via req.params and call the method findById(id) and by passing the id as a params:
```
app.get('/one-book/:id', (req, res) => {
    const id = req.params.id
    Book.findById(id)
        .then(book => res.render('details', {title: "details", book, url:""}))
        .catch(err => console.log(err))
})
```
<br>

## **Delete one item from mongoDB**
First of all, we import the model:
```
const Book = require('./models/book')
```

After we have two method to delete an item:

<br>

1- First method: We send an Ajax request:
```
<a class="tp delete"><img src="/delete.png" alt="">
    <span class="tooltiptext">Delete book</span>
</a>

<script>
    const trash = document.querySelector('a.delete')
        trash.addEventListener('click', () => {
            const url = "/delete-book/<%= book._id%>"
            fetch(url, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then(data => window.location.href = '/')
                .catch(err => console.log(err))
        })
</script>
```

<br>

And in the controller:

```
app.delete('/delete-book/:id', (req, res) => {
    const id = req.params.id
    Book.findByIdAndDelete(id)
        .then(result => {
        res.json({redirect:'/index'})
        })
        .catch(err => console.log(err))
})
```

<br>

2- Second method: Without Ajax request:
```
<a class="tp delete" href="/delete-book/<%= book._id%>"><img src="/delete.png" alt="">
    <span class="tooltiptext">Delete book</span>
</a>
```

And in the controller:

```
app.get('/delete-book/:id', (req, res) => {
    const id = req.params.id
    Book.findByIdAndDelete(id)
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
})
```

<br>

## **Update one item in mongoDB**
First of all, we import the model:
```
const Book = require('./models/book')
```

Then, in view:
```
<form action="/save-update/<%= book._id%>" method="post">
    <div class="list-book">
        <div class="book-details">
            <div><label class="property">Title:</label>
                <input type="text" name="title" value="<%= book.title %>">
            </div>
            <div><label class="property">Autor:</label>
                <input type="text" name="author" value="<%= book.author %>">
            </div>
            <div><label class="property">Publisher:</label>
                <input type="text" name="publisher" value="<%= book.publisher %>">
            </div>
            <div><label class="property">Publication Place:</label>
                <input type="text" name="publication_place" value="<%= book.publication_place %>">
            </div>
            <div><label class="property">Publication Date:</label>
                <input type="text" name="publication_date" value="<%= book.publication_date %>">
            </div>
            <div class="action">
                <a class="tp delete" href="/delete-book/<%= book._id%>"><img src="/delete.png" alt="">
                    <span class="tooltiptext">Delete book</span>
                </a>
                <button 
                    class="tp" 
                    style="border:none; background:transparent; padding: 0; cursor: pointer;">
                    <img src="/update.png" alt="">
                    <span class="tooltiptext">Update book</span>
                </button>
            </div>
        </div>

    </div>
</form>
```

In controller:
```
app.post('/update-book/:id', (req,res) => {
    const id = req.params.id
    Book.findByIdAndUpdate(id, req.body)
    .then(result => res.redirect(`/`))
    .catch(err => console.log(err))
})
```

<br>

## **Add one item into mongoDB**

First of all, we import the model:
```
const Book = require('./models/book')
```

Then, we render a view with form:

```
app.get('/add-book', (req, res) => {
    res.render('./add-book', { title: 'Add Book', url: req.url })
})
```

In view template:
```
<form action="/add-book" method="POST" class="add">
    <input type="text" name="title" placeholder="title">
    <input type="text" name="author" placeholder="author">
    <input type="text" name="publisher" placeholder="publisher">
    <input type="text" name="publication_place" placeholder="publication place">
    <input type="text" name="publication_date" placeholder="publication date">
    <button>Submit</button>
</form>
```

And when we submit:
```
app.post('/add-book',(req,res) => {
    const book = new Book(req.body)
    book.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
})
```

<br>

# **EXPRESS ROUTER**
Router is amiidleware from Express. We use Express router to split our routes into different files and manage them in small groups of routes that belong together and it makes the app more modular and it also become easier to update those differnet parts of the app later on and it will mean that we don't have to have everythin justified in one big messy file. To do this, we create a folder called routes and inside this folder we create a file called bookRoutes for our example:
```
const express = require('express')
const router = express.Router()

// const mongoose = require('mongoose')
const Book = require('../models/book')

// mongoose and mongo sandbox routes
router.get('/books/new', (req, res) => {
    res.render('./add-book', { title: 'Add Book', url: req.url })
})

// add book
router.post('/books',(req,res) => {
    const book = new Book(req.body)
    book.save((err,data) => {
        if (!err) res.redirect('/')
        else console.log(err)
    })
})

// get all books
router.get('/books', (req, res) => {
    Book.find((err,books) => {
        if (!err) res.render('index', { title: 'Home', books, url: req.url })
        else console.log(err)
    })
})

// get one book (book's details)
router.get('/books/:id', (req, res) => {
    const id = req.params.id
    Book.findById(id)
        .then(book => res.render('details', {title: "details", book, url:""}))
        .catch(err => console.log(err))
})

router.get('/books/delete/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    Book.findByIdAndDelete(id)
        .then(result => {
        //    res.json({redirect:'/index'})
        res.redirect('/')
        })
        .catch(err => console.log(err))
})

router.post('/books/update/:id', (req,res) => {
    const id = req.params.id
    Book.findByIdAndUpdate(id,req.body,(err,data) =>{
        if (!err) res.redirect(`/`)
        else console.log(err)
    })
})

module.exports = router
```

<br>

# **MVC BASICS** 
* Stands for Model (data structure), View (templates), Controller (functions)
* MVC is a way of structuring our code & files
* Kepps code more modular, reusable & easier to read

<br>

We have a model and view and we will create controller:
* We create folder called controllers
* Inside the folder we create a file called bookController.js
* Extract all function (logic) from the bookRoutes file
```const Book = require('../models/book')

const create = (req,res) => {
    res.render('./add-book', { title: 'Add Book', url: req.url })
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
        if (!err) res.render('index', { title: 'Home', books, url: req.url })
        else console.log(err)
    })
}

const oneBook = (req, res) => {
    const id = req.params.id
    Book.findById(id)
        .then(book => res.render('details', {title: "details", book, url:""}))
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
```

And the bookRoutes become:
```
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
```

# **Hash Password**
When we add a new user we must hash the password in the DB by using the package bcrypt and their function:

## **Install bcrypt**
```
npm install bcrypt
```

Then we use the method bcrypt.genSalt(). This method takes our saltRounds integer of 10 as a parameter and returns a callback function with the generated salt result included.
And the method bcrypt.hash() to hash the password:
```
---
---
bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err
    else {
        bcrypt.hash('password', salt, (err, hash) => {
            if (err) throw err
            else {
                const hashPassword = hash
                ---
                ---
            }
        })
    }
})
---
---
```

When we login, we have to verify if the hashed password stored in DB is equal to the entered password:
```
---
---
bcrypt.compare(entered_password, db_password, (err, decode) => {
    if (err) throw err
    if (decode) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
        ----

---
---
```

<br>

# **USING JWT**
```
npm install jsonwebtoken
```

After login, we generate the token and store it in the cookie or in the localstorage...
If we want to store it the cookie, we have to install:
```
npm install cookie-parser
```

And in the main app:
```
---
const cookieParser = require("cookie-parser")
app.use(cookieParser());
---
```

## **JWT Signing**

### **Headers**
Tells the server what type of signature is being used (meta)

### **Payload**
Used to identify the user (e.g. contains user id)

### **Signature**
Makes the token secure (like a stamp of authenticity)

Aftre verifying the username and the password, we sign a token:

```
-*-

-*-
router.post('/login', (req, res) => {

    const password = req.body.password
    const email = req.body.email

    if (email && password) {
        User.findOne({ email }, (err, user) => {
            if (user) {
                const hash = user.password
                console.log(hash);
                bcrypt.compare(password, hash, (err, decode) => {
                    if (err) throw err
                    if (decode) {
                        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);

                        // expire after one hour
                        res.cookie("token", token, { maxAge: 60 * 60 * 1000 })
                        res.redirect('users')
                    }
                    else {
                        console.log('Invalid credencial')
                        res.redirect('login')
                    }
                })
            }
        })
    }
    else {
        console.log('those fields are required')
        res.redirect('login')
    }
})
-*-
-*-
```

<br>

## **Verifying Token**
We create a method to verify the token and use it after the route:
```
const jwt = require('jsonwebtoken')

// to enforce security, we put the variable in .env file
const dotenv = require('dotenv');
dotenv.config();
*-*-*
// method to verify the token
const verifyToken = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        res.redirect('/')
    }
    let payload
    try {
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).end()
        }
        // otherwise, return a bad request error
        return res.status(400).end()
    }
}


// Retreive all users
router.get('/users', verifyToken, (req, res) => {
    User.find((err, users) => {
        if (!err) {
            res.render('user/users', { title: 'All users', users, url: req.url })
        }
    })
})

*-*-*
```





























