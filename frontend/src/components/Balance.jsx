import { useState, useEffect } from "react";
import axios from "axios";
import { FaWallet } from "react-icons/fa"; // FontAwesome wallet icon

export const Balance = () => {
    const [balance, setBalance] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setBalance(response.data.Balance.toFixed(2));
        });
    }, [balance]);

    return (
        <div className="flex mt-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <div className="flex items-center gap-3">
                    {/* Wallet Icon */}
                    <FaWallet className="text-blue-500 text-4xl" />
                    {/* Balance Label */}
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Available Balance</p>
                        <h1 className="text-xl font-bold text-gray-900">₹ {balance}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
