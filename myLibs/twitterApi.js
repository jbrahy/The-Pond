
var twit = require('twit');
var tweetRate = 0;
var oldTime = 0;
var tweetCount = 0;
var routes = require('../routes/routes.js');
var solrFunc = require('./solrFunc.js');
var client = solrFunc.client;
var moment = require('moment');
var dTweetDt = require('./hashTagRate.js');
var htArray = [];
var tweetConnections = {};
moment().format();





var twitt = new twit({
    consumer_key: 'ObEAEbrbltL7CiWDiJMw',
    consumer_secret: 'X7qIX7gMFGfCHDxrxCkpDuziZYz7u3otLd6vXVxHGo',
    access_token: '426783140-64zTCFPKuGaC8BZ1f1QpxmWWgPhskiDqLOjHBVZQ',
    access_token_secret: 'J14ouvmNaTfvP0pMaXXlf5JuYBBW5dVJ26pGwPg'
});


function filterStream(hashTag){
   var tweetConnection = {tweetCount:0, client: client, hashTag:hashTag}
   tweetConnection.incrementTweetCount = function (){
      this.tweetCount ++;
   }

   tweetConnection.clearTweetCount = function (){
      this.tweetCount = 0;
   }

   tweetConnections[hashTag] = tweetConnection
  
   
   //tweetConnection.io = require('socket.io').listen(4000);

   htArray.push(hashTag);
   var stream = twitt.stream('statuses/filter', {track: htArray}) ;
   //var timer = setInterval(dTweetDt.startRate, 5000);
   dTweetDt.startRate(tweetConnection);
   stream.on('tweet', function(tweet){
      console.log('\n\n\n\n\n');
      for (var ht in htArray){
         console.log('Testing if tweet '+tweet.text+' contains ' + htArray[ht]);   
         console.log(tweet.entities.hashtags);
         for (tht in tweet.entities.hashtags){
            if (htArray[ht].valueOf().toLowerCase().slice(1) === tweet.entities.hashtags[tht].text.valueOf().toLowerCase()){
               tweetConnections[htArray[ht]].incrementTweetCount(); 
               console.log("This tweet is from hashtag " + htArray[ht]);
            }
         }
      }
      tweetConnections[hashTag].incrementTweetCount();
      //countRate();
      var tweetDate = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').valueOf();
      console.log("Date:"+ tweetDate);
      var doc = {id:tweet.id, type_t: 'tweet', text_t: tweet.text, date_t:tweetDate }
      tweetCount++;
      client.add(doc, function(err){
         if (err) throw err;
         console.log('Tweet added');
         client.commit(function(err){if(err) console.log('Error');});
     });
  });
};

function getOnePercent(){
   var stream = twitt.stream('statuses/sample') ;

   stream.on('tweet', function(tweet){
      //countRate();
      var tweetDate = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').valueOf();
      console.log('Date:' + tweetDate);
      var doc = {id:tweet.id, type_t: 'tweet',  text_t: tweet.text, date_t:tweetDate};
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



exports.filterStream = filterStream;
exports.getOnePercent = getOnePercent;
exports.getTerm = getTerm;




