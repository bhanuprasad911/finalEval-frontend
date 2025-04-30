import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.0.15:8001");

export const BotCOntext = createContext();

export const BotContextProvider = ({ children }) => {
  const [selectedheadercolor, setSelectedheadercolor] = useState(localStorage.getItem('selectedheadercolor') || '#33475B');
  const [defaultDesc, setdefaultDesc] = useState(localStorage.getItem('defaultdesc') || "Want to chat with hubly? I'm an chatbot here to help you find your way");
  const [welcomemessage1, setWelcomeMessaage1] = useState(localStorage.getItem('welcomemessage1') || "Hello, How can I help you?");
  const [welcomemessage2, setWelcomeMessaage2] = useState(localStorage.getItem('welcomemessage2') || "Ask me anything");
  const [selectedbodycolor, setselectedbodycolor] = useState(localStorage.getItem('selectedbodycolor') || "#E8E8E8");
  const [missedChatTimer, setMissedChatTimer] = useState(localStorage.getItem('missedchat') || null);

  const botconfig = {
    headercolor: selectedheadercolor,
    welcomemessages: [welcomemessage1, welcomemessage2],
    bodycolor: selectedbodycolor,
    defaultmessages: defaultDesc,
    missedChat: missedChatTimer
  };

 
  useEffect(() => {
    socket.emit("updateConfig", botconfig);
  }, [selectedheadercolor, selectedbodycolor, welcomemessage1, welcomemessage2, defaultDesc, missedChatTimer]);


  useEffect(() => {
    socket.on("configUpdated", (newConfig) => {
      if (newConfig) {
        setSelectedheadercolor(newConfig.headercolor);
        localStorage.setItem("selectedheadercolor", newConfig.headercolor);

        setselectedbodycolor(newConfig.bodycolor);
        localStorage.setItem("selectedbodycolor", newConfig.bodycolor);

        setWelcomeMessaage1(newConfig.welcomemessages[0]);
        localStorage.setItem("welcomemessage1", newConfig.welcomemessages[0]);

        setWelcomeMessaage2(newConfig.welcomemessages[1]);
        localStorage.setItem("welcomemessage2", newConfig.welcomemessages[1]);

        setdefaultDesc(newConfig.defaultmessages);
        localStorage.setItem("defaultdesc", newConfig.defaultmessages);

        setMissedChatTimer(newConfig.missedChat);
        localStorage.setItem("missedchat", newConfig.missedChat);
      }
    });

    return () => {
      socket.off("configUpdated");
    };
  }, []);

  return (
    <BotCOntext.Provider
      value={{
        setSelectedheadercolor,
        setdefaultDesc,
        setWelcomeMessaage1,
        setWelcomeMessaage2,
        setselectedbodycolor,
        setMissedChatTimer,
        missedChatTimer,
        selectedbodycolor,
        selectedheadercolor,
        welcomemessage1,
        welcomemessage2,
        defaultDesc,
        botconfig,
      }}
    >
      {children}
    </BotCOntext.Provider>
  );
};
