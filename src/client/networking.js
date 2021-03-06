import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise((resolve) => {
  socket.on('connect', () => {
    resolve();
  });
});
export const connect = (onGameOver) => (
  connectedPromise.then(() => {
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
    });
  });
);

export const play = (username) => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

export const updateInput = throttle(20, (input) => {
  socket.emit(Constants.MSG_TYPES.INPUT, input);
});
