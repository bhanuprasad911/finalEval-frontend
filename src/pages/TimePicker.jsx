import React, { useEffect, useState } from "react";
import styles from "../styles/timepicker.module.css";
import { useContext } from "react";
import { BotCOntext } from "../context/BotContext";
import { toast } from "react-toastify";

const TimePicker = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("00");
  const { missedChatTimer, setMissedChatTimer } = useContext(BotCOntext);

  const setTimer = () => {
    const totalMilliseconds =
      parseInt(hours) * 3600000 +
      parseInt(minutes) * 60000 +
      parseInt(seconds) * 1000;
    setMissedChatTimer(totalMilliseconds);
    toast.success(`the missed chat timer is : ${totalMilliseconds}`);
    localStorage.setItem("missedchat", missedChatTimer);
  };

  const generateOptions = (max) =>
    Array.from({ length: max }, (_, i) => String(i).padStart(2, "0"));

  return (
    <div className={styles.timepickerContainer}>
      <select
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className={styles.selector}
      >
        {generateOptions(24).map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span className={styles.colon}>:</span>
      <select
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        className={styles.selector}
      >
        {generateOptions(60).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <span className={styles.colon}>:</span>
      <select
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        className={styles.selector}
      >
        {generateOptions(60).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        className={styles.timesave}
        onClick={() => {
          setTimer();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default TimePicker;
