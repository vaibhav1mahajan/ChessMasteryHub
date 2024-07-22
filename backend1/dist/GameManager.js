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
        if (this.isPending == socket) {
            this.isPending = null;
        }
        // console.log('removed user');
        this.users = this.users.filter((user) => user !== socket);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == "init_game") {
                // console.log("init_game")
                if (this.isPending) {
                    const game = new Game_1.Game(this.isPending, socket);
                    this.games.push(game);
                    this.isPending = null;
                }
                else {
                    this.isPending = socket;
                    socket.send(JSON.stringify({
                        type: "waiting"
                    }));
                }
            }
        });
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == 'move') {
                const game = this.games.find((game) => game.player1 == socket || game.player2 == socket);
                if (game) {
                    // console.log("move",message.payload.move);
                    game.makeMove(socket, message.payload.move);
                }
            }
            else if (message.type == 'removeFromIsPending') {
                if (socket == this.isPending) {
                    // console.log(socket);
                    this.isPending = null;
                }
                else {
                    const game = this.games.find((game) => game.player1 == socket || game.player2 == socket);
                    if ((game === null || game === void 0 ? void 0 : game.player1) == socket) {
                        game === null || game === void 0 ? void 0 : game.player2.send(JSON.stringify({
                            type: "Game_Over",
                            payload: {
                                winner: 'black'
                            }
                        }));
                    }
                    else {
                        game === null || game === void 0 ? void 0 : game.player1.send(JSON.stringify({
                            type: "Game_Over",
                            payload: {
                                winner: 'white'
                            }
                        }));
                    }
                }
            }
        });
    }
}
exports.GameManager = GameManager;
