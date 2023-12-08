import React from "react";
import binary from "../assets/binary.png";
import text from "../assets/text.png";
import number from "../assets/number.png";
import slider from "../assets/slider.png";
import scale from "../assets/scale.png";
import choice from "../assets/choice.png";
import checkbox from "../assets/checkbox.png";
import camera from "../assets/camera.png";
import microphone from "../assets/microphone.png";
import speakers from "../assets/speakers.png";
import accelerometer from "../assets/accelerometer.png";
import pedometer from "../assets/pedometer.png";
import altimeter from "../assets/altimeter.png";
import light from "../assets/light.png";
import gps from "../assets/gps.png";
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
                <div className="bodyBox">
                    <div>
                        <h6 className="fieldInputLabel">Question Type: </h6>
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
                                            src={binary}
                                            alt="Binary"
                                        />
                                        Binary
                                    </a>
                                </li>
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
                                            src={number}
                                            alt="Number"
                                        />
                                        Number
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
                                            src={scale}
                                            alt="Scale"
                                        />
                                        Likert Scale
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
                                            src={checkbox}
                                            alt="Checkbox"
                                        />
                                        Checkbox
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bodyBoxInput">
                        <label className="fieldInputLabel">
                            Question Title:{" "}
                        </label>
                        <input className="fieldInput" />
                        <label className="fieldInputLabel">
                            Question Description:{" "}
                        </label>
                        <input className="fieldInput" />
                        <label className="fieldInputLabel">
                            Minimum Input:{" "}
                        </label>
                        <input className="fieldInput" />
                        <label className="fieldInputLabel">
                            Maximum Input:{" "}
                        </label>
                        <input className="fieldInput" />
                        <label className="fieldInputLabel">Interval: </label>
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
                                aria-expanded="false"
                            >
                                <img
                                    className="icon"
                                    src={microphone}
                                    alt="Microphone"
                                />
                                Microphone
                            </button>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                            >
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
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                            className="icon"
                                            src={speakers}
                                            alt="Speakers"
                                        />
                                        Speakers
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                            className="icon"
                                            src={accelerometer}
                                            alt="Accelerometer"
                                        />
                                        Accelerometer
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                            className="icon"
                                            src={pedometer}
                                            alt="Pedometer"
                                        />
                                        Pedometer
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                            className="icon"
                                            src={altimeter}
                                            alt="Altimeter"
                                        />
                                        Altimeter
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                            className="icon"
                                            src={light}
                                            alt="Light"
                                        />
                                        Ambient Light
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/surveys">
                                        <img
                                            className="icon"
                                            src={gps}
                                            alt="GPS"
                                        />
                                        GPS Location
                                    </a>
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
