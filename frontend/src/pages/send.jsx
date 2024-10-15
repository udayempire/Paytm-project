import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/inputBox"
import { Button } from "../components/Button"
import { SendUser } from "../components/SendUser"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { SuccessModal } from "../components/SuccessModal"
import { Appbar } from "../components/Appbar"
import axios from "axios"

export const Send = () => {
    const [searchParams] = useSearchParams()
    const username = searchParams.get("username")
    const [amount, setAmount] = useState("")
    const [showModal, setShowModal] = useState(false)

    return <div className="bg-gradient-to-r from-blue-500 to-green-500 p-0 m-0  w-screen h-screen">
        <Appbar />
        <div className="flex justify-center items-center mt-10">
            <div className="bg-white p-10 rounded-md">
                <div className="flex flex-col gap-3">
                    <Heading label={"Send Money"} />
                    <SendUser />
                    <SubHeading label="" />
                    <div></div>
                    <InputBox onChange={(e) => {
                        setAmount(e.target.value)
                    }} label="Amount (In Rs)" placeholder="Enter Amount" />
                    <Button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: username,
                            amount: amount
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        setShowModal(true)
                    }
                    } label="Initate Transfer" />
                    {showModal && <SuccessModal PaymentLabel={`Paid ${amount} to ${username}`} HeadLabel={"Congratulations, Payment Successful"} onClose={() => {
                        setShowModal(false)
                    }} />}
                </div>
            </div>
        </div>
    </div>
}