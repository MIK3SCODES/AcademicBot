var express = require('express');
const API = require("../TwitAPI.js");
var bodyParser = require('body-parser')
var app = express()
var router = express.Router()



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  router.get('/', function (req, res) {
    res.render('main.ejs')
  })
  

 router.post('/preview',(req,res) => {
    var Title = req.body.Title;
    var Link = req.body.Link;
    var Author = req.body.Author;
    var Published = req.body.Published;
    var Abstract = req.body.Abstract;
    res.render('preview.ejs' , {'title': Title, 'link': Link , 'author': Author, 'published': Published, 'abstract': Abstract})
});  

  
   
 router.post('/makepost', function (req, res) {
    API.postTweet(req.body.tweetarea);
    //API.postImage(req.body.tweetarea, req.body.location); Name request variable location of image and uncomment and image will post
   res.render('main.ejs')
}); 


  
  // add router in the Express app.
  app.use("/", router);
  module.exports = router 