var express = require('express');
var app = exports.app = express();
var fs = require('fs');

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use('/', express.static(__dirname + '/..'));
app.set('port', 3000);
app.locals.pretty = true;
app.use(express.logger('dev'));

// Why is this here? You can just GET /filename.ext "express.static..." above should allow this
app.get('/get', function(req, res, next) {
  var filename = req.query['file'];
  if (!filename) return next(new Error('No file provided'));
  fs.exists('../' + filename, function(err, exists) {
    if (!exists) return next(new Error('File does not exist'));
    fs.readFile('../' + filename, 'utf8', function (err, data) {
      if (err) return next(err);
      res.set('Content-Type', 'text/plain');
      res.send(data.toString());
    });
  });
});

app.post('/put/:filename', function(req, res, next) {
  var filename = req.params.filename;
  if (filename == 'index.html') return next(new Error('Editing index.html has been disabled'));
  var content = req.body.content;
  fs.writeFile('../' + filename, content, 'utf8', function(err) {
    if (err) return next(err);
    res.send('');
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, err.toString());
});

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));
