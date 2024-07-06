import {useSearchParams} from "react-router-dom"
export function SendUser(){
    const [searchParams] = useSearchParams()
    const id= searchParams.get("id")
    const firstName = searchParams.get("name")
    return <div className="flex mt-4 mb-0">
        <div className="flex gap-2">
            <div className="flex flex-col justify-center rounded-full bg-blue-500 h-14 w-14 ">
                <div className="font-bold flex flex-col justify-center items-center text-2xl">
                    {firstName[0]}
                </div>
            </div>
            <div className="flex items-center text-2xl font-bold">
                {firstName}
            </div>
        </div>
    </div>
}