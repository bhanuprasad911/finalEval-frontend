import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import style from "./styles/App.module.css";
import Mainpage from "./pages/Mainpage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chatdashboard from "./pages/Chatdashboard.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import { BotContextProvider } from "./context/BotContext.jsx";
import Landing from "./pages/Landing.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <BrowserRouter>
        <BotContextProvider>
          <AppWithUnloadHandler />
        </BotContextProvider>
      </BrowserRouter>
    </>
  );
}

function AppWithUnloadHandler() {

   
   


  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Chatdashboard />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
  );
}

export default App;
