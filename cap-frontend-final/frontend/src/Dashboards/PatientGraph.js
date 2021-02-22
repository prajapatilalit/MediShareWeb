import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import Chart from "./chart";

function PatientGraph({ history }) {
  console.log(history);
  const UID = history.location.state;
  console.log(UID);
  const [graphValues, setGraphValues] = useState();

  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        const lastData = res.data.pop();
        const a = lastData.Blood_pressure;
        const b = lastData.Blood_sugar;
        const c = lastData.Cholesterol;
        const d = lastData.Heart_rate;
        const graphData = [a, b, c, d];
        setGraphValues(graphData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>This is Patient Graph Dashboard</h1>
      <Link to="/patient/dashboard">
        {""}
        <button>Patient Dashboard</button>
        {""}
      </Link>
      {/* {JSON.stringify(graphValues)} */}
      <Chart data={graphValues} />
    </div>
  );
}

export default PatientGraph;
