import React, { useState, useEffect } from "react";
import {
  signout,
  pat_dets,
  getPatDetails,
  updatePatDetails,
} from "../CallingApi/patientapi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Landing Page/Button";
import "../Landing Page/Navbar.css";
import "./styles.css";
//import { signup } from '../CallingApi/patientapi'
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const PatientDashboard = ({ props, history }) => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    const Name = JSON.parse(localStorage.getItem("jwt"));
    setName(Name.user.patient_name);
  }, []);

  const [values, SetValues] = useState({
    dob: "",
    age: "",
    gender: "",
    bloodgroup: "",
    allergies: "",
    occur_cond: "",
    medication: "",
    emergency_no: "",
    error: "",
    message: "",
    loading: "",
    success: false,
    editDetails: false,
  });

  const {
    dob,
    age,
    gender,
    bloodgroup,
    allergies,
    occur_cond,
    medication,
    emergency_no,
    error,
    message,
    success,
    editDetails,
  } = values;

  const [edit, setEdits] = useState({
    e_dob: "",
    e_age: "",
    e_gender: "",
    e_bloodgroup: "",
    e_allergies: "",
    e_occur_cond: "",
    e_medication: "",
    e_emergency_no: "",
  });

  const {
    e_id,
    e_age,
    e_gender,
    e_bloodgroup,
    e_allergies,
    e_occur_cond,
    e_medication,
    e_emergency_no,
  } = edit;

  //  SetValues({...values,age : res[0].age,gender : res[0].gender , bloodgroup : res[0].bloodgroup,allergies : res[0].allergies,
  // occur_cond : res[0].occur_cond , medication : res[0].medication , emergency_no : res[0].emergency_no
  // })
  let t = {};
  t = JSON.parse(localStorage.getItem("jwt"));
  let uid = t.user._id;
  useEffect(() => {
    getPatDetails(uid)
      .then((res) => {
        console.log(res);
        if (res.message || res.length === 0) {
          SetValues({ ...values, success: false, error: res.message });
        } else {
          SetValues({ ...values, success: true });
        }
        const e = { ...res[0] };
        console.log(e._id);
        setEdits({
          e_id: e._id,
          e_age: e.age,
          e_gender: e.gender,
          e_bloodgroup: e.bloodgroup,
          e_allergies: e.allergies,
          e_occur_cond: e.occur_cond,
          e_medication: e.medication,
          e_emergency_no: e.emergency_no,
        });
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [message, editDetails]);

  //   const patient_name = name
  //   const patient_email = email
  //   const patient_phone_no = phone_no

  console.log("PatientDashboard", t.user._id);

  const [calculatedage, setCalculatedAge] = useState("");
  const getAge = (e) => {
    var PresentDay = new Date();
    var dateOfBirth = e.get_selectedDate();
    var months =
      PresentDay.getMonth() -
      dateOfBirth.getMonth() +
      12 * (PresentDay.getFullYear() - dateOfBirth.getFullYear());
    return (age = Math.round(months / 12));
  };

  const handleChange = (e) => {
    const store = e.target.name;
    SetValues({ ...values, [store]: e.target.value });
  };

  const e_handleChange = (e) => {
    const store = e.target.name;
    setEdits({ ...edit, [store]: e.target.value });
  };
  const Age = parseInt(age);
  const Emergency_no = parseInt(emergency_no);
  const onSubmit = (e) => {
    if (
      !dob ||
      !age ||
      !gender ||
      !bloodgroup ||
      !allergies ||
      !occur_cond ||
      !medication ||
      !emergency_no
    ) {
      alert("Enter all details");
    }
    e.preventDefault();
    pat_dets({
      id: uid,
      dob,
      age: Age,
      gender,
      bloodgroup,
      allergies,
      occur_cond,
      medication,
      emergency_no: Emergency_no,
    })
      .then((data) => {
        if (data.msg) {
          SetValues({ ...values, error: data.msg, message: "" });
        } else {
          SetValues({ ...values, error: "", message: data.message });
        }
      })
      .catch((err) => console.log(err.message));
  };

  const e_onSubmit = (e) => {
    e.preventDefault();
    if (
      !e_age ||
      !e_gender ||
      !e_bloodgroup ||
      !e_allergies ||
      !e_occur_cond ||
      !e_medication ||
      !e_emergency_no
    ) {
      alert("fileds cannot be left empty");
    } else {
      updatePatDetails(
        {
          id: e_id,
          age: parseInt(e_age),
          gender: e_gender,
          bloodgroup: e_bloodgroup,
          allergies: e_allergies,
          occur_cond: e_occur_cond,
          medication: e_medication,
          emergency_no: parseInt(e_emergency_no),
        },
        e_id
      )
        .then((data) => {
          console.log(data);
          if (data.msg) {
            SetValues({ ...values, error: data.msg, message: "" });
          } else {
            SetValues({ ...values, error: "", message: data.message });
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  const userForm = (status) => (
    <div className="wrapper">
      <div className="title">{status}</div>
      <div className="form">
        <div className="inputfield">
          <label>Date Of Birth</label>
          <DatePicker
            selected={selectedDate}
            required
            name="DOB"
            onChange={(handleChange) => setSelectedDate(handleChange)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            showMonthYearDropdown
            className="input"
          />
        </div>
        <div className="inputfield">
          <label>Age</label>
          <input
            required
            type="text"
            name="age"
            onChange={(handleChange) => setCalculatedAge(handleChange)}
            value={getAge}
            className="input"
          />
        </div>
        <div className="inputfield">
          <label>Gender</label>
          <select
            required
            type="text"
            name="e_gender"
            onChange={e_handleChange}
            value={e_gender}
            className="input"
            option
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="inputfield">
          <label>Bloodgroup</label>
          <input
            required
            type="text"
            name="bloodgroup"
            onChange={handleChange}
            value={bloodgroup}
            className="input"
          />
        </div>
        <div className="inputfield">
          <label>Allergies</label>
          <input
            required
            type="text"
            name="allergies"
            className="input"
            onChange={handleChange}
            value={allergies}
          />
        </div>
        <div className="inputfield">
          <label>Occured Condition</label>
          <input
            required
            name="occur_cond"
            className="input"
            onChange={handleChange}
            value={occur_cond}
          />
        </div>
        <div className="inputfield">
          <label>Medication</label>
          <input
            required
            name="medication"
            className="input"
            onChange={handleChange}
            value={medication}
          />
        </div>
        <div className="inputfield">
          <label>Emergency Number</label>
          <input
            required
            name="emergency_no"
            className="input"
            onChange={handleChange}
            value={emergency_no}
          />
        </div>
        <div className="inputfield">
          <button onClick={onSubmit} className="btn">
            Submit
          </button>
        </div>
      </div>

      {error ? <p>{error}</p> : <p>{message}</p>}
    </div>
  );

  const editForm = () => (
    <div className="wrapper">
      <div className="title">Edit your basic details</div>
      <div className="form">
        <div className="inputfield">
          <label>Date Of Birth</label>
          <DatePicker
            selected={selectedDate}
            required
            name="DOB"
            onChange={(e_handleChange) => setSelectedDate(e_handleChange)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            showMonthYearDropdown
            className="input"
          />
        </div>
        <div className="inputfield">
          <label>Age</label>
          <input
            required
            type="text"
            name="e_age"
            onChange={(e_handleChange) => setCalculatedAge(e_handleChange)}
            value={e_age}
            className="input"
          />
        </div>
        <div className="inputfield">
          <label>Gender</label>
          <select
            required
            type="text"
            name="e_gender"
            onChange={e_handleChange}
            value={e_gender}
            className="input"
            option
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="inputfield">
          <label>Bloodgroup</label>
          <input
            required
            type="text"
            name="e_bloodgroup"
            onChange={e_handleChange}
            value={e_bloodgroup}
            className="input"
          />
        </div>
        <div className="inputfield">
          <label>Allergies</label>
          <input
            required
            type="text"
            name="e_allergies"
            className="input"
            onChange={e_handleChange}
            value={e_allergies}
          />
        </div>
        <div className="inputfield">
          <label>Occured Condition</label>
          <input
            required
            name="e_occur_cond"
            className="input"
            onChange={e_handleChange}
            value={e_occur_cond}
          />
        </div>
        <div className="inputfield">
          <label>Medication</label>
          <input
            required
            name="e_medication"
            className="input"
            onChange={e_handleChange}
            value={e_medication}
          />
        </div>
        <div className="inputfield">
          <label>Emergency Number</label>
          <input
            required
            name="e_emergency_no"
            className="input"
            onChange={e_handleChange}
            value={e_emergency_no}
          />
        </div>
        <div className="inputfield">
          <button onClick={e_onSubmit} className="btn">
            Submit
          </button>
        </div>
        {message ? <p>{message}</p> : ""}
        <Link className="inputfield">
          <button
            className="btn"
            onClick={() => {
              SetValues({ ...values, editDetails: false, message: "" });
              setEdits({
                e_age: "",
                e_gender: "",
                e_bloodgroup: "",
                e_allergies: "",
                e_occur_cond: "",
                e_medication: "",
                e_emergency_no: "",
              });
            }}
          >
            Dashboard
          </button>
        </Link>
      </div>
    </div>
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
              to="/patient/dashboard"
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              {name}'s Dashboard
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
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

      {success ? <span></span> : userForm("Enter Your basic details")}
      {success && !editDetails ? (
        <div className="wrapper">
          <div className="title">Your basic Details : </div>
          <div className="form">
            <div className="inputfield">
              <p>
                Age : <b>{e_age}</b>
              </p>
            </div>
            <div className="inputfield">
              <p>
                Gender :<b> {e_gender}</b>
              </p>
            </div>
            <div className="inputfield">
              <p>
                Bloodgroup : <b>{e_bloodgroup}</b>
              </p>
            </div>
            <div className="inputfield">
              <p>
                Allergies : <b>{e_allergies} </b>
              </p>
            </div>
            <div className="inputfield">
              <p>
                Previously Occured Conditions : <b>{e_occur_cond}</b>
              </p>
            </div>
            <div className="inputfield">
              <p>
                Medication : <b>{e_medication}</b>
              </p>
            </div>
            <div className="inputfield">
              <p>
                Emergency Number : <b>{e_emergency_no}</b>
              </p>
            </div>
            {success && !editDetails ? (
              <div className="inputfield">
                <button
                  className="btn"
                  onClick={() => {
                    SetValues({ ...values, editDetails: true });
                  }}
                >
                  Edit your details
                </button>{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {/*success && !editDetails ? (
        <>
          <button
            onClick={() => {
              SetValues({ ...values, editDetails: true })
            }}>
            Edit your details
          </button>{' '}
        </>
      ) : (
        ''
      )*/}

      {!success ? (
        <Link to="/patient/dashboard" className="link">
          <p className="bttn"> Back To User Dashboard</p>{" "}
        </Link>
      ) : (
        ""
      )}
      {editDetails ? editForm() : <p></p>}
      {/*editDetails ? (
        <button
          onClick={() => {
            SetValues({ ...values, editDetails: false })
          }}>
          Edit Later
        </button>
      ) : (
        ''
      )}
      {JSON.stringify(values)}
      {JSON.stringify(edit)*/}
    </div>
  );
};

export default PatientDashboard;
