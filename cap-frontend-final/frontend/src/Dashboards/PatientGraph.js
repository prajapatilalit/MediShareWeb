import React from 'react'
import {Link} from "react-router-dom"
function PatientGraph() {
    return (
        <div>
           <h1>This is Patient Graph Dashboard</h1> 
           <Link to = "/patient/dashboard"> <button>Patient Dashboard</button> </Link>
        </div>
    )
}

export default PatientGraph
