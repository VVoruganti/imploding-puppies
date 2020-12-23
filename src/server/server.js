const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');


const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 8080;

const server = app.listen(port);

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Player connected!', socket.id);
});

