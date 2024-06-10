

export default function Button({onClick , children}:{onClick: ()=> void , children: React.ReactNode}) {
   
  return (
    <div className="mt-5">
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  {children}
</button>
    </div>
  )
}
