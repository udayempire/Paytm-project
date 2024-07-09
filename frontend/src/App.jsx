import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { Send } from "./pages/send"
import { Button } from "../src/components/Button"

function App() {
  return (
    <>
    {go}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </>
  )
  function go() {
    const navigate = useNavigate()
    return <div>
      <Button onClick={() => {
        navigate("/signin")
      }} />
  
    </div>
  }
}


export default App
