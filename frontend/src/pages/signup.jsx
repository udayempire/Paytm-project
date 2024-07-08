import {useState} from "react"
import axios from "axios"
import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/inputBox"
import {Button} from "../components/Button"
import {ButtonWarning} from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"



export const Signup=()=>{
    const [emailAddress,setEmailAddress]=useState("")
    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");

    const navigate = useNavigate()

    return <div className="bg-gray-800 p-0 m-0 flex justify-center items-center w-screen h-screen">
        <div className="bg-white p-10 rounded-md">
            <div className="flex flex-col gap-3">
            <Heading label={"Sign up"}/>
            <SubHeading label="Enter your Information to create an Account"/>
            <InputBox label="Enter Your Email Address" placeholder="Email Address" onChange={e=>{
                setEmailAddress(e.target.value)
            }} />
            <InputBox label="Enter Your First Name" placeholder="First Name" onChange={e=>{
                setFirstName(e.target.value)
            }} />
            <InputBox label="Enter Your Last Name" placeholder="Last Name" onChange={e=>{
                setLastName(e.target.value)
            }}/>
            <InputBox label="Enter Username" placeholder="Username" onChange={e=>{
                setUsername(e.target.value)
            }}/>
            <InputBox label="Enter Password" placeholder="Enter Password" onChange={e=>{
                setPassword(e.target.value)
            }} />

            <Button onClick={async ()=>{ //signup button
                const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                    emailAddress,username,password,lastName,firstName
                })
                localStorage.setItem("token", "Bearer " + response.data.token)
                navigate("/dashboard?username="+ username)

            }} label= "Signup" />
            {/* signin button below */}
            <ButtonWarning label="Already Have an Account?" buttonText="Sign In" to="/signin"></ButtonWarning> 
            </div> 
        </div>
    </div>
}