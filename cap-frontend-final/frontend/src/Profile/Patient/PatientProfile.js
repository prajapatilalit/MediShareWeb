import React, { useState } from "react";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

const PatientProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className="container">
      <ProfileNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default PatientProfile;
