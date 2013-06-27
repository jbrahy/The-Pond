var lineReader = require('line-reader');
var jf = require('jsonfile');
var tools = require('./getFloat.js');
var moment = require('moment');
moment().format();
var data = [];
var i = 0;
var file = 'data.json';


function get_type(thing){
    if(thing===null)return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}


var streamon = function(line)  { 
   if(line.length > 1){
   var j = 0;
   // Do stuff here 
   var splitted = line.split(/[,]+/);
   
   data[i] = {
      'date':moment(splitted[0], 'MMM DD YYYY HH:mm:ss').valueOf(),
      'text':splitted[1],
      'likelyhood':(tools.getFloat(splitted[2])[0]),
     // 'alertpct':(getFloat(splitted[3])[0]),
      //'normalpct':(tools.getFloat(splitted[4])[0]),
      'srcip':(tools.getIP(splitted[5])[0]),
      'dst_ip_addr':(tools.getIP(splitted[6])[0]),
      'srcport':(tools.getFloat(splitted[7])[0]),
      'dst_port':(tools.getFloat(splitted[8])[0]),
   }

   i++;
   console.log(data.length)
   }
  else{
     jf.writeFile(file, data, function(err){
        console.log(err); 
     });
  }
};

module.exports.readFile = function(){
   lineReader.eachLine('logfile.log', streamon).then(console.log(data));
   
}

   lineReader.eachLine('logfile.log', streamon);
