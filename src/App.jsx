import { BrowserRouter, Route, Routes } from "react-router-dom";
import style from "./styles/App.module.css";
import Mainpage from "./pages/Mainpage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Chatdashboard from "./pages/Chatdashboard.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import { BotContextProvider } from "./context/BotContext.jsx";
import Landing from "./pages/Landing.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <BotContextProvider>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Chatdashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </BotContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
