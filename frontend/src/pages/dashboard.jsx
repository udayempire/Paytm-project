import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/Balance"

export const Dashboard=()=>{
    return <div className="bg-slate-100">
        <Appbar/>
        <Balance label={"10000"}/>
        <Users/>



    </div>
    
}