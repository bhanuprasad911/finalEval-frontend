import React, { useState, useEffect, useContext } from "react";
import style from "../styles/chatbot.module.css";
import send from "../assets/Send.svg";
import chaticon from "../assets/Icon.svg";
import { addEndUser, sendMessage, fetchusers } from "../services";
import { BotCOntext } from "../context/BotContext";
import johndoe from "../assets/johndoe.svg";
import { toast } from "react-toastify";

function Chatbot() {
  const { botconfig } = useContext(BotCOntext);
  const [currentUser, setCurrentuser] = useState(() => {
    try {
      const stored = localStorage.getItem("currentuser");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Failed to parse activeuser:", err);
      return null;
    }
  });

  const [allusers, setallusers] = useState(null);
  const id = currentUser ? currentUser._id : null;

  const fetchData = async () => {
    const users = await fetchusers();
    console.log(users);
    setallusers(users.data);
    const matchedUser = users.data.find((user) => user._id === id);

    setCurrentuser(matchedUser);
    localStorage.setItem("currentuser", JSON.stringify(matchedUser));
  };

  useEffect(() => {
    fetchData();
    console.log(botconfig);
  }, []);

  const date = new Date();

  const timeDateString =
    date.getHours().toString().padStart(2, "0") +
    date.getMinutes().toString().padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0") +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getFullYear().toString();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    assignedTo: null,
    ticket_id: `Ticket # ${timeDateString}`,
  });

  const [newmessage, setMessage] = useState({
    message: "",
    sender: "user",
    receiver: "bot",
  });

  const hanndleMessageChange = (e) => {
    setMessage({ ...newmessage, message: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handlesendMessage = async () => {
    if (!currentUser) {
      toast.error("please register yourself first");
      return;
    } else if (newmessage.message.trim().length === 0) {
      toast.error("please enter the message");
      return;
    }
    const response = await sendMessage({ id, message: newmessage });
    const updatedUser = {
      ...currentUser,
      messages: [...currentUser.messages, newmessage],
    };

    setCurrentuser(updatedUser);
    localStorage.setItem("currentuser", JSON.stringify(updatedUser));
    setMessage({ message: "", sender: "user", receiver: "bot" });
    console.log(response);
  };

  const handleSubmit = async () => {
    if (
      formdata.name.trim().length === 0 ||
      formdata.email.trim().length === 0 ||
      formdata.phone.trim().length === 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (Array.isArray(allusers)) {
      const exist = allusers.find((user) => user.email === formdata.email);
      if (exist) {
        setCurrentuser(exist);
        localStorage.setItem("currentuser", JSON.stringify(exist));
        console.log(exist);
        return;
      }
    } else {
      console.error("allusers not loaded yet");
    }

    try {
      const response = await addEndUser(formdata);
      console.log(response);
      toast.success("Registered succesfully");
      setCurrentuser(response.data);
      localStorage.setItem("currentuser", JSON.stringify(response.data));
      console.log(formdata);
      setFormdata({
        name: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.mainchat}>
        <div
          style={{ backgroundColor: botconfig.headercolor }}
          className={style.head}
        >
          <img src={chaticon} alt="chat icon" />
          <h2 className={style.chattitle}>Hubly</h2>
        </div>
        <div
          style={{
            backgroundColor: botconfig.bodycolor,
          }}
          className={style.body}
        >
          {currentUser?.messages?.length > 0 &&
            currentUser.messages.map((item, index) => (
              <div
                className={item.sender === "user" ? style.user : style.bot}
                key={index}
              >
                {item.sender === "bot" ? (
                  <img src={chaticon} alt="" />
                ) : (
                  <img src={johndoe} alt="" />
                )}
                <p>{item.message}</p>
              </div>
            ))}

          {currentUser &&
            currentUser.messages.length === 0 &&
            botconfig.welcomemessages.map((message, index) => (
              <div className={style.bot} key={index}>
                <img src={chaticon} alt="" />
                <p>{message}</p>
              </div>
            ))}
          {currentUser && currentUser.messages.length === 0 && (
            <p style={{ alignSelf: "center" }}>Start a conversation</p>
          )}

          {!currentUser ? (
            <div className={style.userInput}>
              <img className={style.inputimage} src={chaticon} alt="" />
              <div className={style.innerinput}>
                <p>introduce yourself</p>
                <br />
                <label htmlFor="name">Your name</label>
                <br />
                <input
                  name="name"
                  value={formdata.name}
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />
                <br />
                <label htmlFor="mobile">Your mobile</label>
                <br />
                <input
                  name="phone"
                  value={formdata.phone}
                  type="text"
                  placeholder="your mobile"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />
                <br />
                <label htmlFor="email">Your email</label>
                <br />
                <input
                  name="email"
                  type="text"
                  placeholder="Your email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />

                <button onClick={handleSubmit} className={style.submit}>
                  Thank You
                </button>
              </div>
            </div>
          ) : (
            <div className={style.next}></div>
          )}
        </div>
        <div className={style.message}>
          <textarea
            value={newmessage.message}
            onChange={(e) => {
              hanndleMessageChange(e);
            }}
            className={style.messagetext}
            placeholder="write a message"
            name="message"
          ></textarea>
          <button
            onClick={() => {
              handlesendMessage();
              fetchData();
            }}
            className={style.sendbutton}
          >
            <img src={send} alt="hello" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
