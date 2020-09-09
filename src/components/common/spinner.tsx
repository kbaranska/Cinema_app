import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./spinner.css"

export default function Spinner(){
    return(   
        <div className="loadingSpinner" ><FontAwesomeIcon icon={faSpinner} spin={true} color="white" size="4x" /> </div>
           
    )
}