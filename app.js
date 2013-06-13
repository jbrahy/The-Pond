var express = require('express');
var app = express();
var twitter = require('./twitterApi.js');
var url = require('url');
var routes = require('./routes/routes.js');


app.use(express.bodyParser());

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.get('/', routes.indexGet);

app.post('/htstream', routes.htstreamPost);

app.listen(3000);
