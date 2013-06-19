var twitter = require('../twitterApi.js');

module.exports.indexGet = function(req, res){
   res.render('index', {title: 'Pond'});
};

module.exports.htstreamPost = function(req, res){
   twitter.filterStream(req.body.hashtag)
   res.redirect('/');
};

module.exports.surveyGet = function(req, res){
   res.render('survey', {title:'Survey'});
};

module.exports.csvisGet = function(req, res){
   res.render('csviz', {title:'csviz'});
};
