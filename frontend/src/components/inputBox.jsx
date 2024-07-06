export function InputBox({ label, placeholder, onChange}) {
    return <div className="flex flex-col gap-1"> 
        <div className="font-medium ">
            {label}
        </div >
        <input onChange={onChange} className="border-2 rounded w-80 p-2" type="text" placeholder={placeholder} />
    </div>
}
