import {useState,useEffect} from "react"
import axios from "axios"
export const Balance=()=> {
    const [balance,setBalance] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
         .then(response=>{
            setBalance(response.data.Balance.toFixed(2))
        })
    },[balance]) 

    return <div>
        <div className="my-4 mx-1 font-bold">
            Your Balance:- ₹{balance}
        </div>
    </div>
}
