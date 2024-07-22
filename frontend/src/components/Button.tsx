

export default function Button({onClick , children , buttonDisable}:{onClick: ()=> void , children: any , buttonDisable:boolean}) {
   
  return (
    <div className="mt-4">
        <button  disabled={buttonDisable} aria-disabled={buttonDisable} onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 text-xl px-6 rounded  ${buttonDisable ? 'cursor-not-allowed' : ''}`}>
  {children}
</button>
    </div>
  )
}
