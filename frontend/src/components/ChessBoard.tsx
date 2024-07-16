 


import { Square, Color, PieceSymbol, Chess } from "chess.js";
import { useState } from "react";

interface Move {
  from: string;
  to: string;
}


export default function ChessBoard({moves, setMoves, board, socket, setBoard, chess ,turn ,colour }: {
  moves: { from: string; to: string }[];
  setMoves: (moves: { from: string; to: string }[]) => void;
  colour:string;
  turn : string;
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
              if(colour.charAt(0)!=turn.charAt(0)) {
                console.log(colour,turn);
                console.log("Not your turn");  
                return
              };
              if (!from) {
                console.log(colour,turn);

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
                const m : Move = {
                  from , to : newTo
                }
                // Check if the move is valid
                if (move) {
                  setBoard(chess.board());
                  setMoves([...moves, m]);
                }

                // Clear 'from' and 'to' after sending the message if necessary
                setFrom(null);
                setTo(null);
              }
            }}
              key={j} className={`w-24 h-24 flex justify-center border items-center ${(i + j) % 2 !== 0 ? 'bg-green-600' : 'bg-white'}`}>
              {square ? <img className="select-none" height={48} width={48} src={`/Chess_pieces/${square.color === 'w' ? 'W' : 'B'}${square.type.toUpperCase()}.png`} /> : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


