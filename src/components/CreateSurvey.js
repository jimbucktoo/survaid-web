import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../App.css";
import ImagePicker from "./ImagePicker";
import { getDatabase, ref as databaseRef, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

function CreateSurvey() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const db = getDatabase();
    const storage = getStorage();

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFile) {
            uploadBytes(storageRef(storage, "testImage"), selectedFile).then((snapshot) => {
                console.log("Image Uploaded");
            });
        }
        pushQuestion();
    }

    function pushQuestion() {
        const newSurveyRef = push(databaseRef(db, "/surveys"), {
            title: title,
            description: desc,
            price: price,
        });

        const newSurveyKey = newSurveyRef.key;
        console.log(newSurveyKey);
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Survey:</h5>
                    <div>
                        <button className="btn btn-primary save" type="submit" form="surveyForm">Save</button>
                        <button className="cancel">Cancel</button>
                    </div>
                </div>
                <form id="surveyForm" className="survey" onSubmit={handleSubmit}>
                    <div className="surveyInputs">
                        <div className="inputGroup">
                            <label className="surveyInputLabel">Survey Title: </label>
                            <input className="surveyInput" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="surveyInputLabel">Survey Description: </label>
                            <input className="surveyInput" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="surveyInputLabel">Survey Price: </label>
                            <input className="surveyInput" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <ImagePicker onFileSelect={handleFileSelect} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSurvey;
