// import useSearchParams from "react-router-dom"
import {useState,useEffect} from "react"
import axios from "axios"
export const Balance=()=> {
    // const searchParam = useSearchParams()
    const [balance,setBalance] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
         .then(response=>{
            setBalance(response.data.Balance)
        })
    },[balance]) 

    return <div>
        <div className="my-4 mx-1 font-bold">
            Your Balance:- {balance}
        </div>
    </div>
}
