import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const gameManager = new GameManager();

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
      gameManager.addUser(ws)

    ws.on('disconnect',()=>{
        // console.log('disconnected')
        gameManager.removeUser(ws)
    })
});