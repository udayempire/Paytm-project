import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
export function SuccessModal({onClose,PaymentLabel,HeadLabel}) {
    const navigate = useNavigate()
    return <div className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-8 m-10 flex flex-col gap-4 items-center rounded-md ">
            <img src="Check.svg" alt="" />
            <h1 className="font-semibold text-xl">{HeadLabel}</h1>
            <p className="font-medium">{PaymentLabel}</p>
            <div className="flex gap-4">
                <Button label="Send More" onClick={onClose} />
                <Button label="Return To Dashboard" onClick={() => {
                    navigate(-1)
                }} />
            </div>
        </div>
    </div>
}
//Congratulations, Payment Successful