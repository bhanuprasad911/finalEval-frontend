import React , { useEffect, useState } from "react";
import style from "../styles/signup.module.css";
import AuthImage from "../assets/Authentication.png";
import mainlogo from "../assets/logo.svg";


import signup from "../services/index.js";

function Signup() {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "admin",
    password: "",
    confirmPassword: "",
    check: checked,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
      }
      }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.firstname.trim().length === 0 ||
      formData.lastname.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.password.trim().length === 0 ||
      formData.confirmPassword.trim().length === 0||
      checked===false
    ) {
      alert("Please fill all the fields");
      return;
    }else if(formData.password != formData.confirmPassword){
      alert('password and confirm password did not match')
      return
    }
    try {
      const res = await signup(formData);
      console.log(res);
      if (res.user) {
        window.location.href = "/login";
      } else {
        alert(res.message || "Signup Failed");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          role: "admin",
          password: "",
          confirmPassword: "",
        });
        setChecked(false)
      }
    } catch (err) {
      console.log(err);
      alert("signin failed");
    }
  };

  return (
    <div className={style.main}>
      <div className={style.left}>
        <img className={style.mainlogo} src={mainlogo} alt="mainlogo" />
        <div className={style.inputs}>
          <h2>Sign in to your Plexify</h2>
          <br />
          <br />
          <div>
            <label htmlFor="fn" className={style.label}>
              First name
            </label>
            <input
              name="firstname"
              value={formData.firstname}
              type="text"
              className={style.input}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="ln" className={style.label}>
              Last name
            </label>
            <input
              name="lastname"
              value={formData.lastname}
              type="text"
              className={style.input}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="mail" className={style.label}>
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              type="text"
              className={style.input}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="pass" className={style.label}>
              Password
            </label>
            <input
              type="password"
              className={style.input}
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="cp" className={style.label}>
              Confirm password
            </label>
            <input
              type="text"
              name="confirmPassword"
              value={formData.confirmPassword}
              className={style.input}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <div className={style.check}>
            <label htmlFor="t&c" className={style.checklabel}>
              <input
                type="checkbox"
                id="t&c"
                checked={checked}
                className={style.checkinput}
                onChange={() => {
                  setChecked(true);
                }}
              />
              By creating an account, I agree to our Terms of use
              <br /> and Privacy Policy
            </label>
          </div>

          <div className={style.next}>
            <button
              onClick={(e) => {
                console.log(formData);
                handleSubmit(e);
              }}
              className={style.button}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <img
          className={style.AuthImage}
          src={AuthImage}
          alt="Authentication Image"
        />
      </div>
      <p className={style.foot}>
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Services Apply
      </p>
    </div>
  );
}

export default Signup;
