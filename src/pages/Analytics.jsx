import React, { useEffect, useState } from "react";
import Progress from "react-circle-progress-bar";
import style from "../styles/analytics.module.css";
import { fetchusers } from "../services/index.js";
import ChartComponent from "./ChartComponent.jsx";


function Analytics() {
  const [resolveCount, setresolvedCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);

  const getUsers = async () => {
    const response = await fetchusers();
    // setCount(response.data.length)
    console.log(response);
    console.log(response.data.length);
    const resolved = response.data.filter((user) => user.status === "resolved");
    setChatCount(response.data.length);
    setresolvedCount(Math.ceil((resolved.length / response.data.length) * 100));
  };

  useEffect(() => {
    getUsers();
  });
  return (
    <div className={style.main}>
      <h2 style={{ fontWeight: "500", color: " #6a6b70" }}>Analytics</h2><br />
      <div className={style.graph}>
        <p>Missed chats</p><br />
        <ChartComponent />
      </div>
      <div className={style.average}>
        <div className={style.circletext}>
        <h1 style={
          { color: "#00d907",fontWeight: "400"}
        }>Average Reply time</h1><br />
        <p>
          For highest customer satisfaction rates you should aim to reply to an
          incoming customer's message in 15 <br /> seconds or less. Quick
          responses will get you more conversations, help you earn customers
          trust and <br /> make more sales.
        </p>

        </div>
        <h1 style={ { color: "#00d907",fontWeight: "400"}}> 0 sec</h1>
        
      </div><br />
      <div className={style.resolve}>
        <div className={style.circletext}>
          <h1 className={style.circletitle}>Resolved Tickets</h1>
          <br />
          <p>
            A callback system on a website, as well as proactive invitations,
            help to attract even more customers. A <br /> separate round button
            for ordering a call with a small animation helps to motivate more{" "}
            <br /> customers to make calls.{" "}
          </p>
        </div>
        <div className={style.circle}>
          <Progress
            style={{ height: "100%", width: "100%" }}
            progress={resolveCount}
            strokeWidth={15}
            reduction={0}
            hideBall={true}
            gradient={[
              { stop: 0.0, color: "#00d907" },
              { stop: 100, color: "#00d907" },
            ]}
          />
        </div>
      </div><br />
      <div className={style.total}>
        <div className={style.circletext}>
          <h2>Total chats</h2>
          <br />
          <p>
            This metric Shows the total number of chats for all Channels for the
            selected the selected period
          </p>
        </div>
        <h1
          style={{ color: "#00d907", fontWeight: "400" }}
        >{`${chatCount} chats`}</h1>
      </div>
    </div>
  );
}

export default Analytics;
