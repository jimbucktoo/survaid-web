import React, { useState, useEffect, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import Loading from "./Loading"
import "../App.css"

function Analytics() {
    const [isLoading, setIsLoading] = useState(true)
    const { newSurveyKey } = useContext(SurveyContext)

    useEffect(() => {
        if (newSurveyKey !== null) {
            setIsLoading(false)
        }
    }, [newSurveyKey])

    return (
        <div className="main">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="content">
                    <div className="headerBar">
                        <h5 className="header">Analytics:</h5>
                    </div>
                    <div className="fullContainer">
                    </div>
                </div>
            )}
            </div>
    )
}

export default Analytics
