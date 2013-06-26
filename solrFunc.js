var solr = require('solr');
var client = solr.createClient({host:'127.0.0.1', port:'8080', core:'', path: '/solr'})

module.exports.client = client;

module.exports.getRange = function(t1, t2){

};
