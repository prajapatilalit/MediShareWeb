import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Navbar from "../Landing Page/Navbar";
import Footer from "../Landing Page/Footer";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import PersonIcon from "@material-ui/icons/Person";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BusinessIcon from "@material-ui/icons/Business";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function RegisterSelect() {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="back">
          <Link to="/">
            {" "}
            <div className="inputfield back-button">
              <p>{<ArrowBackIcon />}</p>
              <p>Back to Home</p>
            </div>{" "}
          </Link>
        </div>
        <div className="title">
          <div>{<PersonAddIcon />}</div>
          <div>Register As</div>
        </div>

        <div className="form">
          <div className="inputfield">
            <Link to="/users/register/patient" className="btn">
              {/* <span>{<SaveIcon />}</span> */}
              <Button startIcon={<PersonIcon />} className="btn">
                User
              </Button>
            </Link>
          </div>
          <div className="inputfield">
            <Link to="/users/register/doctor" className="btn">
              <Button startIcon={<LocalHospitalIcon />} className="btn">
                Doctor
              </Button>
            </Link>
          </div>
          <div className="inputfield">
            <Link to="/users/register/org" className="btn">
              <Button startIcon={<BusinessIcon />} className="btn">
                Organisation
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
