var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/htsearch');

var Schema = mongoose.Schema;


var RequestObject = new Schema({
   id:Number,
   text:String
});

mongoose.model('RequestObject', RequestObject);
var ro = mongoose.model('RequestObject');

var num = 0;

var last;

module.exports.addTweet = function(tweet, done){
   
   var temp = new ro();
   temp.id = num;
   temp.text = tweet.text;

   temp.save(function(err){
      done();
     // if something bad happens, tell the error
     if(err)console.log('{"Save Error":"'+err.err+'"}');
   });
   return true;
};

module.exports.findLast = function(done){
   var rv;
   ro.find({},function(err,objs){
     // if something bad happens, tell the error
     if(err)console.log('{"Find Error":"'+err.err+'"}');
     else{
         // Get our data from the collection store
         if(objs[objs.length-1]){
            last = objs[objs.length-1].text;
         }
         else console.log('Index error');
         // Finally, close the HTTP response, we're done.
     }

   done();
   });
};

module.exports.getLast = function(){
   return last;
}
