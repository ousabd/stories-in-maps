var express = require('express');
var app = exports.app = express();
var fs = require('fs');

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use('/', express.static(__dirname + '/..'));
app.set('port', 3000);
app.locals.pretty = true;
app.use(express.errorHandler());
app.use(express.logger('dev'));

app.get('/get', function(req, res) {
  var filename = req.query['file'];
  if (!filename) throw new Error('No file provided');
  fs.readFile('../' + filename, 'utf8', function (err, data) {
    if (err) throw err;
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

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));
