import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Landing Page/Button";
import "../Landing Page/Navbar.css";
import { signout } from "../CallingApi/patientapi";
import Chart from "./chart";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import { Button } from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#f6f5f5",
  },
}));

function Graph({ history }) {
  const classes = useStyles();
  const doc = JSON.parse(localStorage.getItem("jwt"));
  const doctorName = doc.user.doctor_name;
  const UID = history.location.state.userinfo.UID;

  const [graphValues, setGraphValues] = useState([]);

  // Fetching Api here
  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        setGraphValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(graphValues);

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

  const [values, setValues] = useState(
    {
      Heart_rate: "",
      Blood_pressure: "",
      Cholesterol: "",
      Blood_sugar: "",
    },
    []
  );
  const [result, setResult] = useState();
  const [resultValues, setResultValues] = useState([]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) });
  };

  const { Heart_rate, Blood_pressure, Cholesterol, Blood_sugar } = values;
  const onClicks = (e) => {
    e.preventDefault();
    addGraphValues({ UID, Doctor: doctorName, ...values })
      .then((res) => {
        setResult(res.message);
        setResultValues(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div className={classes.root}>
        <Grid container>
          {/* <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className="prescription_heading">Add Graph here</h1>
            </Paper>
          </Grid> */}
          {/* <Grid item xs={12} sm={6} alignContent={"center"}>
            <Paper
              style={{ height: "100%", alignItems: "center" }}
              className={classes.paper}
            >
              <div style={{ marginTop: "80px" }}>
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
                        "/doctor/AddingFeatures",
                        history.location.state
                      );
                    }}
                  >
                    Go back Upload Panal
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className="form_field">
                <input
                  placeholder="Heart_rate"
                  name="Heart_rate"
                  onChange={onChange}
                  value={Heart_rate}
                ></input>
                <br></br>
                <input
                  placeholder="Blood_pressure"
                  name="Blood_pressure"
                  onChange={onChange}
                  value={Blood_pressure}
                ></input>
                <br></br>
                <input
                  placeholder="Cholesterol"
                  name="Cholesterol"
                  onChange={onChange}
                  value={Cholesterol}
                ></input>
                <br></br>
                <input
                  placeholder="Blood_sugar"
                  name="Blood_sugar"
                  onChange={onChange}
                  value={Blood_sugar}
                ></input>
                <br></br>
                <br></br>

                {/* <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="ml30"
                >
                  Submit{" "}
                </Button> */}
                <Button onClick={onClicks} buttonStyle="btn--outline1">
                  Submit
                </Button>

                {result ? <p style={{ color: "green" }}>{result}</p> : ""}
              </div>
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

export default Graph;
