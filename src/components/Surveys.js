import React from "react";
import text from "../assets/text.png";
import slider from "../assets/slider.png";
import choice from "../assets/choice.png";
import camera from "../assets/camera.png";
import microphone from "../assets/microphone.png";
import Sidebar from "./Sidebar";
import "../App.css";

function Surveys() {
    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Survey:</h5>
                    <div>
                        <button class="btn btn-primary save" type="button">
                            Save
                        </button>
                        <button class="cancel">Cancel</button>
                    </div>
                </div>
                <div className="question">
                    <div className="questionType">
                        <h6 className="questionInputLabel">Question Type: </h6>
                        <div class="dropdown">
                            <button
                            class="btn btn-secondary dropdown-toggle questionTypeDropdown"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                                <img
                                className="icon"
                                src={slider}
                                alt="Slider Icon"
                            />
                                    Slider
                            </button>
                            <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                        >
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                        className="icon"
                                        src={text}
                                        alt="Text"
                                    />
                                            Text
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                        className="icon"
                                        src={slider}
                                        alt="Slider"
                                    />
                                            Slider
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                        className="icon"
                                        src={choice}
                                        alt="Choice"
                                    />
                                            Multiple Choice
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                        className="icon"
                                        src={camera}
                                        alt="Camera"
                                    />
                                            Camera
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                        className="icon"
                                        src={microphone}
                                        alt="Microphone"
                                    />
                                            Microphone
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="questionInputs">
                        <div className="inputGroup">
                            <label className="questionInputLabel">
                                Question Title:{" "}
                            </label>
                            <input className="questionInput" />
                        </div>
                        <div className="inputGroup">
                            <label className="questionInputLabel">
                                Question Description:{" "}
                            </label>
                            <input className="questionInput" />
                        </div>
                        <div className="inputGroup">
                            <label className="questionInputLabel">
                                Minimum Input:{" "}
                            </label>
                            <input className="questionInput" />
                        </div>
                        <div className="inputGroup">
                            <label className="questionInputLabel">
                                Maximum Input:{" "}
                            </label>
                            <input className="questionInput" />
                        </div>
                        <div className="inputGroup">
                            <label className="questionInputLabel">Interval: </label>
                            <input className="questionInput" />
                        </div>
                    </div>
                </div>
                <div>
                    <button class="addQuestion" type="button">
                        + Add Question
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Surveys;
