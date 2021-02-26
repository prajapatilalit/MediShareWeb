import React, { useState, useEffect } from "react";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import { Link } from "react-router-dom";
import Chart from "./chart";
import { signout } from "../CallingApi/patientapi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Landing Page/Button";
import "../Landing Page/Navbar.css";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function OrgGraph({ history }) {
  const classes = useStyles();
  const UID = history.location.state.userinfo.UID;
  console.log(UID);
  const [graphValues, setGraphValues] = useState([]);

  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        setGraphValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //calculating data for graph value
  // const lastData = graphValues.pop();
  // const a = lastData.Heart_rate;
  // const b = lastData.Blood_pressure;
  // const c = lastData.Cholesterol;
  // const d = lastData.Blood_sugar;
  // const graphData = [a, b, c, d];

  let dateArr = [];
  let heart_rate = [];
  let blood_pressure = [];
  let cholesterol = [];
  let blood_sugar = [];

  for (var i = 0; i < graphValues.length; i++) {
    const dt = graphValues[i].createdAt;
    const date = dt.substring(0, 10);

    heart_rate.push(graphValues[i].Heart_rate);
    blood_pressure.push(graphValues[i].Blood_pressure);
    cholesterol.push(graphValues[i].Cholesterol);
    blood_sugar.push(graphValues[i].Blood_sugar);
    dateArr.push(date);
  }
  // console.log(dateArr);

  // console.log(history)

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
              to="/org/dashboard"
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
                      history.push("/org/allDetails", history.location.state);
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
                        "/org/dashboard/graph",
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
                        "/org/dashboard/prescription",
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
      <div style={{ textAlign: "center", margin: "10px" }}>
        <div className="prescription_header">
          <h1>Organisation Graph Dashboard</h1>
        </div>
      </div>

      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className="prescription_heading">
                Organisation Graph Pannel
              </h1>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div>
                <Chart
                  className="chart"
                  labels={dateArr}
                  name={"Heart Rate"}
                  dataVal={heart_rate}
                />
              </div>
              <div>
                <Chart
                  className="chart"
                  labels={dateArr}
                  name={"Blood Pressure"}
                  dataVal={blood_pressure}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div>
                <div>
                  <Chart
                    className="chart"
                    labels={dateArr}
                    name={"Cholesterol"}
                    dataVal={cholesterol}
                  />
                </div>
                <div>
                  <Chart
                    className="chart"
                    labels={dateArr}
                    name={"Blood Bugar"}
                    dataVal={blood_sugar}
                  />
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default OrgGraph;
