
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , fs = require('fs')
  , util = require('util')
  , path = require('path')
  , formidable = require('formidable');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req,res){
  res.render('form');
});

app.post('/formpost', function(req,res){
  var form = new formidable.IncomingForm();
  console.log('hi, form is:\n'+JSON.stringify(form));

/*   PROBLEM AREA
 *
 *   */

  console.log('about to parse form!');
  form.parse(req, function(err, fields, files){
    console.log('In form.parse callback');
    console.log('form.type = '+form.type);
    res.send(200,
    'fields:\n'+JSON.stringify(fields,null,2)
    +'\n\nfiles:\n'+JSON.stringify(files,null,2)
    );
  });
});

app.post('/formpost2', function(req, res){
  console.log('in formpost2');
  res.send(200,
  'fields:\n'+JSON.stringify(req.body,null,2)
  +'\n\nfiles:\n'+JSON.stringify(req.files,null,2)
  );
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
