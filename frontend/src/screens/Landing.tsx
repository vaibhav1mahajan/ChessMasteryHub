;


import { useNavigate } from "react-router-dom"

import playSound from '../assets/sounds/playOnline.mp3'

const Landing = () => {
  const naviagation = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl md:text-7xl pb-8 tracking-wide">ChessMateryHub</h1>
        <p className="text-xl font-semibold md:text-2xl tracking-normal pb-8">A place where you can compete with others and master your chess skills</p>
        <div className="flex">

          <button className="px-8 py-3 border text-xl rounded-xl bg-blue-950 bg-opacity-95 hover:bg-transparent m-5" onClick={()=>{
            const audio = new Audio(playSound);
            audio.play();
            
            naviagation('/game')
          }}>Play Online</button>
         
        </div>
      </div>
    </div>
  )
}

export default Landing
