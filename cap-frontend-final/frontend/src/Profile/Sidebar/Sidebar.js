import React from "react";
import "./sidebar.css";
import logo from "../assets/logo.jpg";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className=" sidebar-title">
        <div className="sidebar-img">
          <img src={logo} alt="logo" />
          <h1>Medishare</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-link active-menu-link">
          <i className="fa fa-home"></i>
          <a href="#" alt="">
            Dashboard
          </a>
        </div>
        <h2>MNG</h2>
        <div className="sidebar-link">
          <i className="fa fa-user-secret"></i>
          <a href="#" alt="">
            Admin Management
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-building-o"></i>
          <a href="#" alt="">
            Company Management
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-wrench"></i>
          <a href="#" alt="">
            Employee Management
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-archive"></i>
          <a href="#" alt="">
            Warehouse
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-handshake-o"></i>
          <a href="#" alt="">
            Contracts
          </a>
        </div>
        <h2>LEAVE</h2>
        <div className="sidebar-link">
          <i className="fa fa-question"></i>
          <a href="#" alt="">
            Requests
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-sign-out"></i>
          <a href="#" alt="">
            Leave Policy
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-calendar-check-o"></i>
          <a href="#" alt="">
            Special Days
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-files-o"></i>
          <a href="#" alt="">
            Apply for Leave
          </a>
        </div>
        <h2>PAYROLL</h2>
        <div className="sidebar-link">
          <i className="fa fa-money"></i>
          <a href="#" alt="">
            Payroll
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-briefcase"></i>
          <a href="#" alt="">
            Paygrade
          </a>
        </div>
        <div className="sidebar-link">
          <i className="fa fa-power-off"></i>
          <a href="#" alt="">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
