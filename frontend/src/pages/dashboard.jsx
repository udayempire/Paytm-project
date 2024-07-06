import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
// import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/SubHeading"
import { Balance } from "../components/Balance"

export const Dashboard=()=>{
    return <div className="m-4">
        <Appbar/>
        <Balance label={"10000"}/>
        <SubHeading label={"Users"}/>
        <Users/>

    </div>
    
}