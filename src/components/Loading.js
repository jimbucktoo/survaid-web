import React from "react"
import "../App.css"

function Loading() {
    return (
        <div className="loading">
            <h5 className="loadingTitle">Please select a survey to continue</h5>
            <div class="spinner-border text-primary spin" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
