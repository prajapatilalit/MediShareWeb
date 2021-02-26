import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Landing Page/Button";
// import Button from "@material-ui/core/Button";
import { signout } from "../CallingApi/patientapi";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import "../Landing Page/Navbar.css";
import "./styles.css";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.primary,
//   },
// }));

// age: 26
// allergies: "latex and dust mites allergies"
// bloodgroup: "O-"
// createdAt: "2021-02-11T12:50:51.436Z"
// emergency_no: 9955894949
// gender: "M"
// medication: "methotrexate, sulfasalazine"
// occur_cond: "Rheumatoid Arthritis"

function DoctorUploadPanal({ history }) {
  // const classes = useStyles();
  console.log(history);

  const {
    age,
    allergies,
    bloodgroup,
    createdAt,
    emergency_no,
    gender,
    medication,
    occur_cond,
  } = history.location.state;

  const { patient_name } = history.location.state.userinfo;

  console.log(
    age,
    allergies,
    bloodgroup,
    createdAt,
    emergency_no,
    gender,
    medication,
    occur_cond
  );

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
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link
              to="/doctor/dashboard"
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
                        "/doctor/AddingFeatures",
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
                        "/doctor/AddingFeatures/graph",
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
                        "/doctor/AddingFeatures/prescription",
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
      <div className="wrapper">
        <div className="form">
          <div className="inputfield">
            <p>
              {" "}
              Name : <b>{patient_name}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              {" "}
              Age : <b>{age}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              Gender : <b>{gender}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              Allergies : <b>{allergies}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              Bloodgroup : <b>{bloodgroup}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              Medication : <b>{medication}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              Occured Condition : <b>{occur_cond}</b>
            </p>
          </div>
          <div className="inputfield">
            <p>
              Emergency Number : <b>{emergency_no}</b>
            </p>
          </div>
        </div>
      </div>
      {/* <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className="prescription_heading">
                This is doctor upload panal
              </h1>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} alignContent={"center"}>
            <Paper
              style={{ height: "80%", alignItems: "center" }}
              className={classes.paper}
            >
              <div style={{ marginTop: "100px" }}>
                <div>
                  <Link to="/doctor/dashboard">
                    <Button variant="contained" color="primary" size="large">
                      Go back To Dashboard
                    </Button>
                  </Link>
                </div>
                <div>
                  <Button
                    style={{ margin: "25px" }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      history.push(
                        "/doctor/AddingFeatures/prescription",
                        history.location.state
                      );
                    }}
                  >
                    Prescription
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      history.push(
                        "/doctor/AddingFeatures/graph",
                        history.location.state
                      );
                    }}
                  >
                    Graph
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              style={{ height: "80%", alignItems: "center" }}
              className={classes.paper}
            >
              <h1
                style={{
                  color: "#161d6f",
                  fontFamily: "cursive",
                  marginBottom: "-80px",
                }}
              >
                Patient Details
              </h1>
              <div className="wrapper">
                <div className="form">
                  <div className="inputfield">
                    <p>
                      {" "}
                      Name : <b>{patient_name}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      {" "}
                      Age : <b>{age}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      Gender : <b>{gender}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      Allergies : <b>{allergies}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      Bloodgroup : <b>{bloodgroup}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      Medication : <b>{medication}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      Occured Condition : <b>{occur_cond}</b>
                    </p>
                  </div>
                  <div className="inputfield">
                    <p>
                      Emergency Number : <b>{emergency_no}</b>
                    </p>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div> */}
    </div>
  );
}

export default DoctorUploadPanal;
