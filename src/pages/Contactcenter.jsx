import React, { useState, useEffect, useContext } from "react";
import {
  fetchusers,
  sendMessage,
  updatestatus,
  fetchTeamMembers,
  assignChat,
  membermessagefetch,
  updatemissed
} from "../services/index.js";
import style from "../styles/chatcenter.module.css";
import people from "../assets/People.svg";
// import johndoe from "../assets/johndoe.svg";
import chaticon from "../assets/Icon.svg";
import sendIcon from "../assets/Send2.svg";

import {
  MdOutlineMessage,
  MdOutlinePermContactCalendar,
  MdOutlinePhone,
} from "react-icons/md";

import johndoe from "../assets/johndoe.svg";
import Select from "react-select";
import { BotCOntext } from "../context/BotContext.jsx";

function Contactcenter() {
  const [currentadmin, setCurrentAdmin] = useState(
    JSON.parse(localStorage.getItem("currentadmin")) || {}
  );
  const [assignedTo, setAssignedTo] = useState(null);
  const [team, setTeam] = useState([]);
  const { missedChatTimer } = useContext(BotCOntext);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("selected"))
  );
  const [status, setStatus] = useState("");

  const id = selected ? selected._id : null;

  const [newmessage, setMessage] = useState({
    message: "",
    sender: "bot",
    receiver: "user",
  });

  const fetchmembers = async () => {
    const response = await fetchTeamMembers(currentadmin._id);
    setTeam(response.teamMembers);
    console.log(response);

    return;
  };
  // console.log(team);

  const fetchCurrentDate = async(user)=>{
    const dateobj = user.ticket_id.slice(-8)
    const created = new Date(user.createdAt);
    const now = Date.now(); 
    const difference = now - created.getTime(); 
    if (difference>missedChatTimer && user.isMissed === false){
      const response = await updatemissed(user._id, dateobj)
      console.log(response)
    }
    else if (user.isMissed === true){
      console.log('already marked as missed')
    }
    else{
      console.log('not missed chat')
    }
    console.log(`Difference: ${difference} ms`);
    console.log(`missed chat timer: ${missedChatTimer} ms`)
    console.log(dateobj)
  }

  useEffect(() => {
    fetchmembers();
    
  }, [currentadmin]);


  

  const options = team.map((member) => ({
    value: member._id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={johndoe} style={{ width: 24, height: 24, marginRight: 8 }} />
        {member.fullname}
      </div>
    ),
  }));

  const assignToMember = async () => {
    const response = await assignChat(assignedTo, id);
    setSelected(response.data.assignedChat);
    localStorage.setItem(
      "selected",
      JSON.stringify(response.data.assignedChat)
    );
    setAssignedTo("");
    console.log(response);
  };

  const fetchData = async () => {
    const users = await fetchusers();
    // console.log('users',users);
    const userfromlocalstorage = JSON.parse(localStorage.getItem("selected"));
    const user = users.data.find(
      (user) => user.email === userfromlocalstorage.email
    );
    // console.log('userfromlocalstorage', userfromlocalstorage)
    // console.log('user',user)
    setSelected(user);
    setUsers(users.data);
    return;
  };

  const fetchmembermessage= async()=>{
      const tickets = await membermessagefetch(currentadmin._id)
      console.log(tickets)
      setUsers(tickets.data)
     }

  useEffect(() => {
    if(currentadmin.role === 'admin'){
      fetchData();
      return
    }
    fetchmembermessage()
  }, []);

  const handleUpdateStatus = async () => {
    if (status === selected.status) {
      setStatus("");
      alert(`this chat is already ${selected.status} `);
      return;
    }

    const response = await updatestatus({ id, status });
    const updated = { ...selected, status: status };
    localStorage.setItem("selected", JSON.stringify(updated));
    setSelected(updated);
    setStatus("");
    console.log(response);

    alert(response.message);
  };

  const handlesendMessage = async () => {
    if (newmessage.message.trim().length === 0){
      alert('Please enter the message')
      return
    }
    const res = await sendMessage({ id, message: newmessage });
    const updatedMessages = [...selected.messages, newmessage];
    const updated = { ...selected, messages: updatedMessages };

    setSelected(updated);
    localStorage.setItem("selected", JSON.stringify(updated));
    setMessage({ ...newmessage, message: "" });
    console.log(res);
  };

  const handleChange = (e) => {
    setMessage({ ...newmessage, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.main}>
      <div className={style.messageaccounts}>
        <h3 className={style.head}>Contact center</h3>
        <br />
        <br />
        <p className={style.innerhead}>chats</p>
        <div className={style.line}></div>
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className={`${style.border} ${
                selected && selected.email === user.email
                  ? style.active
                  : style.border
              }`}
            >
              <div
                className={`${style.single} ${
                  selected && selected.email === user.email
                    ? style.background
                    : style.single
                }`}
                onClick={() => {
                  localStorage.setItem("selected", JSON.stringify(user));
                  setSelected(user);
                  // window.location.reload()
                  fetchCurrentDate(user)
                }}
              >
                <img src={people} alt="people" />
                <div className={style.names}>
                  <p
                    style={{
                      color: "#5e9bd5",
                    }}
                  >
                    {user.name}
                  </p>
                  <p>{user?.messages[0]?.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.chatbody} >
        {selected ? (
          selected.assignedTo?.length > 0 &&
          selected.assignedTo != currentadmin._id ? (
            <p>You no longer have access to this chat</p>
          ) : (
            <>
            {
              selected.status==='resolved'?(<p>This chat has been closed</p>):(<>
              
              <div className={style.chathead}>
                <p>{selected.ticket_id}</p>
              </div>
              <div className={style.line}></div>

              <div className={style.chats}>
                  {selected?.messages?.map((message, index) => (
                    <div
                      className={
                        message.sender === "user" ? style.user : style.bot
                      }
                      key={index}
                    >
                      {message.sender === "bot" ? (
                        <>
                          <p>{message.message}</p>
                          <img src={chaticon} alt="" />
                        </>
                      ) : (
                        <>
                          <img src={johndoe} alt="" />
                          <p>{message.message}</p>
                        </>
                      )}
                    </div>
                  ))

                }
              </div>

              <div className={style.userinput}>
                <textarea
                  className={style.sendMessage}
                  placeholder="Type here"
                  name="message"
                  value={newmessage.message}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                <button
                  className={style.sendButton}
                  onClick={handlesendMessage}
                >
                  <img src={sendIcon} alt="" />
                </button>
              </div>
              </>)
            }
            </>
          )
        ) : (
          <p>No selected chat</p>
        )}
      </div>
      <div className={style.userdetails}>
        {selected ? (
          <>
            <div className={style.userdetailsname}>
              <img src={people} alt="" />
              <p>{selected.name}</p>
            </div>
            <br />
            <br />
            <p
              style={{
                color: "#184e7f",
              }}
            >
              Details
            </p>
            <div className={style.details}>
              <div className={style.number}>
                <MdOutlinePermContactCalendar />
                <p>{selected.name}</p>
              </div>
              <div className={style.number}>
                <MdOutlinePhone />
                <p>{`+91 ${selected.phone}`}</p>
              </div>
              <div className={style.number}>
                <MdOutlineMessage />
                <p>{selected.email}</p>
              </div>
            </div>
            <br />
            <br />
            <p
              style={{
                color: "#184e7f",
              }}
            >
              Team members
            </p>
            <br />
            <Select
              options={options}
              value={assignedTo}
              onChange={(e) => {
                setAssignedTo(e.value);
                console.log(e.value);
                console.log(id, selected.name);
              }}
            />
            {assignedTo && (
              <div className={style.statusresolved}>
                <p>Chat would be assigned to different team member</p>
                <div className={style.buttons}>
                  <button
                    onClick={() => {
                      assignToMember();
                    }}
                    className={style.confirm}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setAssignedTo("");
                    }}
                    className={style.close}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <br />
            <br />
            <select
              className={style.selectstatus}
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled hidden>
                Ticket status
              </option>
              <option className={style.option1} value="resolved">
                Resolved
              </option>
              <option value="unresolved">Unresolved</option>
            </select>
            {status.length > 0 && (
              <div className={style.statusresolved}>
                <p>{`The chat will be changed to ${status}`}</p>
                <div className={style.buttons}>
                  <button
                    onClick={() => {
                      handleUpdateStatus();
                    }}
                    className={style.confirm}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setStatus("");
                    }}
                    className={style.close}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>No chat selected</p>
        )}
      </div>
    </div>
  );
}

export default Contactcenter;
