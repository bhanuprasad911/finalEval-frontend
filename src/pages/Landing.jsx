import React, { useState } from 'react'
import style from "../styles/landing.module.css";
import mainlogo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import play from "../assets/play.svg";
import meeting from "../assets/meeting.png";
import card from "../assets/Card 1.svg";
import graph from "../assets/Graph.svg";
import calender from "../assets/Calendar.svg";
import adobe from "../assets/Adobe.svg";
import airtable from "../assets/Airtable.svg";
import elastic from "../assets/Elastic.svg";
import framer from "../assets/Framer.svg";
import opendoor from "../assets/Opendoor.svg";
import socialmedialogos from "../assets/Socialmedialogos.svg";
import Plan from "./Plan.jsx";
import Chatbot from './Chatbot.jsx';
import chatIcon from '../assets/ChatIcon.svg'


function Landing() {
  const [showBot, setShowBot] = useState(() => {
    const saved = localStorage.getItem('showbot');
    return saved === '1';
  });
  return (
    <div className={style.main}>
          <div className={style.main2}>
            <div className={style.header}>
              <img className={style.mainlogo} src={mainlogo} alt="mainlogo" />
              
            </div>
            <div className={style.uppermainbody}>
              <div className={style.uppermainleft}>
                <h1>
                  Grow Your Business Faster <br />
                  with Hubly CRM
                </h1>
                <p>
                  Manage leads, automate workflows, and close deals effortlessly—all
                  in one powerful platform.
                </p>
                <div className={style.buttons}>
                  <button className={style.start}>Get started</button>
    
                  <Link className={style.playlink}>
                    <div className={style.vidoeplay}>
                      <img className={style.play} src={play} alt="play" />
                      <p className={style.linkp}>watchvideo</p>
                    </div>
                  </Link>
                </div>
              </div>
            <div className={style.uppermainright}>
                <img className={style.meeting} src={meeting} alt="meeting" />
                <img className={style.card} src={card} alt="card" />
                <img className={style.graph} src={graph} alt="graph" />
                <img className={style.calender} src={calender} alt="calender" />
              </div>
            </div>
            <div className={style.upperfoot}>
              <img src={adobe} alt="adobelogo" className={style.adobe} />
              <img src={elastic} alt="elasticlogo" className={style.elastic} />
              <img src={opendoor} alt="opendoorlogo" className={style.opendoor} />
              <img src={airtable} alt="airtablelogo" className={style.airtable} />
              <img src={elastic} alt="elasticlogo" className={style.elastic} />
              <img src={framer} alt="framelogo" className={style.framer} />
            </div>
        </div>


        <div className={style.bot}>
            {showBot &&(<Chatbot/>)}
        <div onClick={()=>{
            setShowBot(prev => {
              const newValue = !prev;
              localStorage.setItem('showbot', newValue ? '1' : '0');
              return newValue;
            });
          
        }} className={style.chatIconbutton}>{
            showBot? (
                <h3>X</h3>
            ):(
                <img className={style.image} src={chatIcon} alt="x" />
            )
            }</div>
        </div>
        </div>
  )
}

export default Landing
