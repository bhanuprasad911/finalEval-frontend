import React, { useState } from "react";
import style from "../styles/settings.module.css";
import { editProfile } from "../services/index.js";
import { useNavigate } from "react-router-dom";

function Settings() {
  const currentadmin = JSON.parse(localStorage.getItem("currentadmin"));
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    _id:currentadmin._id,
    firstname: currentadmin.firstname,
    lastname: currentadmin.lastname,
    email: currentadmin.email,
    role: currentadmin.role,
    password: "",
    confirmpassword: "",
  });
  console.log()

  const handleFormChange = (event) => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value });
  };

  const handleEdit = async()=>{
    try{
      const response = await editProfile(formdata);
      console.log(response);
      // navigate("/admin");
      }
      catch(error){
        console.log(error);
        }
  }

  return (
    <div className={style.main}>
      <p>Settings</p>
      <br />
      <br />
      <div className={style.edit}>
        <p className={style.innerhead}>Edit profile</p>
        <div className={style.line}></div><br />
        <div>
          <label className={style.label}>First name:</label>
          <br />
          <input className={style.input}
            type="text"
            name="firstname"
            value={formdata.firstname}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={style.label}>Last name:</label>
          <br />
          <input className={style.input}
            type="text"
            name="lastname"
            value={formdata.lastname}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={style.label}>Email:</label>
          <br />
          <input className={style.input}
            type="email"
            name="email"
            value={formdata.email}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={style.label}>Password:</label>
          <br />
          <input className={style.input}
            type="password"
            name="password"
            value={formdata.password}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <label className={style.label}>Confirm password:</label>
          <br />
          <input className={style.input}
            type="password"
            name="confirmpassword"
            value={formdata.confirmpassword}
            onChange={(e) => {
              handleFormChange(e);
            }}
          />
          <br /><br />
          <button className={style.save}
            onClick={() => {
              console.log(currentadmin._id, formdata);
              handleEdit()
            }}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
