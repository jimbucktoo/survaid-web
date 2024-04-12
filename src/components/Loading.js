import React from "react"
import "../App.css"
import spinnerImage from "../assets/spinner.png"

function Loading() {
    return (
        <div className="loading">
            <h5 className="loadingTitle">Please create or select a survey to continue</h5>
            <div className="spinnerContainer">
                <img src={spinnerImage} alt="Spinner" className="spinnerImage" />
                <div className="spinner-border text-primary spin" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading
