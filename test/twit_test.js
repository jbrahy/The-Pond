var expect = require('expect.js'),
 twitter = require('../twit.js');


describe('Twitter', function(){
   it('should ', function(){
      expect(twitter.getuser()).to.be('CollinAlexBell');
   });
});

