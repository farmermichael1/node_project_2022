var express = require('express');
var app = express();
var axios = require('axios')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static("public"));
app.set("view engine", "ejs");
const Xkcd = require('./models/todo.model');

app.get('/', function(req, res){
    var num = Math.floor(Math.random()*(2682-1)+1);
    var url = "https://xkcd.com/"+num+"/info.0.json";
    console.log(num);
    axios.get(url).then(function(response){
        let newXkcd = new Xkcd({
            safe_title: response.data["safe_title"],
            date: response.data["month"] + "/" + response.data["day"] + "/" + response.data["year"],
            image: response.data["img"],
            transcript: response.data["transcript"],
            alt_image: response.data["alt"]
        })
        res.render('todo.ejs', newXkcd);
    }).catch(function(err){
        console.log(err);
        res.json({"Error: ": err})
    })})
    

app.listen(3000, function(){
    console.log('App listening on port 3000')
})