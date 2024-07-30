"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const gameManager = new GameManager_1.GameManager();
const wss = new ws_1.WebSocketServer({ host: '0.0.0.0', port: 8080 });
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on('disconnect', () => {
        // console.log('disconnected')
        gameManager.removeUser(ws);
    });
});
