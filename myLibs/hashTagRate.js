module.exports.startRate = function(tc){
   var sampleTime = 30000;
      setInterval((function(){
         var tweetRate = tc.tweetCount/(sampleTime/1000) *60;
         console.log(tweetRate + ' tweets per min');
         tc.io.emit('rateUpdate',  {tweetRate:tweetRate});
         tc.clearTweetCount();
      }), sampleTime);
}

