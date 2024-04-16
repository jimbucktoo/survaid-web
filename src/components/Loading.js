import React from "react"
import "../App.css"
import Spinner from "react-bootstrap/Spinner"

function Loading() {
    return (
        <div className="loading">
            <h5 className="loadingTitle">Please create or select a survey to continue</h5>
            <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading
