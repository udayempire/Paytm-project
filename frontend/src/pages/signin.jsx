import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/inputBox"
import {Button} from "../components/Button"
import {ButtonWarning} from "../components/BottomWarning"
import axios from "axios"
import { useState } from "react"
import {useNavigate} from "react-router-dom"

export const Signin=()=>{
    const navigate = useNavigate()
    
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    return <div className="bg-gray-800 p-0 m-0 flex justify-center items-center w-screen h-screen ">
        <div className="bg-white p-10 rounded-md">
            <div className="flex flex-col gap-3">
            <Heading label={"Sign up"}/>
            <SubHeading label="Enter Your Credentials to Access Your Account"/>
            <InputBox label="Enter Username" placeholder="Username" onChange={(e)=>{
                setUsername(e.target.value)
            }} />
            <InputBox label="Enter Password" placeholder="Enter Password" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <Button label= "Signup" onClick={async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,password
                })
                localStorage.setItem("token", "Bearer " + response.data.token)
                navigate("/dashboard?username="+ username)
            }} />  
            <ButtonWarning label="Don't Have an Account?" buttonText="Sign Up" to="/signup"></ButtonWarning>
            </div>
        </div>
    </div>
}