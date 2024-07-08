import { Button } from "./Button"
import { useState,useEffect } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
export const Appbar=()=> {
    const navigate= useNavigate()
    const [user,setUser]=useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/currentUser",{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(response=>{
            setUser(response.data.user.firstName)

        })
    },[user])
    return <div className="shadow flex justify-between h-14 border-solid  rounded ">
        <div className="flex flex-col justify-center h-full ml-4 font-bold">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center mr-4 font-bold">
                Hello, {user}
            </div>
            <div className="flex flex-col justify-center bg-blue-400 rounded-full h-10 w-10 m-2 cursor-pointer" >
                <div className="flex flex-col justify-center text-center font-bold">
                    {user[0]}
                </div>
            </div>
            <Button onClick={()=>{
                localStorage.removeItem("token")
                navigate("/signin")
            }}

            label={"Logout"} className="m-2" />
        </div>
    </div>
}