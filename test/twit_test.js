var expect = require('expect.js');
var tweetModel = require('../model/tweetModel.js');

//When
var tweet = {"text":"Hello world"};


describe('The database, when tweet is added ', function(){
   it('should return true', function(done){
      expect(tweetModel.addTweet(tweet,done)).to.be(true);
   });
});

describe('tweetModel.findLast()', function(){
   beforeEach(function(done){
      tweetModel.findLast(done);
   });
   it('should return tweet.text when called', function(){
      expect(tweetModel.getLast()).to.be(tweet.text);
   });
});

