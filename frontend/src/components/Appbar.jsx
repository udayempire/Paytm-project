import { Button } from "./Button"
import {useNavigate} from "react-router-dom"
export function Appbar() {
    const navigate= useNavigate()
    return <div className="shadow flex justify-between h-14 border-solid  rounded ">
        <div className="flex flex-col justify-center h-full ml-4 font-bold">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center mr-4 font-bold">
                Hello
            </div>
            <div className="flex flex-col justify-center bg-blue-400 rounded-full h-10 w-10 m-2 cursor-pointer" >
                <div className="flex flex-col justify-center text-center font-bold">
                    U
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