 


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
  const [, setTo] = useState<string | null>(null);
  return (
    <div>
      {(colour==='b' || colour==='black' ? board.slice().reverse() : board).map((row, i) => {
        i = colour==='b' || colour==='black' ? i+1 : 8-i;
        return (
        <div key={i} style={{ display: 'flex' }}>
          {(colour==='b' || colour==='black'?row.slice().reverse():row).map((square, j) => {
            j = colour==='b' || colour==='black' ? 7 -  (j % 8) :   (j % 8);
            return(
            <div onClick={() => {
              if(colour.charAt(0)!=turn.charAt(0)) {
                console.log(colour,turn);
                console.log("Not your turn");  
                return
              };
              if (!from) {
                console.log(colour,turn);

                let newFrom = `${String.fromCharCode(j + 97)}${i}`;
                
                setFrom(newFrom);
                console.log(newFrom); // Log the new 'from' value
              } else {
                let newTo = `${String.fromCharCode(j + 97)}${i}`;
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
                try {
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
                } catch (error) {
                  console.log("invalid move , try another move" )
                  setFrom(null);
                  setTo(null);
                }
                
              }
            }}
              key={j} className={`w-24 h-24 flex justify-center border items-center ${(i + j) % 2 !== 0 ? 'bg-slate-600' : 'bg-slate-300'} relative`}>
                <div className="absolute bottom-1 right-1 select-none">{(colour==='black' || colour==='b' ) && i==8 ? String.fromCharCode(97+j) : (colour ==='white' || colour==='w') && i==1 ?String.fromCharCode(97+j) : "" }</div>
                <div className="absolute top-1 left-1 select-none">{(colour==='black' || colour==='b' ) && j==7 ? i : (colour ==='white' || colour==='w') && j==0 ? i : "" }</div>
              {square ? <img className="select-none" height={48} width={48} src={`/Chess_pieces/${ square.color === 'w' ? 'W' : 'B' }${square.type.toUpperCase()}.png`} /> : ""}
              
            </div>
          )
      }
          )}
          
        </div>
      )
})}
      
    </div>
  );
}



// (colour == 'b' || colour === 'black') && square.color==='w' ? 'B' : (colour == 'b' || colour === 'black') && square.color === 'b' ? 'W' : square.color === 'w' ? 'W' : 'B' 