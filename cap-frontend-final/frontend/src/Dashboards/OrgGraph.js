import React from 'react'
import {Link} from "react-router-dom"
function OrgGraph({history}) {
    console.log(history)
    return (
        <div>
           <h1>Organisation Graph</h1> 
            <button onClick = { ( ) => {  history.push("/org/dashboard")   }} >Organisation Dashboard</button> 
            <button onClick = { ( ) => {  history.push("/org/allDetails", history.location.state)   }} >Organisation all details Dashboard</button> 

        </div>
    )
}

export default OrgGraph