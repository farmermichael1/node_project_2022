var express = require('express');
var app = express();
var axios = require('axios')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static("public"));
app.set("view engine", "ejs");

const Todo = require('./models/todo.model')
const mongoDB = 'mongodb+srv://farmermichael1:5BDmCHQay87DGhXv@cluster0.yzmzguu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "))

app.get('/', function(req, res){
    axios.get('https://xkcd.com/info.0.json').then(function(response){
        Todo.find(function(err, todo){
            console.log(todo)
            if(err){
                res.json({"Error: ": err})
            } else {
                res.render('todo.ejs', {todoList: todo, comicData: response.data});
            }
        })
    }).catch(function(error){
        res.json({"Error: ": err})
    })
    

app.listen(3000, function(){
    console.log('App listening on port 3000')
})