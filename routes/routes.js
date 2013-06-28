var twitter = require('../twitterApi.js');
var solrFunc = require('../solrFunc.js');
var rres;

module.exports.indexGet = function(req, res){
   res.render('index', {title: 'Pond'});
};

module.exports.htstreamPost = function(req, res){
   twitter.filterStream(req.body.hashtag);
   res.redirect('/');
};

module.exports.surveyGet = function(req, res){
   res.render('survey', {title:'Survey'});
};

module.exports.csvisGet = function(req, res){
   res.render('csviz', {title:'csviz'});
};

module.exports.getOnePercent = function(req, res){
   twitter.getOnePercent();
   res.redirect('/');
};

module.exports.getTerm = function(req, res){
   console.log(req.ip);
   this.rres = res;
   var obj = twitter.getTerm(req.query.term, res);
};

module.exports.send = function(response){
   //this.rres.json(JSON.parse(response));
};

module.exports.getDateRange = function(req, res){
   solrFunc.getRange(req.query.t1, req.query.t2, req, res);
};

