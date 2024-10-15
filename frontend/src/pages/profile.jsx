import { Button } from "../components/Button"
import { InputBox } from "../components/inputBox"
import axios from "axios"
import { useState, useEffect } from "react"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { UpdateModal } from "../components/UpdateModal"
import { Appbar } from "../components/Appbar"

export const Profile = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [showModel, setShowModal] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/currentUser", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
        })
    }, [])
    return <div className="bg-gradient-to-r from-blue-500 to-green-500 p-0 m-0 flex flex-col w-screen h-screen">
        <Appbar />
        <div className="flex justify-center items-center mt-4">
            <div className="bg-white p-10 rounded-md">
                <div className="flex flex-col  gap-4 items-center">
                    <Heading label={"Your Profile"} />
                    <SubHeading label={`Hello, ${firstName} ${lastName}`} />
                    <div className="bg-blue-600 w-32 h-32 rounded-full flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center text-4xl text-center text-white font-bold">
                            {firstName[0]}
                        </div>
                    </div>
                    <InputBox label={"Edit First Name"} placeholder={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <InputBox label={"Edit Last Name"} placeholder={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    <InputBox label={"Edit Password"} onChange={(e) => { setPassword(e.target.value) }} />
                        <Button label={"Update"} onClick={async () => {
                            await axios.put("http://localhost:3000/api/v1/user", {
                                password, firstName, lastName
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            })
                            setShowModal(true)
                        }} />
                        {showModel && <UpdateModal onClose={() => {
                            setShowModal(false)
                        }} />}
                </div>
            </div>
        </div>
    </div>

}