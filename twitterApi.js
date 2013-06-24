var twit = require('twit');
var tweetModel = require('./model/tweetModel.js');
var tweetRate = 0;
var oldTime = 0;
var tweetCount = 0;
var solr = require('solr');
var res;

var client = solr.createClient({host:'127.0.0.1', port:'8080', core:'', path: '/solr'})



var twitt = new twit({
    consumer_key: 'ObEAEbrbltL7CiWDiJMw',
    consumer_secret: 'X7qIX7gMFGfCHDxrxCkpDuziZYz7u3otLd6vXVxHGo',
    access_token: '426783140-64zTCFPKuGaC8BZ1f1QpxmWWgPhskiDqLOjHBVZQ',
    access_token_secret: 'J14ouvmNaTfvP0pMaXXlf5JuYBBW5dVJ26pGwPg'
});


function filterStream(hashTag){
   var stream = twitt.stream('statuses/filter', {track: hashTag}) ;

   stream.on('tweet', function(tweet){
      //countRate();
      console.log(tweet.id + ' ' + tweet.text);
      var doc = {id:tweet.id, title_t: 'Tweet' + tweet.id, text_t: tweet.text, date_t: tweet.created_at}
      tweetCount++;
      client.add(doc, function(err){
         if (err) throw err;
         console.log('Tweet added');
         client.commit(function(err){if(err) console.log('Error');});
     });
  });
};

function getOnePercent(){
   var stream = twitt.stream('statuses/filter', {}) ;

   stream.on('tweet', function(tweet){
      //countRate();
      console.log(tweet.id + ' ' + tweet.text);
      console.log("Date:"+ tweet.created_at);
      var doc = {id:tweet.id, title_t: 'Tweet' + tweet.id, text_t: tweet.text, user_t:tweet.user, date_t:tweet.created_at};
      tweetCount++;
      client.add(doc, function(err){
         if (err) throw err;
         console.log('Tweet added');
         client.commit(function(err){if(err) console.log('Error');});
     });
  });
};

function queryText(term){
   client.query(term, function err, response){
      res = response
   }
   return res;
};


function countRate(){
   if (tweetCount == 0){
      //oldTime = new myDate.getTime()
   }
   tweetCount ++;
   if (tweetCount % 10 == 0){
      //tweetRate = 10/myDate.getTime()-oldTime; 
      //oldTime = myDate.getTime();
   }
}


exports.filterStream = filterStream;
exports.getOnePercent = getOnePercent;
exports.queryText = queryText;




