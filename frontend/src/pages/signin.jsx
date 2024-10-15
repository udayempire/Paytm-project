import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 p-0 m-0 flex justify-center items-center w-screen h-screen">
      <div className="bg-white shadow-xl p-10 rounded-md max-w-md w-full">
        <div className="flex flex-col justify-center items-center gap-6">
        <img src="/favicon_io/android-chrome-512x512.png"  className="w-24 rounded-full mx-2" alt="" />
          <Heading label={"Sign In"} className="text-center text-blue-800" />
          <SubHeading
            label="Access your QuickPay account securely"
            className="text-center text-gray-600"
          />
          
          <div className="relative">
            <InputBox
              label="Username"
              placeholder="Enter your username"
              className="pl-10"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="relative flex">
            <InputBox
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="pl-10"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button
            label="Sign In"
            className="bg-blue-600 text-white py-3 mt-4 hover:bg-blue-700 transition-all"
            onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password,
              });
              localStorage.setItem("token", "Bearer " + response.data.token);
              navigate("/dashboard?username=" + username);
            }}
          />

          <ButtonWarning
            label="Don't Have an Account?"
            buttonText="Sign Up"
            className="mt-4"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};
