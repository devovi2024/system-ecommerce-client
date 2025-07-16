import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App () {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>

      <Toaster/>
    </div>

    
  )
}

export default App