import React, { useState, useEffect, useContext } from "react";
import { SurveyContext } from "../SurveyContext";
import text from "../assets/text.png";
import slider from "../assets/slider.png";
import choice from "../assets/choice.png";
import camera from "../assets/camera.png";
import microphone from "../assets/microphone.png";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";
import "../App.css";

function Survey() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedQuestionType, setSelectedQuestionType] = useState({
        name: "Text",
        icon: text,
    });
    const { newSurveyKey } = useContext(SurveyContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [questionsArray, setQuestionsArray] = useState([]);

    const auth = getAuth();
    const db = getDatabase();
    const dbRef = ref(getDatabase());

    useEffect(() => {
        if (newSurveyKey !== null) {
            setIsLoading(false);
        }

        get(child(dbRef, "/surveys/" + newSurveyKey + "/questions"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setQuestionsArray(snapshot.val());
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [newSurveyKey, dbRef]);

    function pushQuestion() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const questionData = {
                    title: title,
                    description: desc,
                    type: selectedQuestionType.name,
                    icon: selectedQuestionType.icon,
                };
                const updatedQuestionArray = [...questionsArray, questionData];
                setQuestionsArray(updatedQuestionArray);
                setTitle("");
                setDesc("");
                setIsEditing(true);
            }
        });
    }

    function deleteQuestion(index) {
        const questions = [...questionsArray];
        questions.splice(index, 1);
        setQuestionsArray(questions);
    }

    function editQuestions() {
        setIsEditing(true);
    }

    function saveQuestions() {
        update(ref(db, "/surveys/" + newSurveyKey), {
            questions: questionsArray,
        });
        setTitle("");
        setDesc("");
        setIsEditing(false);
    }

    return (
        <div className="main">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="content">
                    <div className="headerBar">
                        <h5 className="header">Survey:</h5>
                        <div>
                            {isEditing ? (
                                <button
                                    className="btn btn-primary edit"
                                    type="button"
                                    onClick={saveQuestions}
                                >
                                    Save
                                </button>
                            ) : (
                                questionsArray.length > 0 && (
                                    <button
                                        className="btn btn-primary save"
                                        type="button"
                                        onClick={editQuestions}
                                    >
                                        Edit
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                    <div className="displayQuestions">
                        {questionsArray !== null &&
                            questionsArray.map((displayQuestion, index) => (
                                <React.Fragment key={index}>
                                    <div className="displayQuestion">
                                        <div className="questionHeader">
                                            Question {index + 1}:
                                        </div>
                                        <div className="questionType">
                                            <div className="formInputLabel">
                                                Question Type:{" "}
                                            </div>
                                            <div className="displayQuestionType">
                                                <img
                                                    className="icon"
                                                    src={displayQuestion.icon}
                                                    alt={displayQuestion.type}
                                                />
                                                <div className="displayQuestionTypeText">
                                                    {displayQuestion.type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="formInputs">
                                            <div className="inputGroup">
                                                <div className="displayQuestionLabel">
                                                    Question Title:{" "}
                                                    {displayQuestion.title}
                                                </div>
                                            </div>
                                            <div className="inputGroup">
                                                <div className="displayQuestionLabel">
                                                    Question Description:{" "}
                                                    {
                                                        displayQuestion.description
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {isEditing ? (
                                            <div className="displayQuestionOptions">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        deleteQuestion(index)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                    </div>
                    {isEditing ? (
                        <div>
                            <div id="questionForm" className="question">
                                <div className="questionHeader">
                                    Question {questionsArray.length + 1}:
                                </div>
                                <div className="questionType">
                                    <label className="formInputLabel">
                                        Question Type:{" "}
                                    </label>
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
                                                    <img
                                                        className="icon"
                                                        src={
                                                            selectedQuestionType.icon
                                                        }
                                                        alt={
                                                            selectedQuestionType.name
                                                        }
                                                    />
                                                    {selectedQuestionType.name}
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        className="icon"
                                                        src={text}
                                                        alt="Text"
                                                    />
                                                    Text
                                                </>
                                            )}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButtonSurveys"
                                        >
                                            {[
                                                { name: "Text", icon: text },
                                                {
                                                    name: "Multiple Choice",
                                                    icon: choice,
                                                },
                                                {
                                                    name: "Slider",
                                                    icon: slider,
                                                },
                                                {
                                                    name: "Microphone",
                                                    icon: microphone,
                                                },
                                                {
                                                    name: "Camera",
                                                    icon: camera,
                                                },
                                            ].map((questionType, index) => (
                                                <li key={index}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            setSelectedQuestionType(
                                                                questionType
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            className="icon"
                                                            src={
                                                                questionType.icon
                                                            }
                                                            alt={
                                                                questionType.name
                                                            }
                                                        />
                                                        {questionType.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="formInputs">
                                    <div className="inputGroup">
                                        <label className="formInputLabel">
                                            Question Title:{" "}
                                        </label>
                                        <input
                                            name="title"
                                            className="formInput"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setDesc(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="displayQuestionOptions">
                                    <button
                                        className="btn btn-primary"
                                        onClick={pushQuestion}
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : questionsArray.length > 0 ? (
                        <></>
                    ) : (
                        <div>
                            <div id="questionForm" className="question">
                                <div className="questionHeader">
                                    Question {questionsArray.length + 1}:
                                </div>
                                <div className="questionType">
                                    <label className="formInputLabel">
                                        Question Type:{" "}
                                    </label>
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
                                                    <img
                                                        className="icon"
                                                        src={
                                                            selectedQuestionType.icon
                                                        }
                                                        alt={
                                                            selectedQuestionType.name
                                                        }
                                                    />
                                                    {selectedQuestionType.name}
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        className="icon"
                                                        src={text}
                                                        alt="Text"
                                                    />
                                                    Text
                                                </>
                                            )}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButtonSurveys"
                                        >
                                            {[
                                                { name: "Text", icon: text },
                                                {
                                                    name: "Multiple Choice",
                                                    icon: choice,
                                                },
                                                {
                                                    name: "Slider",
                                                    icon: slider,
                                                },
                                                {
                                                    name: "Microphone",
                                                    icon: microphone,
                                                },
                                                {
                                                    name: "Camera",
                                                    icon: camera,
                                                },
                                            ].map((questionType, index) => (
                                                <li key={index}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            setSelectedQuestionType(
                                                                questionType
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            className="icon"
                                                            src={
                                                                questionType.icon
                                                            }
                                                            alt={
                                                                questionType.name
                                                            }
                                                        />
                                                        {questionType.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="formInputs">
                                    <div className="inputGroup">
                                        <label className="formInputLabel">
                                            Question Title:{" "}
                                        </label>
                                        <input
                                            name="title"
                                            className="formInput"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setDesc(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="displayQuestionOptions">
                                    <button
                                        className="btn btn-primary"
                                        onClick={pushQuestion}
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Survey;
