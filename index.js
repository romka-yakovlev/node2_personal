//this is my first web appliation

const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

//declaring an array of comments
let comments = [
    {
        id: uuidv4(),
        username: "Roman",
        comment: "Comment made by Roman"
    },
    {
        id: uuidv4(),
        username: "Vitalii",
        comment: "Comment made by Vitalii"
    },
    {
        id: uuidv4(),
        username: "Anna",
        comment: "Comment made by Anna"
    }
]

//setting up the template engine to be used in the app
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

//defining RESTful route
//1. show all comments route
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

//route to show form for creating a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

//route for creating a new comment
app.post('/comments', (req, res) => {
    let comment = {
        id: uuidv4(),
        username: req.body.username,
        comment: req.body.comment
    }
    comments.push(comment);
    res.redirect('/comments');
})

//route to display a single comment
app.get('/comments/:id', (req, res) => {
    let id = req.params.id;
    if (id) {
        comment = comments.find((c) => {
            return c.id === id;
        })
        res.render('comments/show', { comment });
    } else {
        res.send("There's no comment with such id");
    }
})

//route for editing a comment
app.patch('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments.find((c) => {
        return c.id === id;
    })
    if (comment) {
        comment.comment = req.body.comment;
        res.redirect('/comments');
    } else {
        res.send("we were unable to find comment with this id");
    }


})

//route for displaying the edit form
app.get('/comments/edit/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments.find((c) => {
        return c.id === id;
    })
    if (comment) {
        res.render('comments/edit', { comment });
    } else {
        res.send("some kind of error");
    }

})

//delete route
app.delete('/comments/:id', (req, res) => {
    let id = req.params.id;
    comments = comments.filter((c) => {
        return c.id !== id;
    })
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("hey, I'm listening for requests!");
})