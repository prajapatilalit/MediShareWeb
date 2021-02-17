import React, { useState } from "react";
import "./styles.css";
//import Home from '../home'
import { Link } from "react-router-dom";
import { signup } from "../CallingApi/patientapi";
import Navbar from "../Landing Page/Navbar";
import Footer from "../Landing Page/Footer";

const RegisterUser = (props) => {
  console.log(props);

  const [values, SetValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
    phone_no: "",
    error: "",
    message: "",
  });

  const {
    name,
    email,
    password,
    passwordCheck,
    phone_no,
    error,
    message,
  } = values;

  const patient_name = name;
  const patient_email = email;
  const patient_phone_no = phone_no;

  const handleChange = (e) => {
    const store = e.target.name;
    SetValues({ ...values, [store]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup(
      {
        patient_name,
        patient_email,
        password,
        passwordCheck,
        patient_phone_no,
      },
      props.location.pathname
    )
      .then((data) => {
        if (data.msg) {
          SetValues({ ...values, error: data.msg, message: "" });
        } else {
          SetValues({ ...values, error: "", message: data.message });
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="back">
          <Link to="/Register">
            {" "}
            <div className="inputfield">
              <p>Back to Register Dashboard</p>
            </div>{" "}
          </Link>
        </div>
        <div className="title">
          <div>Patient Registration</div>
        </div>

        <div className="form">
          <div className="inputfield">
            <label>Name</label>
            <input
              required
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
              className="input"
            />
          </div>
          <div className="inputfield">
            <label>Email</label>
            <input
              required
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              className="input"
            />
          </div>
          <div className="inputfield">
            <label>Password</label>
            <input
              required
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              className="input"
            />
          </div>
          <div className="inputfield">
            <label>Re-Enter Password</label>
            <input
              required
              type="password"
              name="passwordCheck"
              className="input"
              onChange={handleChange}
              value={passwordCheck}
            />
          </div>
          <div className="inputfield">
            <label>Phone Number</label>
            <input
              required
              name="phone_no"
              className="input"
              onChange={handleChange}
              value={phone_no}
            />
          </div>
          {error ? <p className="message">{error}</p> : ""}
          {message ? <p className="message">{message}</p> : ""}
          <div className="inputfield">
            <button onClick={onSubmit} className="btn">
              Submit
            </button>
          </div>

          <Link to="/users/login" className="inputfield">
            <p>Already Registered? Login</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterUser;
