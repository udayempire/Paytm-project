export function Balance({ label }) {
    return <div>
        <div className="my-4 mx-1 font-bold">
            Your Balance:-  ₹{label}
        </div>
    </div>
}
// import {useState} from "react"
// import axios from "axios"
// import useSearchParams from "react-router-dom"
// export const Balance({label}){
//     const[balance,setBalance]= useState("")

//     useEffect(async ()=>{
//         await axios.get("")

//     })
    
// }