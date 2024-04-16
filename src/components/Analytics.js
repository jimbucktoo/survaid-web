import React, { useState, useEffect, useContext, useCallback } from "react"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import Loading from "./Loading"
import { getDatabase, ref, child, get } from "firebase/database"
import "../App.css"

function Analytics() {
    const dbRef = ref(getDatabase())
    const [answers, setAnswers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { newSurveyKey } = useContext(SurveyContext)

    const renderAnswerValue = (value) => {
        if (
            typeof value === "string" &&
            (value.startsWith("http://") || value.startsWith("https://"))
        ) {
            return (
                <a href={value} target="_blank" rel="noopener noreferrer">
                    {value}
                </a>
            )
        }
        return value
    }

    const readData = useCallback(() => {
        get(child(dbRef, "/surveys/" + newSurveyKey + "/answers"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const promises = Object.entries(snapshot.val()).map(
                        ([participantID, values]) => {
                            return get(
                                child(
                                    dbRef,
                                    "/users/" + participantID + "/email"
                                )
                            ).then((emailSnapshot) => {
                                if (emailSnapshot.exists()) {
                                    const email = emailSnapshot.val()
                                    return { participantID, values, email }
                                } else {
                                    return null
                                }
                            })
                        }
                    )

                    Promise.all(promises).then((data) => {
                        const validData = data.filter((item) => item !== null)
                        setAnswers(validData)
                        setIsLoading(false)
                    })
                } else {
                    setIsLoading(false)
                    setAnswers(null)
                }
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }, [dbRef, newSurveyKey])

    useEffect(() => {
        if (newSurveyKey !== null) {
            setIsLoading(true)
            readData()
        }
    }, [newSurveyKey, readData])

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
                        <div className="analytics">Participant Answers:</div>
                        <div className="accordion" id="accordionExample">
                            {answers !== null &&
                                    answers.map(
                                        ({ participantID, values, email }) => {
                                            const collapseId = `collapse-${participantID}`
                                            return (
                                                <div
                                                className="accordion-item"
                                                key={participantID}
                                            >
                                                    <h2
                                                    className="accordion-header"
                                                    id={`heading-${participantID}`}
                                                >
                                                        <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#${collapseId}`}
                                                        aria-expanded="true"
                                                        aria-controls={
                                                            collapseId
                                                        }
                                                    >
                                                            {email}
                                                    </button>
                                                </h2>
                                                <div
                                                id={collapseId}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`heading-${participantID}`}
                                                data-bs-parent="#accordionExample"
                                            >
                                                    <div className="accordion-body">
                                                        {values.map(
                                                            (question) => (
                                                                <div
                                                                className="displayQuestion"
                                                                key={
                                                                    question.questionIndex
                                                                }
                                                            >
                                                                    <div className="displayQuestionLabel">
                                                                        Question
                                                                        ID:{" "}
                                                                        {
                                                                            question.questionIndex
                                                                        }
                                                                    </div>
                                                                    <div className="displayQuestionLabel">
                                                                        Question
                                                                        Type:{" "}
                                                                        {
                                                                            question.type
                                                                        }
                                                                    </div>
                                                                    <div className="displayQuestionLabel">
                                                                        Answer:{" "}
                                                                        {renderAnswerValue(
                                                                            question.value
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                            </div>
                                                        </div>
                                                    </div>
                                            )
                                        }
                                    )}
                                                </div>
                                            </div>
                                        </div>
            )}
                                    </div>
    )
}

export default Analytics
