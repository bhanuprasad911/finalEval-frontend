import React from "react";
import style from "../styles/mainpage.module.css";
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

import { PiYoutubeLogo, PiInstagramLogo, PiXLogo, PiDiscordLogo } from "react-icons/pi";
import { FiFigma, FiMail } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";


function Mainpage() {
  const plans = [
    {
      title: "STARTER",
      price: "$9.99",
      description:
        "Best for local businesses needing to improve their online reputation.",
      features: [
        "Unlimited Users",
        "GMB Messaging",
        "Reputation Management",
        "GMB Call Tracking",
        "24/7 Award Winning Support",
      ],
    },
    {
      title: "GROWTH",
      price: "$399",
      description:
        "Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.",
      features: [
        "Pipeline Management",
        "Marketing Automationn Campaigns",
        "Live Call Transfer",
        "GMB Messaging",
        "Embed-able Form Builder",
        "Reputation Management",
        "24/7 Award Winning Support",
      ],
    },
  ];
  const products = [
    "Universal checkouts",
    "Payment workflows",
    "Observability",
    "UpliftAI",
    "Apps & integration",
  ];

  const Resources = [
    "Blog",
    "Success stories",
    "News room",
    "Terms",
    "Privacy",
  ];

  const primers = [
    "Expand to new market",
    "Boost payment success",
    "Improve conversion rates",
    "Reduce payment frauds",
    "Recover revenue",
  ];

  const developers = [
    "Primer Docs",
    "API References",
    "Payment methods guide",
    "Servie status",
    "Community",
  ];

  return (
    <div className={style.main}>
      <div className={style.main2}>
        <div className={style.header}>
          <img className={style.mainlogo} src={mainlogo} alt="mainlogo" />
          <div className={style.authLinks}>
            <Link className={style.login} to={"/login"}>
              Login
            </Link>

            <Link className={style.signbutton} to={"/signup"}>
              Sign up
            </Link>
          </div>
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

        <div className={style.secondheader}>
          <h1 className={style.secondheadh1}>
            At its core, Hubly is a robust CRM solution.
          </h1>
          <br />
          <p className={style.secondheadp}>
            Hubly helps businesses streamline customer interactions, track
            leads, and automate tasks—saving you time and maximizing revenue.
            Whether you’re a startup or an enterprise, Hubly adapts to your
            needs, giving you the tools to scale efficiently.
          </p>
        </div>
        <div className={style.design}>
          <h2 className={style.capture}>CAPTURE</h2>
          <h2 className={style.nurture}>NURTURE</h2>
          <h2 className={style.close}>CLOSE</h2>
          <div className={style.designleft}>
            <div>
              <h2>MULTIPLE PLATFORMS TOGETHER!</h2>
              <br />
              <p>
                Email communication is a breeze with our fully integrated, drag
                & drop <br />
                email builder.
              </p>
            </div>
            <br />
            <br />
            <br />
            <div>
              <h2>CLOSE</h2>
              <br />
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound <br />
                phone system & more!
              </p>
            </div>
            <br /> <br />
            <br />
            <div>
              <h2>NURTURE</h2>
              <br />
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound <br />
                phone system & more!
              </p>
            </div>
          </div>
          <div className={style.designright}>
            <img className={style.medialogos} src={socialmedialogos} alt="" />
            <div className={style.rect1}>B</div>
            <div className={style.rect2}>B</div>
            <div className={style.rect3}>B</div>
            <div className={style.arrow1}>
              <div className={style.circle11}>.</div>
              <div className={style.line}></div>
              <div className={style.circle12}>.</div>
            </div>
            <div className={style.arrow2}>
              <div className={style.circle11}>.</div>
              <div className={style.line}></div>
              <div className={style.circle12}>.</div>
            </div>
            <div className={style.arrow3}>
              <div className={style.circle11}>.</div>
              <div className={style.line}></div>
              <div className={style.circle12}>.</div>
            </div>
          </div>
        </div>
        <div className={style.thirdhead}>
          <h1>We have plans for everyone!</h1>
          <br />
          <br />
          <p>
            We started with a strong foundation, then simply built all of the
            sales and <br />
            marketing tools ALL businesses need under one platform.
          </p>
        </div>
        <div className={style.plans}>
          <Plan plan={plans[0]} />
          <Plan plan={plans[1]} />
        </div>
      </div>
      <div className={style.mainfooter}>
        <div>
          <img className={style.mainlogo} src={mainlogo} alt="mainlogo" />
        </div>
        <div className={style.product}>
          <p>Product</p>
          <br />
          <br />
          {products.map((product, index) => {
            return (
              <div key={index}>
                <p className={style.p}>{product}</p>
                <br />
              </div>
            );
          })}
          <br />
          <br />
          <div>
            <p>Resources</p>
            <br />
            {Resources.map((resource, index) => {
              return (
                <div key={index}>
                  <p className={style.p}>{resource}</p>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.primer}>
          <p>Why primer</p>
          <br />
          <br />
          {primers.map((item, index) => {
            return (
              <div key={index}>
                <p className={style.p}>{item}</p>
                <br />
              </div>
            );
          })}
          <br />
          <br />
          <div>
            <p>Company</p>
            <br />
            <p className={style.p}>Careers</p>
          </div>
        </div>
        <div className={style.dev}>
          <p>Developer</p>
          <br />
          {developers.map((item, index) => {
            return (
              <div key={index}>
                <p className={style.p}>{item}</p>
                <br />
              </div>
            );
          })}

          <div className={style.links}>
            <FiMail/>
            <SlSocialLinkedin/>
            <PiXLogo/>
            <PiYoutubeLogo/>
            <PiDiscordLogo/>
            <FiFigma/>
            <PiInstagramLogo/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
