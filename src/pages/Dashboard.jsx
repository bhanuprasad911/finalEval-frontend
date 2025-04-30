import React, { useContext, useEffect, useState } from "react";
import style from "../styles/dashboard.module.css";
import chatlogo from "../assets/sms.svg";
import { fetchusers, sendMessage, membermessagefetch } from "../services/index.js";
import userIcon from "../assets/People.svg";
import { BotCOntext } from "../context/BotContext.jsx";


function Dashboard(props) {
  const currentadmin = JSON.parse(localStorage.getItem('currentadmin')) || {}
  const [activeBtn, setactiveBtn] = useState(1);
  const [users, setusers] = useState([]);
  const [searchtext, setSearchtext] = useState('')
  

  const fetchData = async () => {
    const users = await fetchusers();
    console.log(users);
    setusers(users.data);
  };
   const fetchmembermessage= async()=>{
    const tickets = await membermessagefetch(currentadmin._id)
    console.log(tickets)
    setusers(tickets.data)
   }







  useEffect(() => {
    if(currentadmin.role === 'admin'){
      fetchData();
      return
    }
    fetchmembermessage()
  }, []);

  const resolvedchats = users.filter((user) => {
    return user.status === "resolved";
  });
  const unresolvedchats = users.filter((user) => {
    return user.status !== "resolved";
  });

  const usersWithMessage = users.filter((user) => {
    return user.messages.length > 0;
  });
  const searched = users?.filter(user => user.ticket_id && user.ticket_id.includes(searchtext));


  return (
    <div className={style.main}>
      <h1 className={style.head}>Dashboard</h1>
      <br />
      <br />
      <input
        className={style.searchInput}
        placeholder="Search for chats"
        type="text"
        value={searchtext}
        onChange={(e)=>{
          setSearchtext(e.target.value)
          console.log(e.target.value)
        }}
      />
      <br />
      <br />
      <div className={style.filters}>
        <button
          onClick={() => {
            setactiveBtn(1);
          }}
          className={`${style.filterButton} ${activeBtn == 1 ? style.clicked : ''}`}
          
        >
          <img src={chatlogo} alt="" />
          All Tickets
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            setactiveBtn(2);
          }}
          className={`${style.filterButton} ${activeBtn == 2 ? style.clicked : ''}`}
        >
          Resolved
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            setactiveBtn(3);
          }}
          className={`${style.filterButton} ${activeBtn == 3 ? style.clicked : ''}`}
          
        >
          Unresolved
        </button>
        <br />
        <br />
      </div>

      <div className={style.line}></div>


      {
        searchtext && searchtext.length > 0 && (
          
          <div>
          {searched.map((user, index)=>{
            return(
              <div
              key={index}
              className={style.chat}
              onClick={() => {
                localStorage.setItem("activechat", JSON.stringify(user));
                // console.log(activeuser);
              }}
            >
              <div className={style.ticketdetails}>
                <div className={style.names}>
                  <h3 className={style.ticketid}>{user.ticket_id}</h3> <br />
                  <p>{user?.messages[0]?.message}</p>
                </div>
                <div className={style.time}>
                  <p className={style.date}>
                    posted at{" "}
                    {new Date(Date.parse(user.createdAt)).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                  <br />

                  <p className={style.hourtime}>
                    {Math.floor(
                      (new Date() - new Date(user.createdAt)) /
                        (1000 * 60 * 60)
                    )}
                    :00
                  </p>
                </div>
              </div>
              <div className={style.linediv}></div>
              <div className={style.userDetails}>
                <div className={style.details}>
                  <div className={style.logo}>
                    <img src={userIcon} alt="logo" />
                  </div>
                  <div className={style.name}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </div>
                </div>
                <p
                  className={style.openlink}
                  onClick={() => {
                    localStorage.setItem("selected", JSON.stringify(user));
                    localStorage.setItem("activeTab", 2);
                    props.setactiveelement(2);
                  }}
                >
                  Open Ticket
                </p>
              </div>

              {/* <h1>{user.name}</h1> */}
            </div>
            )
          })}
          </div>
        )
      }

      {activeBtn === 1 && usersWithMessage.length > 0 && searchtext.length === 0 && (
        <div className={style.allchats}>
          {usersWithMessage.map((user, index) => {
            return (
              <div
                key={index}
                className={style.chat}
                onClick={() => {
                  localStorage.setItem("activechat", JSON.stringify(user));
                  // console.log(activeuser);
                }}
              >
                <div className={style.ticketdetails}>
                  <div className={style.names}>
                    <h3 className={style.ticketid}>{user.ticket_id}</h3> <br />
                    <p>{user.messages[0].message}</p>
                  </div>
                  <div className={style.time}>
                    <p className={style.date}>
                      posted at{" "}
                      {new Date(Date.parse(user.createdAt)).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </p>
                    <br />

                    <p className={style.hourtime}>
                      {Math.floor(
                        (new Date() - new Date(user.createdAt)) /
                          (1000 * 60 * 60)
                      )}
                      :00
                    </p>
                  </div>
                </div>
                <div className={style.linediv}></div>
                <div className={style.userDetails}>
                  <div className={style.details}>
                    <div className={style.logo}>
                      <img src={userIcon} alt="logo" />
                    </div>
                    <div className={style.name}>
                      <h2>{user.name}</h2>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <p
                    className={style.openlink}
                    onClick={() => {
                      localStorage.setItem("selected", JSON.stringify(user));
                      localStorage.setItem("activeTab", 2);
                      props.setactiveelement(2);
                    }}
                  >
                    Open Ticket
                  </p>
                </div>

                {/* <h1>{user.name}</h1> */}
              </div>
            );
          })}
        </div>
      )}
      {activeBtn === 2 && (
        <div className={style.resolved}>
          {resolvedchats.map((user, index) => {
            return (
              <div
                key={index}
                className={style.chat}
                onClick={() => {
                  localStorage.setItem("activechat", JSON.stringify(user));
                  // console.log(activeuser);
                }}
              >
                <div className={style.ticketdetails}>
                  <div className={style.names}>
                    <h3 className={style.ticketid}>{user.ticket_id}</h3> <br />
                    <p>{user.messages[0].message}</p>
                  </div>
                  <div className={style.time}>
                    <p className={style.date}>
                      posted at{" "}
                      {new Date(Date.parse(user.createdAt)).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </p>
                    <br />

                    <p className={style.hourtime}>
                      {Math.floor(
                        (new Date() - new Date(user.createdAt)) /
                          (1000 * 60 * 60)
                      )}
                      :00
                    </p>
                  </div>
                </div>
                <div className={style.linediv}></div>
                <div className={style.userDetails}>
                  <div className={style.details}>
                    <div className={style.logo}>
                      <img src={userIcon} alt="logo" />
                    </div>
                    <div className={style.name}>
                      <h2>{user.name}</h2>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <p
                    className={style.openlink}
                    onClick={() => {
                      localStorage.setItem("selected", JSON.stringify(user));
                      localStorage.setItem("activeTab", 2);
                      props.setactiveelement(2);
                    }}
                  >
                    Open Ticket
                  </p>
                </div>

                {/* <h1>{user.name}</h1> */}
              </div>
            );
          })}
        </div>
      )}
      {activeBtn === 3 && (
        <div className={style.unresolved}>
          {unresolvedchats.map((user, index) => {
            return (
              <div
              key={index}
              className={style.chat}
              onClick={() => {
                localStorage.setItem("activechat", JSON.stringify(user));
                // console.log(activeuser);
              }}
            >
              <div className={style.ticketdetails}>
                <div className={style.names}>
                  <h3 className={style.ticketid}>{user.ticket_id}</h3> <br />
                  <p>{user.messages[0].message}</p>
                </div>
                <div className={style.time}>
                  <p className={style.date}>
                    posted at{" "}
                    {new Date(Date.parse(user.createdAt)).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                  <br />

                  <p className={style.hourtime}>
                    {Math.floor(
                      (new Date() - new Date(user.createdAt)) /
                        (1000 * 60 * 60)
                    )}
                    :00
                  </p>
                </div>
              </div>
              <div className={style.linediv}></div>
              <div className={style.userDetails}>
                <div className={style.details}>
                  <div className={style.logo}>
                    <img src={userIcon} alt="logo" />
                  </div>
                  <div className={style.name}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </div>
                </div>
                <p
                  className={style.openlink}
                  onClick={() => {
                    localStorage.setItem("selected", JSON.stringify(user));
                    localStorage.setItem("activeTab", 2);
                    props.setactiveelement(2);
                  }}
                >
                  Open Ticket
                </p>
              </div>

              {/* <h1>{user.name}</h1> */}
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
