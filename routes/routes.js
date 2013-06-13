var twitter = require('../twitterApi.js');

module.exports.indexGet = function(req, res){
   res.render('index', {title: 'Pond'});
};

module.exports.htstreamPost = function(req, res){
   twitter.filterStream(req.body.hashtag)
   res.render('index',{title: 'Pond'});
};

