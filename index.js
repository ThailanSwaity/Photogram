// Server handling ----------------------
var express = require('express');

var app = express();
const port = 3000;
var server = app.listen(port, () => {
  console.log('Starting server on port ' + port);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log(req.query);
});

var socket = require('socket.io');

var io = socket(server);

// Pexels handling ----------------------
var pex = require('pexels');
const API_KEY = '563492ad6f917000010000011322f1298f124100b636f4be620c263f';

const client = pex.createClient(API_KEY);
const query = 'Nature';

io.sockets.on('connection', (socket) => {
  console.log('new connection: ' + socket.id);

  // Responds with a new list of posts when it receives a request
  socket.on('post_request', (data) => {
    client.photos.search({
      query: data.query,
      page: data.page,
      per_page: 10
    }).then(photos => {
      socket.emit('post_load', photos);
    });
  });

  // A user disconnect event
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected');
  });
});
