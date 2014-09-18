var _ = require('lodash'),
   express = require('express'),
   app = express(),
   https = require('https'),
   pkg = require('./package.json'),
   fs = require('fs');

var options = {
  key: fs.readFileSync('./ssl/angular-bootstrap.pem'),
  cert: fs.readFileSync('./ssl/angular-bootstrap-cert.pem')
};

var server = https.createServer(options, app);

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.urlencoded());
  app.use(express.json());
});

//Enable CORS
app.all('*', function(req, res, next) {
  //This allows for cookies to be passed, and the fact that by default we're sending credentials 
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api', function(req, res) {
  res.send('ngAAMC API Version: ' + pkg.version);
});

module.exports = server;