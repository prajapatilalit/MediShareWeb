import React from "react";
import "./ProfileNavbar.css";
import avatar from "../assets/avatar.png";

const ProfileNavbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar-left">
        <a href="#" alt="">
          Subscribers
        </a>
        <a href="#" alt="">
          Video Management
        </a>
        <a href="#" alt="" className="active-link">
          Admin
        </a>
      </div>
      <div className="navbar-right">
        <a href="#" alt="">
          <i className="fa fa-search"></i>
        </a>
        <a href="#" alt="">
          <i className="fa fa-clock-o"></i>
        </a>
        <a href="#" alt="">
          <img width="30" src={avatar} alt="avtar" />
        </a>
      </div>
    </nav>
  );
};
export default ProfileNavbar;
