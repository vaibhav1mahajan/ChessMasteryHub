

import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import MovesTable from "../components/MovesTable";

interface Move {
  from:string,
  to: string

}


export default function Game() {
  const [chess, ] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [buttonDisable,setButtonDisable] = useState(false);
  const [turn,setTurn] = useState('w');
  const [colour,setColour] = useState('');
  const [gameOver,setGameOver] = useState({gameOver:false,winner:''});
  const [moves,setMoves] = useState<Move[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'init_game') {
        console.log("game started");
        setColour(message.payload.color);
        setBoard(chess.board());
      }
       if(message.type === 'turn') {
        console.log("turn" , message.payload);
          setTurn(message.payload);
      }
       if (message.type === 'move') {
        console.log("moved");
        const move = message.payload;
        chess.move(move);
        setBoard(chess.board());
        setMoves((moves)=>[...moves,move]);
      } 
      if(message.type=='waiting'){
        console.log("Waiting for another player");
      } 
      if(message.type=='Game_Over'){
        console.log("Game over");
        setGameOver({gameOver:true,winner:message.payload.winner});
      }
    };
  }, [socket, chess]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
        <div className="flex justify-center items-center" >
          <ChessBoard moves={moves} setMoves={setMoves} colour={colour} turn={turn} chess={chess} setBoard={setBoard} board={board} socket={socket} />
        </div>
        <div className="flex justify-center items-center">
         {!buttonDisable && <Button buttonDisable={buttonDisable} onClick={() => {
            socket.send(JSON.stringify({
              type: 'init_game'
            }));  
            setButtonDisable(true);
          }}>
            Play
          </Button>}
          
          {buttonDisable && <MovesTable moves={moves as Move[]} />}
        </div>
        {gameOver.gameOver && <div>Game Over! Winner is {gameOver.winner}</div>}
      </div>
    </>
  );
}
