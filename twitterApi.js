var twit = require('twit');
var tweetModel = require('./model/tweetModel.js');




var twitt = new twit({
    consumer_key: 'ObEAEbrbltL7CiWDiJMw',
    consumer_secret: 'X7qIX7gMFGfCHDxrxCkpDuziZYz7u3otLd6vXVxHGo',
    access_token: '426783140-64zTCFPKuGaC8BZ1f1QpxmWWgPhskiDqLOjHBVZQ',
    access_token_secret: 'J14ouvmNaTfvP0pMaXXlf5JuYBBW5dVJ26pGwPg'
});


function filterStream(hashTag){
   var stream = twitt.stream('statuses/filter', {track: hashTag}) ;

   stream.on('tweet', function(tweet){
      tweetModel.addTweet(tweet);
   });
   
};

exports.filterStream = filterStream;






