// import Button from "../components/Button";
// import ChessBoard from "../components/ChessBoard";
// import { Chess } from "chess.js";
// import { useSocket } from "../hooks/useSocket";
// import { useEffect, useState } from "react";


// export default function  Game() {
//   const [chess,setChess] = useState(new Chess());
//   const [board,setBoard] = useState(chess.board());
//   const socket = useSocket();
//   // const [game,isGame] =useState(false);
//   useEffect(()=>{
//     if(!socket) return ;
//     socket.onmessage = (event)=>{
//       const message = JSON.parse(event.data);
//       if(message.type=='init_game'){
//         // if(game){
//         //   setBoard(new Chess());
//         //   isGame(false);
//         // } else{
//         //   isGame(true);
//         // }
//         setChess(new Chess());
//         setBoard(chess.board);
//       } else if(message.type=='move'){
//         const move = message.payload;
//         chess.move(move);
//         setBoard(chess.board)
//       } else {
//         console.log("Game_over")
//       }
//     }
//   },[socket])
//   if(!socket) return <div>Connecting...</div>
//   return (
//     <>
//     <div className="grid grid-cols-1 md:grid-cols-2">
//         <div>
//      <ChessBoard chess = {chess} setBoard={setBoard} board={board} socket={socket}></ChessBoard>
//         </div>
//         <div>
//           <Button onClick={()=>{
//             console.log(10);
//               socket.send(JSON.stringify({
//                 type:'init_game'
//               }))
//           }}>Play</Button>
//         </div>
//     </div>
//     </>
//   )
// }


import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

export default function Game() {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'init_game') {
        setBoard(chess.board());
      } else if (message.type === 'move') {
        const move = message.payload;
        chess.move(move);
        setBoard(chess.board());
      } else {
        console.log("Game over");
      }
    };
  }, [socket, chess]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />
        </div>
        <div>
          <Button onClick={() => {
            socket.send(JSON.stringify({
              type: 'init_game'
            }));
          }}>
            Play
          </Button>
        </div>
      </div>
    </>
  );
}
