// import { Square, Color, PieceSymbol, } from "chess.js";
// import { useState } from "react";

// export default function ChessBoard({ board , socket , setBoard , chess}: {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   chess : any
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   setBoard : any
//   board: ({
//     square: Square;
//     color: Color;
//     type: PieceSymbol;
//   } | null)[][]
//    socket:WebSocket
// } ) {
//   const [from,setFrom] = useState<string | null>(null);
//   const [to,setTo] = useState<null | string>(null)  
//   return (
//     <div>
//       {board.map((row, i) => (
//         <div key={i} style={{ display: 'flex' }}>
//           {row.map((square, j) => (
//             <div onClick={() => {
//               if (!from) {
//                   const newFrom = `${String.fromCharCode(j + 97)}${8 - i}`;
//                   setFrom(newFrom);
//                   console.log(newFrom); // Log the new 'from' value
//               } else {
//                   const newTo = `${String.fromCharCode(j + 97)}${8 - i}`;
//                   setTo(newTo);
//                   console.log(i, j); // Log i and j
//                   console.log(newTo, from); // Log the new 'to' value and the current 'from' value
                  
//                   // Use the new 'to' value and current 'from' value to send the WebSocket message
//                   socket.send(JSON.stringify({
//                       type: 'move',
//                       payload: {
//                           from,
//                           to: newTo
//                       }
//                   }));
//                   chess.move({
//                     from,
//                           to: newTo
//                   })
//                   setBoard(board)
//                   // Clear 'from' and 'to' after sending the message if necessary
//                   setFrom(null);
//                   setTo(null);
//               }
//           }}
//            key={j} className={`w-16 h-16 flex justify-center border items-center ${(i+j)%2!=0 ? 'bg-green-600' : 'bg-white'}`} >
//               {square ? 'a' : ""}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// //  <img className="w-10 select-none" src={`../../public/Chess_pieces/${square.color ==='w' ?'W':'B'}${square.type.toUpperCase()}.png`} />


import { Square, Color, PieceSymbol, Chess } from "chess.js";
import { useState } from "react";

export default function ChessBoard({ board, socket, setBoard, chess }: {
  chess: Chess;
  setBoard: (board: ({
    square: Square;
    color: Color;
    type: PieceSymbol;
  } | null)[][]) => void;
  board: ({
    square: Square;
    color: Color;
    type: PieceSymbol;
  } | null)[][];
  socket: WebSocket;
}) {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((square, j) => (
            <div onClick={() => {
              if (!from) {
                const newFrom = `${String.fromCharCode(j + 97)}${8 - i}`;
                setFrom(newFrom);
                console.log(newFrom); // Log the new 'from' value
              } else {
                const newTo = `${String.fromCharCode(j + 97)}${8 - i}`;
                setTo(newTo);
                console.log(i, j); // Log i and j
                console.log(newTo, from); // Log the new 'to' value and the current 'from' value

                // Use the new 'to' value and current 'from' value to send the WebSocket message
                socket.send(JSON.stringify({
                  type: 'move',
                  payload: {
                    move:{
                      from,
                      to: newTo
                    }
                  }
                }));

                // Make the move on the chess instance
                const move = chess.move({ from, to: newTo });

                // Check if the move is valid
                if (move) {
                  setBoard(chess.board());
                }

                // Clear 'from' and 'to' after sending the message if necessary
                setFrom(null);
                setTo(null);
              }
            }}
              key={j} className={`w-16 h-16 flex justify-center border items-center ${(i + j) % 2 !== 0 ? 'bg-green-600' : 'bg-white'}`}>
              {square ? <img className="w-10 select-none" src={`/Chess_pieces/${square.color === 'w' ? 'W' : 'B'}${square.type.toUpperCase()}.png`} /> : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
