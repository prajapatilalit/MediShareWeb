import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPres } from "../CallingApi/patientapi";
import "./card.css";

function PatientPrescription({ history }) {
  const [presData, setPresData] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  useEffect(() => {
    getPres(history.location.state)
      .then((data) => {
        console.log(data);
        setPresData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDataReceived(true);
  }, [history.location.state]);

  console.log(history);

  //     const pres = () => {
  //     if(dataReceived)

  //       console.log(val)
  //     }
  // }
  return (
    <>
      <div>
        <h1>This is pateint Prescription Dashboard</h1>
        <Link to="/patient/dashboard">
          {" "}
          <button>Patient Dashboard</button>{" "}
        </Link>

        <ol>
          {presData.map((data, i) => {
            const val = data.medDetails.map((innerData, i) => {
              return (
                <li>
                  <div className="wrap">
                    <div className="task">
                      <div className="abstract">
                        <h3>
                          No of Medication Prescribed: {data.medDetails.length}
                        </h3>{" "}
                        <p>
                          <strong>Medicine Name : </strong>
                          {innerData.med_name} <br />
                          <strong> Duration : </strong>
                          {innerData.duration}
                        </p>
                        <p>
                          <strong>Dosage : </strong>
                          {innerData.Morning_dosage.substring(0, 8)}
                          {" & "}
                          {innerData.Evening_dosage.substring(0, 8)}
                        </p>
                      </div>
                      {i >= 0 ? (
                        <div className="details">
                          <div className="details__inner">
                            <h3>Prescribed by : Dr. {data.Doctor} </h3>
                            <p>Date : {data.createdAt.substring(0, 10)}</p>
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
        {/* {JSON.stringify(presData)} */}
      </div>
    </>
  );
}

export default PatientPrescription;
