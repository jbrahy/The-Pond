var youtube = require('youtube-feeds');

module.exports.getTerm = function(req, res, term){
   var videos;
   var ress = res;
   youtube.feeds.videos({q:term}, function(err, data){
      ress.json(data); 
   });
}
