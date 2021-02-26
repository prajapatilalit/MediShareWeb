import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addPrescription, getPres, signout } from "../CallingApi/patientapi";
import "./styles.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
// import { Button } from "../Landing Page/Button";s
import Button from "@material-ui/core/Button";
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
    color: theme.palette.text.primary,
  },
}));

function Prescription({ history }) {
  const histor = history.location.state;
  const [inputList, setInputList] = useState([{ med_name: "", duration: "" }]);
  const [finalList, setFinalList] = useState({});
  const [result, setResult] = useState({ success: "", error: "" });
  const [message, setMessage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getPres(history.location.state.userinfo.UID)
      .then((res) => {
        console.log("USEEFFTCT", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history.location.state.userinfo.UID]);

  // useEffect(() => {
  //    console.log("UID",history.location.state.userinfo.UID);

  // }, [inputList])

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const UID = history.location.state.userinfo.UID;
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const doc = JSON.parse(localStorage.getItem("jwt"));
  console.log(doc.user.doctor_name);
  const onsubmits = (e) => {
    e.preventDefault();
    var val = [];
    val[0] = history.location.state.userinfo.UID;
    // UID : val[0]
    var final_result;
    final_result = {
      Doctor: doc.user.doctor_name,
      UID: val[0],
      medDetails: [...inputList],
    };
    setFinalList(final_result);
    addPrescription(final_result)
      .then((res) => {
        setMessage(res.message);
      })
      .catch((err) => console.log("ERROR", err));
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { med_name: "", duration: "" }]);
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
  const Patient_name = history?.location.state.userinfo.patient_name;

  console.log("Prescription", { history });
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className="prescription_heading">Add Prescription Here</h1>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} alignContent={"center"}>
            <Paper
              style={{ height: "100%", alignItems: "center" }}
              className={classes.paper}
            >
              <Link to="/doctor/dashboard">
                <Button variant="contained" color="primary" size="large">
                  Go back To Dashboard
                </Button>
              </Link>
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
              <h3
                style={{
                  margin: "10px",
                  fontSize: "25px",
                  fontFamily: "cursive",
                }}
              >
                Check lalit's Previos Prescription
              </h3>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  history.push("/doctor/previousPrescriptions", histor);
                }}
              >
                Check Previous Prescriptions
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h3
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <a
                  href=""
                  style={{
                    color: "#161d6f",
                    textDecoration: "none",
                    fontSize: "40px",
                    fontFamily: "cursive",
                  }}
                >
                  Prescription
                </a>
              </h3>
              {inputList.map((x, i) => {
                return (
                  <div className="form_field">
                    <input
                      name="med_name"
                      placeholder="Medicine Name"
                      value={x.med_name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <input
                      className="ml10"
                      name="duration"
                      placeholder="duration(In Days)"
                      value={x.duration}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <select
                      style={{ marginLeft: 20 }}
                      name="Morning_dosage"
                      id="dosage"
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option value="select">Morning Dosage</option>
                      <option value="Morning - 1">1</option>
                      <option value="Morning - 2">2</option>
                      <option value="Morning - 3">3</option>
                    </select>
                    <select
                      style={{ marginLeft: 20 }}
                      name="Evening_dosage"
                      id="dosage"
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option value="select">Evening Dosage</option>
                      <option value="Evening - 1">1</option>
                      <option value="Evening - 2">2</option>
                      <option value="Evening - 3">3</option>
                    </select>
                    <div className="btn-box">
                      {inputList.length !== 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="mr10"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </Button>
                      )}

                      {inputList.length - 1 === i && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="ml30"
                          onClick={handleAddClick}
                        >
                          + Medication
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onsubmits}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
        {message ? <p style={{ color: "green" }}>{message}</p> : ""}
        {/* {JSON.stringify(finalList)} */}
        <p style={{ color: "green", font: "bold" }}>{result.success}</p>

        {/* <h1> {result.success ? <p>  {result.success}</p> : ""  }  </h1> */}
        {/* {JSON.stringify(result)} */}
      </div>
    </div>
  );
}

export default Prescription;
