var Twit = require('twit');
var path = require('path');
var config = require('./config');
var T = new Twit(config);
var fs = require('fs');


function tweeted(err, data, response) {
    if(err){
        console.log("An error occurred");
    }
    else{
        console.log("Succesful tweet ");
    }  

} 

function postTweet(txt) {
    var tweet = {
        status: txt
    }
    
    T.post('statuses/update', tweet, tweeted)
} 

function postImage(txt, img) {
    
    var b64content = fs.readFileSync('Images/' +  img + '', { encoding: 'base64' })

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        var mediaIdStr = data.media_id_string
        var params = { status: txt, media_ids: [mediaIdStr] }
         T.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
    })

} 
module.exports = { postImage };
