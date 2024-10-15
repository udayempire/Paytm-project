export function Button({label, onClick}){
    return <button onClick={onClick} type="button" className="bg-black  text-white rounded p-2 font-semibold cursor-pointer transition ease-in-out delay-150  hover:scale-105 hover:bg-green-500 duration-300 ">
        {label}
    </button>
}