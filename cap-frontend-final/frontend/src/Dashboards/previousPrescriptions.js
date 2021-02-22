import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPres } from "../CallingApi/patientapi";
const PreviousPrescriptions = ({ history }) => {
  const UID = history?.location.state.userinfo.UID;
  const patientName = history?.location.state.userinfo.patient_name;
  console.log(UID);

  const [presData, setPresData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    getPres(UID)
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
      <h1>{patientName}'s Previous Prescriptions</h1>
      <button
        onClick={() => {
          history.push(
            "/doctor/AddingFeatures/prescription",
            history.location.state
          );
        }}
      >
        Go back to Doctor Upload
      </button>
      {presData ? (
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
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

export default PreviousPrescriptions;
