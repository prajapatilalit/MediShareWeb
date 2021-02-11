import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Navbar from "../Landing Page/Navbar";

export default function RegisterSelect() {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="back">
          <Link to="/">
            {" "}
            <div className="inputfield">
              <p>Back to Home</p>
            </div>{" "}
          </Link>
        </div>
        <div className="title">
          <div>Register As</div>
        </div>

        <div className="form">
          <div className="inputfield">
            <Link to="/users/register/patient" className="btn">
              <button className="btn">User</button>
            </Link>
          </div>
          <div className="inputfield">
            <Link to="/users/register/doctor" className="btn">
              <button className="btn">Doctor</button>
            </Link>
          </div>
          <div className="inputfield">
            <Link to="/users/register/org" className="btn">
              <button className="btn">Organisation</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
