const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello, my name is Roman and this is my simple web page");
})

app.listen(3000, () => {
    console.log("hey, I'm listening for requests!");
})