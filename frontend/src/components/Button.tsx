

export default function Button({onClick , children , buttonDisable}:{onClick: ()=> void , children: any , buttonDisable:boolean}) {
   
  return (
    <div className="mt-5">
        <button disabled={buttonDisable} aria-disabled={buttonDisable} onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${buttonDisable ? 'cursor-not-allowed' : ''}`}>
  {children}
</button>
    </div>
  )
}
