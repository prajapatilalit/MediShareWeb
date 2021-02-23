import React, { useState, useEffect } from "react";
import { addGraphValues, getPatGraph } from "../CallingApi/patientapi";
import { Link } from "react-router-dom";
import Chart from "./chart";

function OrgGraph({ history }) {
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
  return (
    <div>
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
      </div>

      <div className="chart_box">
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
    </div>
  );
}

export default OrgGraph;
