
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
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

app.get('/', routes.index);
app.get('/form', function(req,res){
  res.render('form');
});

app.post('/formpost', function(req,res){
  var form = new formidable.IncomingForm();

/*   PROBLEM AREA
 *
 *   */

  console.log('hi, form is:\n'+JSON.stringify(form));
  form.parse(req, function(err, fields, files){
    console.log('In form.parse callback');
    console.log('form.type = '+form.type);
    console.log('fields:\n'+JSON.stringify(fields,null,2));
    console.log('files:\n'+JSON.stringify(files,null,2));
    res.send(200);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
