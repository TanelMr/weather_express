//define packages
const express = require ('express');
const path = require("path");
const app = express ();

//public directory
app.use(express.static('public'));

//add views template engine
app.set('view engine', 'ejs');

//add views directory path
app.set('views', path.join(__dirname, 'views'));

//add listeners
app.get('/home',(req, res)=>{
    res.render('index');
});


//listen on port 3000
app.listen(3000, ()=>{
    console.log('Server started');
});

