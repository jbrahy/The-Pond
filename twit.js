    twit = require('twit');

var twitt = new twit({
    consumer_key: 'ObEAEbrbltL7CiWDiJMw',
    consumer_secret: 'X7qIX7gMFGfCHDxrxCkpDuziZYz7u3otLd6vXVxHGo',
    access_token: '426783140-64zTCFPKuGaC8BZ1f1QpxmWWgPhskiDqLOjHBVZQ',
    access_token_secret: 'J14ouvmNaTfvP0pMaXXlf5JuYBBW5dVJ26pGwPg'
});


function filterStream(hashTag){
   var stream = twitt.stream('statuses/filter', {track: hashTag}) ;

   stream.on('tweet', function(tweet){
      console.log(tweet.text); 
   });
}

filterStream('#snowden');





