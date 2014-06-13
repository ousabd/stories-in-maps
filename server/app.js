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

app.get('/get', function(req, res, next) {
  var filename = req.query['file'];
  if (!filename) return next(new Error('No file provided'));
  fs.readFile('../' + filename, 'utf8', function (err, data) {
    if (err) return next(err);
    res.set('Content-Type', 'text/plain');
    res.send(data.toString());
  });
});

app.post('/put', function(req, res) {
  fs.writeFile('../' + req.body.file, req.body.data, 'utf8', function(err) {
    if (err) throw err;
    res.send('');
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));
