
module.exports.getFloat = function(wtf){
   var thisisnotnull = wtf.match(/[+-]?\d+(\.\d+)?$/);
   return thisisnotnull;
}

module.exports.getIP = function(wtf){
   var thisisnotnull = wtf.match(/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
   return thisisnotnull;
}
