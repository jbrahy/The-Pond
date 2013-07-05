var solr = require('solr');
var client = solr.createClient({host:'127.0.0.1', port:'8080', core:'', path: '/solr'})
var rv;

module.exports.client = client;

module.exports.getRange = function(t1, t2, req, res){
   client.query('date_t:[' + t1 + ' TO ' + t2 + ']', function(err, response){
      console.log('Response: ' + response);
      res.json(response);
   });
};

module.exports.getRangeAndTerms = function(d1, d2, t, req, res){
   rv = [];
   for (term in t){
      client.query('date_t:[' + d1 + ' TO ' + d2 + '] AND text_t:'+t[term], function(err, response){
         rv.push(response);
         if (rv.length == t.length){
            res.json(rv);
         }
      });
   }
};

module.exports.tweetRate = function(d1, d2, t, req, res){
      client.query('date_t:[' + d1 + ' TO ' + d2 + '] AND hashTag_t:'+t +' AND type_t:tweet_rate', function(err, response){
         res.json(response);
      });
};
