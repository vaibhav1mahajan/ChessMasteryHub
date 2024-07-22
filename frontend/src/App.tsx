import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./screens/Landing"
import Game from "./screens/Game"




function App() {


  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed h-full w-full top-0 -z-10">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
        </Routes>
        </BrowserRouter>  
    </div>
  )
}

export default App
