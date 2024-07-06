import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/inputBox"
import {Button} from "../components/Button"
import {ButtonWarning} from "../components/BottomWarning"


export const Signin=()=>{
    return <div className="bg-gray-800 p-0 m-0 flex justify-center items-center w-screen h-screen ">
        <div className="bg-white p-10 rounded-md">
            <div className="flex flex-col gap-3">
            <Heading label={"Sign up"}/>
            <SubHeading label="Enter Your Credentials to Access Your Account"/>
            <InputBox label="Enter Username" placeholder="Username" />
            <InputBox label="Enter Password" placeholder="Enter Password" />
            <Button label= "Signup" />
            <ButtonWarning label="Don't Have an Account?" buttonText="Sign Up" to="/signup"></ButtonWarning>
            </div>
        </div>
    </div>
}