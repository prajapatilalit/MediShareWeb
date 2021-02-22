import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addPrescription, getPres } from "../CallingApi/patientapi";

function Prescription({ history }) {
  const histor = history.location.state;
  const [inputList, setInputList] = useState([{ med_name: "", duration: "" }]);
  const [finalList, setFinalList] = useState({});
  const [result, setResult] = useState({ success: "", error: "" });
  const [message, setMessage] = useState("");

  useEffect(async () => {
    await getPres(history.location.state.userinfo.UID)
      .then((res) => {
        console.log("USEEFFTCT", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const Patient_name = history?.location.state.userinfo.patient_name;

  console.log("Prescription", { history });
  return (
    <div>
      <h1>Add Prescription Here</h1>
      <Link to="/doctor/dashboard">
        {" "}
        <button>Go back To Dashboard</button>{" "}
      </Link>
      <button
        onClick={() => {
          history.push("/doctor/AddingFeatures", history.location.state);
        }}
      >
        Go back Upload Panal
      </button>
      <div className="App">
        <br></br>
        <h3>
          Check {Patient_name}'s Previos Prescription{" "}
          <button
            onClick={() => {
              history.push("/doctor/previousPrescriptions", histor);
            }}
          >
            Check Previous Prescriptions
          </button>{" "}
        </h3>

        <h3
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <a href="" style={{ color: "blue" }}>
            Prescription
          </a>
        </h3>
        <br></br>
        {inputList.map((x, i) => {
          return (
            <div className="box">
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
                  <button className="mr10" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button className="ml30" onClick={handleAddClick}>
                    + Medication
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <button onClick={onsubmits}>Submit</button>
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        {message ? <p style={{ color: "green" }}>{message}</p> : ""}
        {JSON.stringify(finalList)}
        <p style={{ color: "green", font: "bold" }}>{result.success}</p>
      </div>
      {/* <h1> {result.success ? <p>  {result.success}</p> : ""  }  </h1> */}
      {/* {JSON.stringify(result)} */}
    </div>
  );
}

export default Prescription;
