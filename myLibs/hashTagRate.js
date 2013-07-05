var Hashids = require('hashids');
var crypto = require('crypto');
module.exports.startRate = function(tc){
//var newid = 0;
   var sampleTime = 30000;
      setInterval((function(){
         var tweetRate = tc.tweetCount/(sampleTime/1000) *60;
         console.log(tweetRate + ' tweets per min');
         //tc.io.emit('rateUpdate',  {tweetRate:tweetRate});
         tc.clearTweetCount();
         var currentTime = (new Date).getTime();
         var newid = crypto.createHash('sha1').update('tweet_rate' + currentTime).digest('hex');
         console.log('Hashtag:' + tc.hashTag + ' ='+ newid);
         var doc = {id: newid, type_t: 'tweet_rate', rate_i:parseInt(tweetRate) , date_t:currentTime, hashTag_t:tc.hashTag }
         //newid++;
         tc.client.add(doc, function(err){
            if (err) throw err;
            console.log('Tweet added');
            tc.client.commit(function(err){if(err) console.log('Error');});
        });

      }), sampleTime);
}

