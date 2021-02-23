import React, { useState, useEffect } from "react";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import { Link } from "react-router-dom";
import Chart from "./chart";

function OrgGraph({ history }) {
  const UID = history.location.state.userinfo.UID;
  console.log(UID);
  const [graphValues, setGraphValues] = useState();

  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        const lastData = res.data.pop();
        const a = lastData.Heart_rate;
        const b = lastData.Blood_pressure;
        const c = lastData.Cholesterol;
        const d = lastData.Blood_sugar;
        const graphData = [a, b, c, d];
        setGraphValues(graphData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(history)
  return (
    <div>
      <h1>Organisation Graph</h1>
      <button
        onClick={() => {
          history.push("/org/dashboard");
        }}
      >
        Organisation Dashboard
      </button>
      <button
        onClick={() => {
          history.push("/org/allDetails", history.location.state);
        }}
      >
        Organisation all details Dashboard
      </button>
      {/* {JSON.stringify(graphValues)} */}
      <Chart data={graphValues} />
    </div>
  );
}

export default OrgGraph;
