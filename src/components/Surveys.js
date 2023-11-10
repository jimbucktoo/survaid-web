import React from "react";
import slider from "../assets/slider.png";
import microphone from "../assets/microphone.png";
import Sidebar from "./Sidebar"
import "../App.css";
import { Link } from "react-router-dom";

function Surveys() {
    return (
        <div className="surveys">
            <Sidebar />
            <div className="survey">
                <div className="headerBar">
                    <h5 className="surveyHeader">Sleep Apnea Survey:</h5>
                    <div>
                        <button class="btn btn-primary save" type="button">
                            Save
                        </button>
                        <a class="cancel" href="#">Cancel</a>
                    </div>
                </div>
                <div className="bodyBox">
                    <div>
                        <h6 className="fieldInputLabel">Question Type: </h6>
                        <div class="dropdown">
                            <button
                            class="btn btn-secondary dropdown-toggle questionTypeDropdown"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img className="slider" src={slider} />
                            Slider
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <a class="dropdown-item" href="#">Binary</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Text</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Number</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Slider</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Likert Scale</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Multiple Choice</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Checkbox</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bodyBoxInput">
                    <h6 className="fieldInputLabel">Question Title: </h6>
                    <input className="fieldInput" />
                    <h6 className="fieldInputLabel">Question Description: </h6>
                    <input className="fieldInput" />
                    <h6 className="fieldInputLabel">Minimum Input: </h6>
                    <input className="fieldInput" />
                    <h6 className="fieldInputLabel">Maximum Input: </h6>
                    <input className="fieldInput" />
                    <h6 className="fieldInputLabel">Interval: </h6>
                    <input className="fieldInput" />
                </div>
                <div>
                    <h6 className="fieldInputLabel">Sensors:</h6>
                    <div class="dropdown">
                        <button
                        class="btn btn-secondary dropdown-toggle questionTypeDropdown"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img className="microphone" src={microphone} />
                        Microphone
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a class="dropdown-item" href="#">Camera</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Microphone</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Speakers</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Accelerometer</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Pedometer</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Altimeter</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Ambient Light</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">GPS Location</a>
                        </li>
                    </ul>
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
