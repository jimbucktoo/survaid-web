import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../App.css";
import ImagePicker from "./ImagePicker";
import { getDatabase, ref, set, push } from "firebase/database";

function Surveys() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const db = getDatabase();

    function writeQuestion() {
        console.log(title);
        console.log(desc);
        set(ref(db, "/question"), {
            title: title,
            description: desc,
        });
    }

    function pushQuestion() {
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
                        onClick={pushQuestion}
                    >
                            Save
                    </button>
                    <button className="cancel">Cancel</button>
                </div>
            </div>
            <div className="question">
                <div className="questionInputs">
                    <div className="inputGroup">
                        <label className="questionInputLabel">Survey Title: </label>
                        <input className="questionInput" />
                    </div>
                    <div className="inputGroup">
                        <label className="questionInputLabel">Survey Description: </label>
                        <input className="questionInput" />
                    </div>
                    <div className="inputGroup">
                        <label className="questionInputLabel">Price: </label>
                        <input className="questionInput" />
                    </div>
                    <ImagePicker />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Surveys;
