var express = require('express');
var app = express();
var twitter = require('./myLibs/twitterApi.js');
var url = require('url');
var routes = require('./routes/routes.js');
var stylus = require('stylus');
var nib = require('nib');


app.use(express.bodyParser());
app.use(stylus.middleware({
   src: __dirname + '/public',
   compile: function(str, path){
      return stylus(str)
         .set('filename', path)
         .use(nib());
   }
}));
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.get('/', routes.indexGet);
app.get('/survey', routes.surveyGet);
app.get('/csviz', routes.csvisGet);
app.get('/getterm', routes.getTerm);
app.get('/getdaterange', routes.getDateRange);


app.post('/htstream', routes.htstreamPost);
app.post('/onepercent', routes.getOnePercent);

app.listen(3001);
