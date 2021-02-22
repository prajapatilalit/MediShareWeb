import React, { useState, useEffect } from "react";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import { Link } from "react-router-dom";

function OrgGraph({ history }) {
  const UID = history.location.state.userinfo.UID;
  console.log(UID);
  const [graphValues, setGraphValues] = useState();

  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        setGraphValues(res);
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
      {JSON.stringify(graphValues)}
    </div>
  );
}

export default OrgGraph;
