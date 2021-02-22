import React from 'react'
import {Link} from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../Landing Page/Button'
import '../Landing Page/Navbar.css'
import './styles.css'

// age: 26
// allergies: "latex and dust mites allergies"
// bloodgroup: "O-"
// createdAt: "2021-02-11T12:50:51.436Z"
// emergency_no: 9955894949
// gender: "M"
// medication: "methotrexate, sulfasalazine"
// occur_cond: "Rheumatoid Arthritis"

function DoctorUploadPanal({history}) {

    console.log(history);

    const {age,allergies,bloodgroup,createdAt,emergency_no,gender,medication,occur_cond} = history.location.state

    const {patient_name} = history.location.state.userinfo

    console.log(age,allergies,bloodgroup,createdAt,emergency_no,gender,medication,occur_cond)
    
    return (
        <>
        <div>
            <h1>This is doctor upload panal</h1>
          <Link to = "/doctor/dashboard"> <button>Go back To Dashboard</button> </Link> 
          <br></br>
          <br></br>
       <button onClick = {() => {history.push("/doctor/AddingFeatures/prescription" , history.location.state )}} >Prescription</button> 
          <br></br>
          <button onClick = {  ( ) => {history.push("/doctor/AddingFeatures/graph", history.location.state)}  }  >Graph</button>
          <br></br>
        </div>
        <div className='wrapper'>
        <div className='form'>
              <div className='inputfield'>
                <p>
                  {' '}
                  Name : <b>{patient_name}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  {' '}
                  Age : <b>{age}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  Gender : <b>{gender}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  Allergies : <b>{allergies}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  Bloodgroup : <b>{bloodgroup}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  Medication : <b>{medication}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  Occured Condition : <b>{occur_cond}</b>
                </p>
              </div>
              <div className='inputfield'>
                <p>
                  Emergency Number : <b>{emergency_no}</b>
                </p>
              </div>
              </div>
            </div>
        
        </>
    

    )
}

export default DoctorUploadPanal
