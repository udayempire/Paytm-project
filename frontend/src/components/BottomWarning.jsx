import {Link} from "react-router-dom"
export function ButtonWarning({label,buttonText,to}){
    return <div className="flex gap-1 justify-center">
        <div>
            {label}
        </div>
        <Link className="underline" to={to}>
        {buttonText}
        </Link>
    </div>

}