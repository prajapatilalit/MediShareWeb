import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPres } from "../CallingApi/patientapi";

function OrgPrescription({ history }) {
  // console.log(history.location.state.userinfo?.UID)
  const [presData, setPresData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    getPres(history.location.state.userinfo?.UID)
      .then((data) => {
        console.log(data);
        setPresData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDataReceived(true);
  }, []);
  return (
    <div>
      <h1>View Prescription Here</h1>
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
      <ol>
        {presData.map((data, i) => {
          const val = data.medDetails.map((innerData, i) => {
            return (
              <li>
                <div style={{ color: "green" }}>
                  {i === 0 ? (
                    <div>
                      <br></br>
                      <h2>Prescribed by : Dr. {data.Doctor} </h2>
                      <h2>
                        Data {`&`} Time : {data.createdAt}{" "}
                      </h2>
                      <h3>No of Medication : {data.medDetails.length}</h3>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  <h3>
                    {" "}
                    Medicine Name : {innerData.med_name} Duration :{" "}
                    {innerData.duration}{" "}
                  </h3>
                  <h3>
                    Dosage : {innerData.Morning_dosage}{" "}
                    {innerData.Evening_dosage}
                  </h3>

                  {console.log(i, innerData.med_name)}
                </div>
              </li>
            );
          });
          return val;
        })}
      </ol>
    </div>
  );
}

export default OrgPrescription;
