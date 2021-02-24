import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPres } from "../CallingApi/patientapi";
import Button from "@material-ui/core/Button";
import "./styles.css";
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
    <div style={{ padding: "10px" }}>
      <div style={{ marginTop: "50px", padding: "15px", textAlign: "center" }}>
        <h1>{patientName}'s Previous Prescriptions</h1>
      </div>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => {
            history.push(
              "/doctor/AddingFeatures/prescription",
              history.location.state
            );
          }}
        >
          Go back to Doctor Upload
        </Button>
      </div>
      <div>
        {presData ? (
          <div className="prescription_data">
            <ol>
              {presData.map((data, i) => {
                const val = data.medDetails.map((innerData, i) => {
                  return (
                    <li>
                      <div className="wrap">
                        <div className="task">
                          <div className="abstract">
                            <h3>
                              No of Medication Prescribed:{" "}
                              {data.medDetails.length}
                            </h3>{" "}
                            <p>
                              <strong>Medicine Name : </strong>
                              {innerData.med_name} <br />
                              <strong> Duration : </strong>
                              {innerData.duration}
                            </p>
                            <p>
                              <strong>Dosage : </strong>
                              {innerData.Morning_dosage}{" "}
                              {innerData.Evening_dosage}
                            </p>
                          </div>
                          {i >= 0 ? (
                            <div className="details ">
                              <div className="details__inner">
                                <h3>Prescribed by : Dr. {data.Doctor} </h3>
                                <p>
                                  Data {`&`} Time : {data.createdAt}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {console.log(i, innerData.med_name)}
                        </div>
                      </div>
                    </li>
                  );
                });
                return val;
              })}
            </ol>
          </div>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </div>
  );
};

export default PreviousPrescriptions;
