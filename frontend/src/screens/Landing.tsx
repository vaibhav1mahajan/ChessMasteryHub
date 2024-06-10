

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  const navigation = useNavigate();
  return (
    <div>
      {/* ChessMasteryHub with border */}


      {/* Grid container with no overflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-slate-900 pl-5 pr-5 h-screen overscroll-none">
        <div className="flex justify-center flex-col"> {/* No overflow-hidden */}
          <div className="flex justify-center">
            <img
              src="../../public/landing_page_image.jpg"
              className="max-w-xs md:max-w-md"
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center flex-col pl-3"> {/* No overflow-hidden */}
        <div className=" text-blue-700  font-bold border-inherit border-solid text-3xl md:text-5xl text-center py-2 pb-14 cursor-pointer">
        ChessMasteryHub
      </div>
          <div className="flex justify-center text-white font-bold text-3xl text-center">
            A place where you can play chess and improve your chess skills
          </div>
          <div className="flex justify-center">
            <Button onClick={()=>{
              
                navigation('/game');
            }} >Play Online</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
