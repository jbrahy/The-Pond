var twit = require('twit');
var tweetModel = require('./model/tweetModel.js');
var tweetRate = 0;
var oldTime = 0;
var tweetCount = 0;
var myDate = new Date();



var twitt = new twit({
    consumer_key: 'ObEAEbrbltL7CiWDiJMw',
    consumer_secret: 'X7qIX7gMFGfCHDxrxCkpDuziZYz7u3otLd6vXVxHGo',
    access_token: '426783140-64zTCFPKuGaC8BZ1f1QpxmWWgPhskiDqLOjHBVZQ',
    access_token_secret: 'J14ouvmNaTfvP0pMaXXlf5JuYBBW5dVJ26pGwPg'
});


function filterStream(hashTag){
   var stream = twitt.stream('statuses/filter', {track: hashTag}) ;

   stream.on('tweet', function(tweet){
      countRate();
      tweetModel.addTweet(tweet, function(){
         tweetModel.findLast(function(){
            console.log(tweetModel.getLast());
         });
      });
   });
};

function countRate(){
   if (tweetCount == 0){
      oldTime = new myDate.getTime()
   }
   tweetCount ++;
   if (tweetCount % 10 == 0){
      tweetRate = 10/myDate.getTime()-oldTime; 
      oldTime = myDate.getTime();
   }
}


exports.filterStream = filterStream;






