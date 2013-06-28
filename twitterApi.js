var twit = require('twit');
var tweetModel = require('./model/tweetModel.js');
var tweetRate = 0;
var oldTime = 0;
var tweetCount = 0;
var routes = require('./routes/routes.js');
var solrFunc = require('./solrFunc.js');
var client = solrFunc.client;
var moment = require('moment');
moment().format();





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
      var tweetDate = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').valueOf();
      console.log("Date:"+ tweetDate);
      var doc = {id:tweet.id, title_t: 'Tweet' + tweet.id, text_t: tweet.text, date_t:tweetDate }
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
      var tweetDate = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY');
      console.log('Date:' + tweetDate);
      var doc = {id:tweet.id, title_t: 'Tweet' + tweet.id, text_t: tweet.text, user_t:tweet.user, date:tweet.created_at};
      tweetCount++;
      client.add(doc, function(err){
         if (err) throw err;
         console.log('Tweet added');
         client.commit(function(err){if(err) console.log('Error');});
     });
  });
};

function getTerm(term, res){
   client.query('text_t:'+term, function(err, response){
      console.log(routes.tweets);
      res.json(response);
   });
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
exports.getTerm = getTerm;




