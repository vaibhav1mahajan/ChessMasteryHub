interface Move {
    from:string,
    to: string
}

const MovesTable = ({moves} : {moves:Move[]} ) => {
  return (
    <div className='flex flex-col text-white bg-zinc-800'>
       <h1 className="text-2xl font-bold leading-4 px-2 py-4">
       Moves Table
        </h1> 
        <div className='grid grid-cols-2 border-[0.5px] border-white  py-2  gap-3'>
        <div className='text-xl text-center'>From</div>
        <div className='text-xl text-center'>To</div>
        </div>
        {moves.map((move,index)=>{
            return(
                <div key={index} className='grid grid-cols-2 border-[0.5px] border-white  py-2  gap-3'>
                <div className='text-xl text-center'>{move.from}</div>
                <div className='text-xl text-center'>{move.to}</div>
                </div>
            )
        })}

    </div>
  )
}

export default MovesTable