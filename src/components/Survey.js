import React, { useState, useEffect, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import text from "../assets/text.png"
import slider from "../assets/slider.png"
import choice from "../assets/choice.png"
import camera from "../assets/camera.png"
import microphone from "../assets/microphone.png"
import Sidebar from "./Sidebar"
import Loading from "./Loading"
import { getAuth, onAuthStateChanged  } from "firebase/auth"
import { getDatabase, ref, push } from "firebase/database"
import "../App.css"

function Surveys() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [selectedQuestionType, setSelectedQuestionType] = useState({ name: "Text", icon: text })
    const { newSurveyKey } = useContext(SurveyContext)
    const [isLoading, setIsLoading] = useState(true)

    const auth = getAuth()
    const db = getDatabase()

    useEffect(() => {
        if (newSurveyKey !== null) {
            setIsLoading(false)
        }
    }, [newSurveyKey])

    function pushQuestion() {
        console.log(selectedQuestionType)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const newQuestionRef = push(ref(db, "/surveys/" + newSurveyKey + "/questions"), {
                    title: title,
                    description: desc,
                    type: selectedQuestionType.name
                })
                const newQuestionKey = newQuestionRef.key
                console.log(newQuestionKey)
            }
        })
    }

    return (
        <div className="main">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ):(
                <div className="content">
                    <div className="headerBar">
                        <h5 className="header">Survey:</h5>
                        <div>
                            <button
                            className="btn btn-primary save"
                            type="button"
                            onClick={pushQuestion}
                        >
                                Save
                        </button>
                    </div>
                </div>
                <div id="questionForm" className="question">
                    <div className="questionType">
                        <h6 className="formInputLabel">Question Type: </h6>
                        <div className="dropdown">
                            <button
                            className="btn btn-secondary dropdown-toggle questionTypeDropdown"
                            type="button"
                            id="dropdownMenuButtonSurveys"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                                {selectedQuestionType ? (
                                    <>
                                    <img className="icon" src={selectedQuestionType.icon} alt={selectedQuestionType.name} />
                                    {selectedQuestionType.name}
                                    </>
                                ) : (
                                    <>
                                    <img className="icon" src={text} alt="Text" />
                                    Text
                                    </>
                                )}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSurveys">
                                    {[
                                        { name: "Text", icon: text },
                                        { name: "Multiple Choice", icon: choice },
                                        { name: "Slider", icon: slider },
                                        { name: "Microphone", icon: microphone },
                                        { name: "Camera", icon: camera },
                                    ].map((questionType, index) => (
                                        <li key={index}>
                                            <button className="dropdown-item" onClick={() => setSelectedQuestionType(questionType)}>
                                                <img className="icon" src={questionType.icon} alt={questionType.name} />
                                                {questionType.name}
                                            </button>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="formInputs">
                                <div className="inputGroup">
                                    <label className="formInputLabel">Question Title: </label>
                                    <input
                                    name="title"
                                    className="formInput"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                    </div>
                                    <div className="inputGroup">
                                        <label className="formInputLabel">
                                            Question Description:{" "}
                                        </label>
                                        <input
                                        name="description"
                                        className="formInput"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="addQuestion" type="button">
                                        + Add Question
                                    </button>
                                </div>
                            </div>
            )}
                        </div>
    )
}

export default Surveys
