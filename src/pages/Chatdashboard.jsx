import React, { useEffect, useState } from "react";
import cloud from "../assets/cloud.svg";
import style from "../styles/chatdashboard.module.css";
import { LiaUserCircle } from "react-icons/lia";
import { GoHome } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { IoStatsChart, IoSettingsOutline } from "react-icons/io5";
import { RiRobot3Line, RiTeamFill } from "react-icons/ri";
import Team from "./Team.jsx";
import Settings from "./Settings.jsx";
import Dashboard from "./Dashboard.jsx";
import Contactcenter from "./Contactcenter.jsx";
import Bot from "./Bot.jsx";
import Analytics from "./Analytics.jsx";
import { useNavigate } from "react-router-dom";


function Chatdashboard(props) {
  const navigate = useNavigate()
  const [active, setActive] = useState(Number(localStorage.getItem('activeTab')) || 1);
  const [activeuser] = useState(() => {
      try {
        const stored = localStorage.getItem("activeuser");
        return stored && stored !== "undefined" ? JSON.parse(stored) : null;
      } catch (err) {
        console.error("Failed to parse activeuser:", err);
        return null;
      }
    });

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/', {replace:true});
      }
    }, []);

  return (
    <div className={style.main}>
      <div className={style.nav}>
        <div className={style.uppernav}>
          <div className={style.mainlogo}>
            <img src={cloud} alt="" className={style.dashboardtoplogo} />
          </div>
          <div className={style.navlinks}>
            <button
              className={style.showbutton}
              onClick={() => {
                setActive(1);
                localStorage.setItem('activeTab', 1);
              }}
            >
              <GoHome/>
              {active === 1 && <p className={style.p}>Dashboard</p>}
            </button>
            <button
              className={style.showbutton}
              onClick={() => {
                setActive(2);
                localStorage.setItem('activeTab', 2);
              }}
            >
              <MdOutlineMessage/>
              {active === 2 && <p className={style.p}>Contact Center</p>}
            </button>

            <button
              className={style.showbutton}
              onClick={() => {
                setActive(3);
                localStorage.setItem('activeTab', 3);
              }}
            >
              <IoStatsChart/>
              {active === 3 && <p className={style.p}>Analytics</p>}
            </button>

            <button
              className={style.showbutton}
              onClick={() => {
                setActive(4);
                localStorage.setItem('activeTab', 4);
              }}
            >
              <RiRobot3Line/>
              {active === 4 && <p className={style.p}>Chat bot</p>}
            </button>

            <button
              className={style.showbutton}
              onClick={() => {
                setActive(5);
                localStorage.setItem('activeTab', 5);
              }}
            >
             <RiTeamFill/>
              {active === 5 && <p className={style.p}>Team</p>}
            </button>

            <button
              className={style.showbutton}
              onClick={() => {
                setActive(6);
                localStorage.setItem('activeTab', 6);
              }}
            >
              <IoSettingsOutline/>
              {active === 6 && <p className={style.p}>Setting</p>}
            </button>
          </div>
        </div>
        <LiaUserCircle   onClick={()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('currentadmin')
          localStorage.removeItem('activechat')
          localStorage.removeItem('selected')
          navigate('/')
        }} style={
          {fontSize:'x-large'}
        }/>
      </div>
      <div className={style.body}>
        {active === 1 && <Dashboard setactiveelement={setActive} />}
        {active===2 &&  <Contactcenter />}
        {active === 3 && <Analytics />}
        {active === 4 && <Bot />}
        {active === 5 &&  <Team />}
        {active === 6 && <Settings />}
      </div>
    </div>
  );
}

export default Chatdashboard;
