const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

//declaring an array of comments
const comments = [
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
//1. show route
//SHOW THE HELL IS GOING ON HERE
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.listen(3000, () => {
    console.log("hey, I'm listening for requests!");
})