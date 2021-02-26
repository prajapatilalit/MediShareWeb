import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getPres } from "../CallingApi/patientapi";
import Button from "@material-ui/core/Button";
import "./styles.css";

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
    <div style={{ margin: "10px" }}>
      <div>
        <div className="prescription_header">
          <h1> See Prescription Here</h1>
        </div>
      </div>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            history.push("/org/dashboard");
          }}
        >
          Organisation Dashboard
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            history.push("/org/allDetails", history.location.state);
          }}
        >
          Organisation all details Dashboard
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
                          {i === 0 ? (
                            <div className="details">
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
}

export default OrgPrescription;
