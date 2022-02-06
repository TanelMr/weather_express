//define packages
const express = require ('express');
const path = require("path");
const app = express ();
const fetch = require('node-fetch');
const bodyparser = require('body-parser');

//use bodyparser
app.use(bodyparser.urlencoded({extended:true}));


//public directory
app.use(express.static('public'));

//add views template engine
app.set('view engine', 'ejs');
//add views directory path
app.set('views', path.join(__dirname, 'views'));

const key = '8b0d1e31e286ec235fba8e3a8345ece8';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then (response =>{
                return response.json()
            })
            .then (data => {
                let description = data.weather[0].description;
                let city = data.name;
                let temp = Math.round(parseFloat(data.main.temp) - 273.15);

                let result = {
                    description: description,
                    city: city,
                    temp: temp,
                    error: null
                }
                resolve(result)
            })
            .catch(error => {
                reject(error)
        })
    })
}


//get
/*
app.get('/',(req, res)=>{
        let city = 'Tartu';
        let url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
         getWeatherDataPromise(url)
        .then(data => {
            res.render('index', data)
        })
    })
 */


//post
/*
app.post ('/', (req, res)=>{
    let city = req.body.linn
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    getWeatherDataPromise(url)
        .then(data => {
            res.render('index', data)
        })
})
 */

//app all
app.all('/', (req, res) => {
    let city;
    if(req.method === 'GET'){
        city = 'Tartu';
    }
    if(req.method === 'POST'){
        city = req.body.linn
    }
    let url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    getWeatherDataPromise(url)
        .then(data => {
            res.render('index', data);
        })
        .catch(error =>{
            res.render('index', {error: 'Problem with getting data'})
        })
})

//listen on port 3000
app.listen(3000, ()=>{
    console.log('Server started');
});

