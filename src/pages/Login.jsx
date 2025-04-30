import React, { useEffect, useState } from "react";
import style from "../styles/login.module.css";
import AuthImage from "../assets/Authentication.png";
import mainlogo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/index.js";



function Login() {
  const navigate = useNavigate()
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [token, settoken] = useState(localStorage.getItem('token'))

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formdata.email.trim().length === 0 ||
      formdata.password.trim().length === 0
    ) {
      alert("Please fill in all fields");
    } else {
      try {
        const result = await login(formdata);
        console.log(result);
        settoken(result.token);
        localStorage.setItem("token", result.token);
        if (result.token) {
          localStorage.setItem("currentadmin", JSON.stringify(result.user));
          navigate("/dashboard", {replace:true});
          return;
        } else {
          alert("Invalid Credentials");
          setFormdata({ email: "", password: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
      }
      }, []);

  return (
    <div className={style.main}>
      <div className={style.left}>
        <img className={style.mainlogo} src={mainlogo} alt="mainlogo" />
        <div className={style.inputs}>
          <h2>Sign in to your Plexify</h2>
          <br />
          <br />
          <div className={style.mail}>
            <label htmlFor="mail" className={style.label}>
              Username
            </label>
            <input
              name="email"
              value={formdata.email}
              type="text"
              className={style.input}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <div className={style.password}>
            <label htmlFor="pass" className={style.label}>
              Password
            </label>
            <input
              type="password"
              className={style.input}
              name="password"
              value={formdata.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />
          <div className={style.next}>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className={style.button}
            >
              Log in
            </button>
          </div>
          <div className={style.sign}>
            <p>
              Don't have an account?{" "}
              <Link className={style.link} to="/signup">
                Sign up
              </Link>
            </p>
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

export default Login;
