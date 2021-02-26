import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPres, signout } from "../CallingApi/patientapi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Landing Page/Button";
import "../Landing Page/Navbar.css";
import "./card.css";

function PatientPrescription({ history }) {
  const [presData, setPresData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    getPres(history.location.state)
      .then((data) => {
        console.log(data);
        setPresData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDataReceived(true);
  }, [history.location.state]);

  console.log(history);

  //     const pres = () => {
  //     if(dataReceived)

  //       console.log(val)
  //     }
  // }

  //for navbar
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);
  //

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link
              to="/patient/dashboard"
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <div
                  className="nav-links"
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        "/patient/dashboard",
                        history.location.state
                      );
                    })
                  }
                >
                  Basic Details
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-links"
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        "/patient/dashboard/graph",
                        history.location.state
                      );
                    })
                  }
                >
                  Health Status
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-links"
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        "/patient/dashboard/prescription",
                        history.location.state
                      );
                    })
                  }
                >
                  Prescriptions
                </div>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Button
                    buttonStyle="btn--outline"
                    onClick={() => {
                      signout(() => {
                        history.push("/users/login");
                      });
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    buttonStyle="btn--outline"
                    buttonSize="btn--mobile"
                    onClick={
                      (closeMobileMenu,
                      () => {
                        signout(() => {
                          history.push("/users/login");
                        });
                      })
                    }
                  >
                    Sign Out
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>

      <div style={{ margin: "10px" }}>
        <div>
          <div className="prescription_header">
            <h1>This is pateint Prescription Dashboard</h1>
          </div>
        </div>
        {/* <div style={{ textAlign: "center", margin: "10px" }}>
          <Link to="/patient/dashboard">
            <Button variant="contained" color="primary" size="large">
              Patient Dashboard
            </Button>
          </Link>
        </div> */}

        <div>
          {presData ? (
            <div className="prescription_data">
              <ol>
                {presData.map((data, i) => {
                  const val = data.medDetails.map((innerData, i) => {
                    return (
                      <li>
                        <div className="wrap">
                          <div className="task">
                            <div className="abstract">
                              <h3>
                                No of Medication Prescribed:{" "}
                                {data.medDetails.length}
                              </h3>{" "}
                              <p>
                                <strong>Medicine Name : </strong>
                                {innerData.med_name} <br />
                                <strong> Duration : </strong>
                                {innerData.duration}
                              </p>
                              <p>
                                <strong>Dosage : </strong>
                                {innerData.Morning_dosage.substring(0, 8)}
                                {" & "}
                                {innerData.Evening_dosage.substring(0, 8)}
                              </p>
                            </div>
                            {i >= 0 ? (
                              <div className="details">
                                <div className="details__inner">
                                  <h3>Prescribed by : Dr. {data.Doctor} </h3>
                                  <p>
                                    Date : {data.createdAt.substring(0, 10)}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {console.log(i, innerData.med_name)}
                          </div>
                        </div>
                      </li>
                    );
                  });
                  return val;
                })}
              </ol>
            </div>
          ) : (
            <h1>Loading....</h1>
          )}
        </div>
      </div>
      {/* {JSON.stringify(presData)} */}
    </>
  );
}

export default PatientPrescription;
