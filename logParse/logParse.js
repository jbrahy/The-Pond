var lineReader = require('line-reader');
var tools = require('./getFloat.js');
var data = [];
var i = 0;


function get_type(thing){
    if(thing===null)return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}


var streamon = function(line)  { 

   if(line.length > 1){
   var j = 0;
   // Do stuff here 
   var splitted = line.split(/[,]+/);
   
   var temp = {
      'date':splitted[0],
      'text':splitted[1],
      'likelyhood':(tools.getFloat(splitted[2])[0]),
     // 'alertpct':(getFloat(splitted[3])[0]),
      //'normalpct':(tools.getFloat(splitted[4])[0]),
      'srcip':(tools.getIP(splitted[5])[0]),
      'dst_ip_addr':(tools.getIP(splitted[6])[0]),
      'srcport':(tools.getFloat(splitted[7])[0]),
      'dst_port':(tools.getFloat(splitted[8])[0]),
   }
   
   data[i] = temp
   i++;
   console.log(data.length)
   }
};

module.exports.readFile = function(){
   lineReader.eachLine('logfile.log', streamon);
   
}

   lineReader.eachLine('logfile.log', streamon);
