var express = require('express');
var router = express.Router();
const API = require("../TwitAPI.js");



router.get('/', function (req, res) {
    res.render('main.ejs')
  })

  router.get('/preview', function (req, res) {
    res.send('load tweet preview')
  })  
   
  router.post('/preview', function (req, res) {
    API.postImage(req.body.caption, req.body.Location);
    res.send('you just posted a tweet from js')
  })

  router.get("/:id", function (req, res) {
    res.send(`test twitter post ${req.params.id}`)
  })

  module.exports = router 