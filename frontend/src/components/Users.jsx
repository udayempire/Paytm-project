import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";


function InputBox({ placeholder, onChange }) {
    return (
        <div className="mb-4">
            <input
                onChange={onChange}
                type="text"
                placeholder={placeholder}
                className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">Send Money to Users</h1>

                <InputBox
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder={`Enter the username`}
                />
            </div>
            <div className="grid grid-cols-1 gap-6">
                {users.map(user => <User key={user.username} user={user} />)}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="flex justify-center items-center rounded-full bg-blue-500 h-12 w-12 text-white text-lg font-bold">

                    {user.firstName[0]}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">{user.firstName} {user.lastName}</span>
                    <span className="text-gray-500 text-sm">{user.username}</span>
                </div>
            </div>
            <div>
                <Button
                    onClick={() => {
                        navigate("/send?name=" + user.firstName + "&username=" + user.username);
                    }}
                    label="Send Money"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                />
            </div>
        </div>
    );
}
