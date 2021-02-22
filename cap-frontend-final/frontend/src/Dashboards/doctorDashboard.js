import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  signout,
  getAllPatientDetails,
  uploadPatientReport,
} from "../CallingApi/patientapi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../Landing Page/Button";
import "../Landing Page/Navbar.css";
import "./styles.css";

function DoctorDashboard({ history }) {
  const [PatientBasicDetails, setPatientBasicDetails] = useState([]);
  const [doctorDetails, setDoctorDetials] = useState("");
  const [values, setValues] = useState("");
  const [p_dets, setP_dets] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    const doc = JSON.parse(localStorage.getItem("jwt"));
    setDoctorDetials(doc.user.doctor_name);
    getAllPatientDetails()
      .then((res) => {
        setPatientBasicDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = () => {
    const patDets = PatientBasicDetails;
    console.log(patDets.data);
    const pat_Index = patDets.data.filter((data, i) => {
      if (values === "" + data.userinfo.UID) {
        return data;
      }
    });

    console.log(pat_Index[0]);

    if (pat_Index[0]) {
      setP_dets(pat_Index[0]);
      if (pat_Index[0].userinfo !== "" + undefined) {
        // setDisplayDetails(true);
        history.push("/doctor/AddingFeatures", pat_Index[0]);
      }
    } else {
      alert("No Pateint Found with this Unique ID");
    }

    //console.log(data.patient.UID);
    //   patDets.data.map((data,i) => {
    //       console.log(data);
    //   } )
  };

  console.log(doctorDetails);

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
  const onFileChange = (event) => {
    // Update the state
    // this.setState({ selectedFile: event.target.files[0] });
    setFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    console.log(file);
    // Update the formData object
    formData.set("report", file);

    // Details of the uploaded file
    console.log(formData);

    uploadPatientReport(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };
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
              {doctorDetails}'s Dashboard
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
      {/*<h3>This is doctor dashboard </h3>

      <h2>{doctorDetails ? <h2>Welcome Dr. {doctorDetails}</h2> : ''}</h2>
      <button
        onClick={() => {
          signout(() => {
            history.push('/users/login')
          })
        }}>
        signout
      </button>
      <br></br>
      <br></br>
      <h2>Search Patient Details</h2>
      <br></br>
      <input
        value={values}
        onChange={(e) => {
          setValues(e.target.value)
        }}
      />
      <button onClick={onSubmit}>Submit</button>
      <br></br>
      <br></br>
      {displayDetails ? (
        <>
          {p_dets.userinfo.patient_name
            ? ''
            : alert('patient Details not found')}
          <h2>Patient Basic Details : </h2>
          <br></br>
          <h3> Name : {p_dets.userinfo.patient_name}</h3>
          <h3> Age : {p_dets.age}</h3>
          <h3>Gender : {p_dets.gender}</h3>
          <h3>Allergies : {p_dets.allergies}</h3>
          <h3>Bloodgroup : {p_dets.bloodgroup}</h3>
          <h3>Medication : {p_dets.medication}</h3>
          <h3>Occured Condition : {p_dets.occur_cond}</h3>
          <h3>Emergency Number : {p_dets.emergency_no}</h3>
        </>
      ) : (
        ''
      )}*/}
      <div className="wrapper">
        <div className="form">
          <div className="inputfield">
            <input
              className="input"
              placeholder="Search Patient"
              value={values}
              onChange={(e) => {
                setValues(e.target.value);
              }}
            />
          </div>
          <div className="inputfield">
            <button onClick={onSubmit} className="btn">
              Search
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      {displayDetails ? (
        <>
          {p_dets.userinfo.patient_name
            ? setDisplayDetails(displayDetails(true))
            : alert("patient Details not found")}
          <div className="wrapper">
            <div className="title">Patient Basic Details : </div>
            <div className="form">
              <div className="inputfield">
                <p>
                  {" "}
                  Name : <b>{p_dets.userinfo.patient_name}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  {" "}
                  Age : <b>{p_dets.age}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  Gender : <b>{p_dets.gender}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  Allergies : <b>{p_dets.allergies}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  Bloodgroup : <b>{p_dets.bloodgroup}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  Medication : <b>{p_dets.medication}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  Occured Condition : <b>{p_dets.occur_cond}</b>
                </p>
              </div>
              <div className="inputfield">
                <p>
                  Emergency Number : <b>{p_dets.emergency_no}</b>
                </p>
              </div>
              <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>Upload Report </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DoctorDashboard;
