

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
  const [refresh,setRefresh] = useState(false);
  const [isGameStarted,setIsGameStarted] = useState(false);
  const socket = useSocket();

  useEffect(()=>{
    window.onbeforeunload = ()=>{
      setRefresh(true);
    }
    window.addEventListener("beforeunload",()=>{
      setRefresh(true);
    })
    return ()=>{
      window.removeEventListener("beforeunload",()=>{
        setRefresh(true);
      })
    }
  },[])

  useEffect(() => {
    if (!socket) return;

    if(refresh){
      // console.log("inside refresh")
      socket.send(JSON.stringify({
        type:'removeFromIsPending'
      }))
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'init_game') {
        // console.log("game started");
        setIsGameStarted(true);
        setColour(message.payload.color);
        setBoard(chess.board());
      }
       if(message.type === 'turn') {
        // console.log("turn" , message.payload);
          setTurn(message.payload);
      }
       if (message.type === 'move') {
        // console.log("moved");
        const move = message.payload;
        chess.move(move);
        setBoard(chess.board());
        setMoves((moves)=>[...moves,move]);
      } 
      if(message.type=='waiting'){
        // console.log("Waiting for another player");
      } 
      if(message.type=='Game_Over'){
        // console.log("Game over");
        setGameOver({gameOver:true,winner:message.payload.winner});
      }
    };
  }, [socket, chess,refresh]);

  if (!socket){
    return(
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-white text-3xl font-bold">Connecting to server ...</h1>
      </div>
    )
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
        <div className="mt-6 flex justify-center items-center md:max-h-screen" >
          <ChessBoard moves={moves} setMoves={setMoves} colour={colour} turn={turn} chess={chess} setBoard={setBoard} board={board} socket={socket} />
        </div>
        <div className={`flex justify-center ${isGameStarted ? '':'items-center'}`}>
         {(!buttonDisable && !isGameStarted )? <Button buttonDisable={buttonDisable} onClick={() => {
            socket.send(JSON.stringify({
              type: 'init_game'
            }));  
            setButtonDisable(true);
          }}>
            Play
          </Button> : !isGameStarted && <h1 className="text-2xl font-semibold">Finding another player...</h1>}
          <div className="">

          {isGameStarted && <MovesTable  moves={moves as Move[]} />}
          </div>
        </div>
        {gameOver.gameOver && <div className="absolute top-[50%] left-[50%] z-10 text-2xl text-white">Game Over! Winner is {gameOver.winner}</div>}
      </div>
    </div>

  );
}
