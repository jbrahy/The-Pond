var solr = require('solr');
var client = solr.createClient({host:'127.0.0.1', port:'8080', core:'', path: '/solr'})

module.exports.client = client;

module.exports.getRange = function(t1, t2, req, res){
   client.query('date_t:[' + t1 + ' TO ' + t2 + ']', function(err, response){
      console.log('Response: ' + response);
      res.json(response);
   });
};
