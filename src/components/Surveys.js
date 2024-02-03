import React, { useState } from "react";
import text from "../assets/text.png";
import slider from "../assets/slider.png";
import choice from "../assets/choice.png";
import camera from "../assets/camera.png";
import microphone from "../assets/microphone.png";
import Sidebar from "./Sidebar";
import "../App.css";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import {
    getDatabase,
    ref,
    child,
    get,
    onValue,
    set,
    push
} from "firebase/database";

function Surveys() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const db = getDatabase();
    const dbRef = ref(db, "/surveys");
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email + ": Signed In")
        } else {
            console.log("Signed Out")
        }
    });

    function readDataOnceWithObserver(){
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }

    function readDataOnce() {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "/surveys"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function writeData() {
        console.log(title);
        console.log(desc);
        set(ref(db, "/question"), {
            title: title,
            description: desc,
        });
    }

    function updateData() {
        push(ref(db, "/question"), {
            title: title,
            description: desc,
        });
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
                        onClick={updateData}
                    >
                            Save
                    </button>
                    <button className="cancel">Cancel</button>
                </div>
            </div>
            <div className="question">
                <div className="questionType">
                    <h6 className="questionInputLabel">Question Type: </h6>
                    <div className="dropdown">
                        <button
                        className="btn btn-secondary dropdown-toggle questionTypeDropdown"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                            <img className="icon" src={slider} alt="Slider Icon" />
                            Slider
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <a className="dropdown-item" href="/surveys">
                                    <img className="icon" src={text} alt="Text" />
                                    Text
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/surveys">
                                    <img className="icon" src={slider} alt="Slider" />
                                    Slider
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/surveys">
                                    <img className="icon" src={choice} alt="Choice" />
                                    Multiple Choice
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/surveys">
                                    <img className="icon" src={camera} alt="Camera" />
                                    Camera
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/surveys">
                                    <img className="icon" src={microphone} alt="Microphone" />
                                    Microphone
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="questionInputs">
                    <div className="inputGroup">
                        <label className="questionInputLabel">Question Title: </label>
                        <input
                        className="questionInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                        </div>
                        <div className="inputGroup">
                            <label className="questionInputLabel">
                                Question Description:{" "}
                            </label>
                            <input
                            className="questionInput"
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
            </div>
    );
}

export default Surveys;
