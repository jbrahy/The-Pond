var twitter = require('../myLibs/twitterApi.js');
var solrFunc = require('../myLibs/solrFunc.js');
var youtube = require('../myLibs/youtubeApi.js');
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
   term = req.query.term;
   //if (req.query.type = 'youtube'){
    //  youtube.getTerm(res, req, term);
   //} 
   console.log(req.ip);
   this.rres = res;
   var obj = twitter.getTerm(term, res);
};

module.exports.send = function(response){
   //this.rres.json(JSON.parse(response));
};

module.exports.getDateRange = function(req, res){
   if (req.query.term != null){
      solrFunc.getRangeAndTerms(req.query.t1, req.query.t2, req.query.term, req, res);
      console.log("term != null");
   }else{
      solrFunc.getRange(req.query.t1, req.query.t2, req, res);
   }
};



