
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var xhub = require('express-x-hub');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '248568',
  key: 'f0ed6004e66da55f7fbf',
  secret: '2b17f586a0e4730f17a6',
  encrypted: true
});

// app.set('port', (process.env.PORT || 3000));
// app.listen(app.get('port'));
app.listen(3000);


app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());
app.use(express.static('app/views/api/'))

app.get('/', function(req, res) {
  console.log(req);
  res.send('It works!');
});

app.get('/facebook', function(req, res) {
  if (
    req.param('hub.mode') == 'subscribe' &&
    req.param('hub.verify_token') == 'token'
  ) {
    res.send(req.param('hub.challenge'));
  } else {
    res.sendStatus(400);
  }
});

app.post('/facebook', function(req, res) {
  console.log('Facebook request body:');

  if (req.isXHub) {
    console.log('request header X-Hub-Signature found, validating');
    if (req.isXHubValid()) {
      console.log('request header X-Hub-Signature validated');
      res.send('Verified!\n');
    }
  }
  else {
    console.log('Warning - request header X-Hub-Signature not present or invalid');
    res.send('Failed to verify!\n');
    // recommend sending 401 status in production for non-validated signatures
    // res.sendStatus(401);
  }
  console.log(req.body);

  // Process the Facebook updates here
  res.sendStatus(200);
});


app.listen();
