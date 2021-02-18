import React from 'react'
import {Link} from "react-router-dom"

function Graph({history}) {
    return (
        <div>
            <h1>Add Graph here</h1>
            <Link to = "/doctor/dashboard"> <button>Go back To Dashboard</button> </Link> 
             <button onClick = { () => {history.push("/doctor/AddingFeatures",history.location.state)} } >Go back Upload Panal</button> 
        </div>
    )
}

export default Graph
