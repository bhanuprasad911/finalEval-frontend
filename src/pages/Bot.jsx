import React, { useContext, useState } from "react";
import style from "../styles/bot.module.css";
import chaticon from "../assets/Icon.svg";
import send from "../assets/Send.svg";
import { BotCOntext } from "../context/BotContext";
import TimePicker from "./TimePicker.jsx";
TimePicker;

function Bot() {
  const {
    setSelectedheadercolor,
    setdefaultDesc,
    setWelcomeMessaage1,
    setWelcomeMessaage2,
    setselectedbodycolor,
    selectedbodycolor,
    selectedheadercolor,
    welcomemessage1,
    welcomemessage2,
    defaultDesc,
    botconfig,
  } = useContext(BotCOntext);

  return (
    <div className={style.main}>
      <div className={style.left}>
        <div className={style.preview}>
          <div
            style={{
              backgroundColor: selectedheadercolor,
            }}
            className={style.head}
          >
            <img src={chaticon} alt="chat icon" />
            <h2 className={style.chattitle}>Hubly</h2>
          </div>

          <div
            style={{
              backgroundColor: selectedbodycolor,
            }}
            className={style.body}>
            <div className={style.welcome}>
              <img src={chaticon} alt="" />
              <div>
                {botconfig.welcomemessages.map((message, index) => (
                  <p className={style.messagep} key={index}>
                    {message}
                  </p>
                ))}
              </div>
            </div>

            <div className={style.userInput}>
                          <img className={style.inputimage} src={chaticon} alt="" />
                          <div className={style.innerinput}>
                            <p>introduce yourself</p>
                            <br />
                            <label htmlFor="name">Your name</label>
                            <br />
                            <input
                              name="name"
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
            
                            <button className={style.submit}>
                              Thank You
                            </button>
                          </div>
                        </div>
          </div>

          <div className={style.message}>
            <textarea
              className={style.messagetext}
              placeholder="write a message"
              name="message"
              id=""
            ></textarea>
            <button className={style.sendbutton}>
              <img src={send} alt="hello" />
            </button>
          </div>
        </div>
        <div className={style.welcomemessage}>
          <img src={chaticon} alt="" />
          <br />
          <p
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            className={style.welcome}
          >
            {defaultDesc}
          </p>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.headbackground}>
          <p>Header color</p>
          <div className={style.headercolors}>
            <div
              onClick={() => {
                setSelectedheadercolor("#FFFFFF");
                localStorage.setItem("selectedheadercolor", "#FFFFFF");
              }}
              className={style.hc1}
            >
              A
            </div>
            <div
              onClick={() => {
                setSelectedheadercolor("#000000");
                localStorage.setItem("selectedheadercolor", "#000000");
              }}
              className={style.hc2}
            >
              B
            </div>
            <div
              onClick={() => {
                setSelectedheadercolor("#33475B");
                localStorage.setItem("selectedheadercolor", "#33475B");
              }}
              className={style.hc3}
            >
              C
            </div>
          </div>
          <div className={style.colorvalue}>
            <div
              style={{
                backgroundColor: selectedheadercolor,
                color: selectedheadercolor,
              }}
              className={style.hc}
            >
              D
            </div>
            <input type="text" value={selectedheadercolor} readOnly />
          </div>
        </div>

        <div className={style.bodybackround}>
          <p>Custom background color</p>
          <div className={style.headercolors}>
            <div
              onClick={() => {
                setselectedbodycolor("#FFFFFF");
                localStorage.setItem("selectedbodycolor", "#FFFFFF");
              }}
              className={style.hc1}
            >
              A
            </div>
            <div
              onClick={() => {
                setselectedbodycolor("#E8E8E8");
                localStorage.setItem("selectedbodycolor", "#E8E8E8");
              }}
              className={style.bc}
            >
              B
            </div>
            <div
              onClick={() => {
                setselectedbodycolor("#000000");
                localStorage.setItem("selectedbodycolor", "#000000");
              }}
              className={style.hc2}
            >
              C
            </div>
          </div>
          <div className={style.colorvalue}>
            <div
              style={{
                backgroundColor: selectedbodycolor,
                color: selectedbodycolor,
              }}
              className={style.hc}
            >
              D
            </div>
            <input type="text" value={selectedbodycolor} readOnly />
          </div>
        </div>
        <div className={style.defaultmessage}>
          <p>Default message</p>
          <input
            className={style.customMessage}
            type="text"
            value={welcomemessage1}
            onChange={(e) => {
              setWelcomeMessaage1(e.target.value);
              localStorage.setItem("welcomemessage1", e.target.value);
            }}
          />
          <input
            className={style.customMessage}
            type="text"
            value={welcomemessage2}
            onChange={(e) => {
              setWelcomeMessaage2(e.target.value);
              localStorage.setItem("welcomemessage2", e.target.value);
            }}
          />
        </div>
        <div className={style.userdetails}>
        <div className={style.userInput}>
                          <div className={style.innerinput}>
                            <p>INtroduction form</p>
                            <br />
                            <label htmlFor="name">Your name</label>
                            <br />
                            <input
                              name="name"
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
                              type="text"
                              placeholder="+91 000 000 0000"
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
                              placeholder="example@gmail.com"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <br />
            
                            <button className={style.submit}>
                              Thank You
                            </button>
                          </div>
                        </div>
        </div>
        <div className={style.editmessage}>
          <p>Welcome message</p>
          <div className={style.textareadiv}>
            <p
              style={{
                fontSize: "x-small",
                marginLeft: "80%",
                overflow: "auto",
              }}
            >
              {175 - defaultDesc.length}/175
            </p>
            <textarea
              className={style.textarea}
              maxLength={175}
              value={defaultDesc}
              onChange={(e) => {
                setdefaultDesc(e.target.value);
                localStorage.setItem("defaultdesc", e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className={style.missedchat}>
          <p>Missed chat timer</p>
          <TimePicker />
        </div>
      </div>
    </div>
  );
}

export default Bot;
