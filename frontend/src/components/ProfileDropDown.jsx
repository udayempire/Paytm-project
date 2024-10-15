import { useNavigate } from "react-router-dom"
export function ProfileDropDown({ firstName, lastName, email }) {
    const navigate = useNavigate()
    return (
        <div className="bg-gray-50 divide-y divide-gray-300 rounded-lg shadow w-44 text-black cursor-pointer">
            <div className="px-4 py-3 text-sm text-gray-900">
                <div className="font-semibold">Hey, {firstName} {lastName}</div>
                <div className=" truncate">{email}</div>
            </div>
            <ul className="py-2 text-sm text-black" aria-labelledby="dropdownUserAvatarButton">
                <li>
                    <div className="block px-4 py-2 hover:bg-gray-300 cursor-pointer font-medium" onClick={() => {
                        navigate(-1)
                    }}>Dashboard</div>
                </li>
                <li>
                    <div className="block px-4 py-2 hover:bg-gray-300 cursor-pointer font-medium" onClick={() => { navigate("/profile?name=" + firstName) }}>Settings</div>
                </li>
            </ul>
            <div className="py-2">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer font-semibold" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }}>Log out</div>
            </div>
        </div>
    );
}