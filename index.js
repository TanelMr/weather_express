//define packages
const express = require ('express');
const path = require("path");
const app = express ();
const fetch = require('node-fetch');
const {response} = require("express");

//public directory
app.use(express.static('public'));
//add views template engine
app.set('view engine', 'ejs');
//add views directory path
app.set('views', path.join(__dirname, 'views'));

let city = 'Tartu';
const key = '8b0d1e31e286ec235fba8e3a8345ece8';


//add listeners
app.get('/',(req, res)=>{
        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then ((response) =>{
            return response.json()
        })
        .then ((data) =>{
            let description = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp)-273.15);
            console.log(description);
            console.log(city);
            console.log(temp);
        })
        res.render('index', {
            description: description,
            city: city,
            temp: temp
      })
    })



//listen on port 3000
app.listen(3000, ()=>{
    console.log('Server started');
});

