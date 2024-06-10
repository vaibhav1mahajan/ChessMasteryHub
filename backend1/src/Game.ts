import WebSocket from "ws";
import { Chess } from 'chess.js'

interface Move {
    from : string,
    to   : string
}

export class Game{
    public player1 : WebSocket
    public player2 : WebSocket
    private board  : Chess
    private movesCount : number

    constructor(player1 : WebSocket , player2 : WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board  = new Chess();
        this.movesCount = 0;
        this.player1.send(JSON.stringify({
            type: 'init_game',
            payload : {
                color: 'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type: 'init_game',
            payload : {
                color: 'black'
            }
        }))
    }

    makeMove(socket : WebSocket,move : Move){
        if(this.movesCount%2==0 && socket!=this.player1) return;
        if(this.movesCount%2==1 && socket!=this.player2) return;
        
        try {
            this.board.move(move);
        } catch (error) {
            console.log(error)
            return ;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:"Game_Over",
                payload:{
                    winner : this.board.turn() == 'w' ? 'black' : 'white' 
                }
            }))
            this.player2.send(JSON.stringify({
                type:"Game_Over",
                payload:{
                    winner : this.board.turn() == 'w' ? 'black' : 'white' 
                }
            }))
        }
        console.log(move);
        if(this.movesCount%2==0){
            this.player2.send(JSON.stringify({
                type: "move",
                payload : move
            }))
        } else{
            this.player1.send(JSON.stringify({
                type: "move",
                payload : move
            }))
        }
        this.movesCount++;
    }

}