import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./Button";
import { ProfileDropDown } from "./ProfileDropDown";  

export const Appbar = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isDropDownVisible, setIsDropDownVisible] = useState(false); 

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/currentUser", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        }).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        });
    }, []);

    return (
        <div className="bg-gradient-to-r rounded-sm from-blue-600 to-purple-700 shadow-lg flex justify-between items-center h-16 px-6">
            {/* App Name */}
            <div className="text-white font-bold text-xl flex items-center">
                <img src="/favicon_io/android-chrome-512x512.png" className="w-12 rounded-full mx-2" alt="" />
                QuickPay
            </div>

            <div className="flex items-center gap-5 relative">
                {/* Welcome Message */}
                <div className="text-white font-medium ">
                    Welcome {firstName}
                </div>

                {/* Avatar and Dropdown */}
                <div className="relative">
                    <div
                        className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-300"
                        onClick={() => setIsDropDownVisible(!isDropDownVisible)} // Toggle dropdown visibility
                    >
                        {firstName[0]}
                    </div>

                    {isDropDownVisible && (
                        <div className="absolute right-0 mt-2 w-44">
                            <ProfileDropDown firstName={firstName} lastName={lastName} email={email} />
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <Button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin");
                    }}
                    label={"Logout"}
                />
            </div>
        </div>
    );
};
