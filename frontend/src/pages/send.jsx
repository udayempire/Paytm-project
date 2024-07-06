import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/inputBox"
import {Button} from "../components/Button"
import { SendUser } from "../components/SendUser"
import {useSearchParams} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const Send=()=>{
    const [searchParams]=useSearchParams()
    const id = searchParams.get("id")
    console.log(id)
    const[amount,setAmount]=useState("")

    return <div className="bg-gray-800 p-0 m-0 flex justify-center items-center w-screen h-screen ">
        <div className="bg-white p-10 rounded-md">
            <div className="flex flex-col gap-3">
            <Heading label={"Send Money"}/>
            <SendUser/>
            <SubHeading label=""/>
            <div></div>
            <InputBox onChange={(e)=>{
                setAmount(e.target.value)
            }}label="Amount (In Rs)" placeholder="Enter Amount" />
            <Button onClick={()=>{
                axios.post("http://localhost:3000/api/v1/account/transfer", {
                    to: id,
                    amount :amount
                },{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
            }} label= "Initate Transfer" />
            </div>
        </div>
    </div>
}