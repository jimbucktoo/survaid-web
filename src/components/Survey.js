import React, { useState, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import text from "../assets/text.png"
import slider from "../assets/slider.png"
import choice from "../assets/choice.png"
import camera from "../assets/camera.png"
import microphone from "../assets/microphone.png"
import Sidebar from "./Sidebar"
import { getAuth, onAuthStateChanged  } from "firebase/auth"
import { getDatabase, ref, push } from "firebase/database"
import "../App.css"

function Surveys() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [selectedQuestionType, setSelectedQuestionType] = useState(null)
    const { newSurveyKey } = useContext(SurveyContext)

    const auth = getAuth()
    const db = getDatabase()

    if (newSurveyKey) {
        console.log(newSurveyKey)
    }

    function pushQuestion() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const newQuestionRef = push(ref(db, "/questions"), {
                    title: title,
                    description: desc,
                })

                const newQuestionKey = newQuestionRef.key
                console.log("Question Created: " + newQuestionKey)
            } else {
                console.log("Not Authenticated")
            }
        })
    }

    return (
        <div className="main">
            <Sidebar />
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
                    <button className="cancel">Cancel</button>
                </div>
            </div>
            <form id="questionForm" className="question">
                <div className="questionType">
                    <h6 className="questionInputLabel">Question Type: </h6>
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
                            </form>
                            <div>
                                <button className="addQuestion" type="button">
                                    + Add Question
                                </button>
                            </div>
                        </div>
                    </div>
    )
}

export default Surveys
