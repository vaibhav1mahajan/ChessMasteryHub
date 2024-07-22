

// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";


import { useNavigate } from "react-router-dom"

// export default function Landing() {
//   const navigation = useNavigate();
//   return (
//     <div>
//       {/* ChessMasteryHub with border */}


//       {/* Grid container with no overflow */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 bg-slate-900 pl-5 pr-5 h-screen overscroll-none">
//         <div className="flex justify-center flex-col"> {/* No overflow-hidden */}
//           <div className="flex justify-center">
//             <img
//               src="../../landing_page_image.jpg"
//               className="max-w-xs md:max-w-md"
//               alt=""
//             />
//           </div>
//         </div>
//         <div className="flex justify-center flex-col pl-3"> {/* No overflow-hidden */}
//         <div className=" text-blue-700  font-bold border-inherit border-solid text-3xl md:text-5xl text-center py-2 pb-14 cursor-pointer">
//         ChessMasteryHub
//       </div>
//           <div className="flex justify-center text-white font-bold text-3xl text-center">
//             A place where you can play chess and improve your chess skills
//           </div>
//           <div className="flex justify-center">
//             <Button buttonDisable={false} onClick={()=>{
              
//                 navigation('/game');
//             }} >Play Online</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




const Landing = () => {
  const naviagation = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl md:text-7xl pb-8 tracking-wide">ChessMateryHub</h1>
        <p className="text-xl font-semibold md:text-2xl tracking-normal pb-8">A place where you can compete with others and master your chess skills</p>
        <div className="flex">

          <button className="px-8 py-3 border text-xl rounded-xl bg-blue-950 bg-opacity-95 hover:bg-transparent m-5" onClick={()=>{
            naviagation('/game')
          }}>Play Online</button>
         
        </div>
      </div>
    </div>
  )
}

export default Landing
