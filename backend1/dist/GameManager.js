"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.isPending = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => user !== socket);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == "init_game") {
                if (this.isPending) {
                    const game = new Game_1.Game(this.isPending, socket);
                    this.games.push(game);
                    this.isPending = null;
                }
                else {
                    this.isPending = socket;
                }
            }
        });
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == 'move') {
                const game = this.games.find((game) => game.player1 == socket || game.player2 == socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
