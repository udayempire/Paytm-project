import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";

function InputBox({ placeholder,onChange}) {
    return <div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="border-2 border-black rounded w-full p-2 mt-1" />
    </div>
}

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    // const [filter,setFilter] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <div>
        <div>
        <InputBox onChange={(e)=>{
            setFilter(e.target.value)
        }} placeholder={"Enter the User Name"} className="bg-red-600" />
        </div>
        <div>
        {users.map(user => <User user={user} />)}
        </div>
    </div>
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex gap-1">
            <div className="flex  justify-center rounded-full bg-blue-400 h-10 w-10 mt-4 mr-1">
                <div className="flex flex-col justify-center text-xl h-full">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full  ">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div >
        <div className="mr-4 p-4">
            <Button onClick={()=>{
                navigate("/send?id="+ user._id + "&name=" + user.firstName)
            }} label="Send Money" />
        </div>
    </div>
}