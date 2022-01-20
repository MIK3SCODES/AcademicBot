console.log("the bot is running");

var express = require('express');
var app = express();
app.listen(8000);
app.use(express.urlencoded({extended: true}))
app.set('view engine', "ejs");

app.get('/', function (req, res) {
    res.render('Welcome')
  })  

 const userRouter = require('./Routes/Post') 

 app.use("/Post", userRouter) 


