import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPres } from "../CallingApi/patientapi";
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
  }, []);

  console.log(history);

  //     const pres = () => {
  //     if(dataReceived)

  //       console.log(val)
  //     }
  // }
  return (
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
      {/* {JSON.stringify(presData)} */}
    </div>
  );
}

export default PatientPrescription;
