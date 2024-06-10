import { WebSocket } from "ws"
import { Game } from "./Game"

export class GameManager{
    private games : Game[]
    private isPending : WebSocket | null
    private users : WebSocket[]
    constructor(){
        this.games = []
        this.isPending = null
        this.users = []
    }
    addUser(socket:WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }

    removeUser(socket : WebSocket){
        this.users = this.users.filter((user)=> user!==socket)
    }

    addHandler(socket : WebSocket){

        socket.on('message',(data)=>{
            const message = JSON.parse(data.toString());
            if(message.type=="init_game"){
               if(this.isPending){
            const game = new Game(this.isPending,socket);
            this.games.push(game);
            this.isPending = null;
        } else{
            this.isPending = socket;
        }  
            }
        })

        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());
            if(message.type=='move'){
                const game = this.games.find((game)=> game.player1==socket || game.player2==socket)
                if(game){
                    game.makeMove(socket,message.payload.move);
                }
            }
        })
       
    }



}