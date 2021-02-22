import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import Chart from "./chart";

function Graph({ history }) {
  const doc = JSON.parse(localStorage.getItem("jwt"));
  const doctorName = doc.user.doctor_name;
  const UID = history.location.state.userinfo.UID;

  const [graphValues, setGraphValues] = useState();

  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        console.log("GraphValues", setGraphValues(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  const onClicks = () => {
    addGraphValues({ UID, Doctor: doctorName, ...values })
      .then((res) => {
        setResult(res.message);
        setResultValues(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(values);
  return (
    <div>
      <h1>Add Graph here</h1>
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
      <br></br>
      <br></br>
      <br></br>
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
      <button onClick={onClicks}>Submit </button>
      {result ? <p style={{ color: "green" }}>{result}</p> : ""}
      {/* {JSON.stringify(resultValues)}
             {JSON.stringify(values)} */}
      {JSON.stringify(graphValues)}

      <Chart data={getPatGraph} />
    </div>
  );
}

export default Graph;
