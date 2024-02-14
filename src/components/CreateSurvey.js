import React, { useState, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import ImagePicker from "./ImagePicker"
import { useNavigate } from "react-router-dom"
import { getDatabase, ref as databaseRef, push } from "firebase/database"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import { getAuth, onAuthStateChanged  } from "firebase/auth"
import "../App.css"

function CreateSurvey() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const { setNewSurveyKey } = useContext(SurveyContext)

    const navigate = useNavigate()
    const auth = getAuth()
    const db = getDatabase()
    const storage = getStorage()

    const handleFileSelect = (file) => {
        setSelectedFile(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedFile) {
            uploadBytes(storageRef(storage, "testImage"), selectedFile).then((snapshot) => {
            })
        }
        pushSurvey()
    }

    function pushSurvey() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const newSurveyRef = push(databaseRef(db, "/surveys"), {
                    title: title,
                    description: desc,
                    price: price,
                    createdBy: user.uid
                })

                const newSurveyKey = newSurveyRef.key
                setNewSurveyKey(newSurveyKey)
                console.log("Survey Created: " + newSurveyKey)
                navigate("/Surveys")
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
                    <h5 className="header">Create Survey:</h5>
                    <div>
                        <button className="btn btn-primary save" type="submit" form="surveyForm">Save</button>
                        <button className="cancel">Cancel</button>
                    </div>
                </div>
                <form id="surveyForm" className="survey" onSubmit={handleSubmit}>
                    <div className="surveyInputs">
                        <div className="inputGroup">
                            <label className="surveyInputLabel">Title: </label>
                            <input className="surveyInput" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="surveyInputLabel">Description: </label>
                            <input className="surveyInput" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="surveyInputLabel">Price: </label>
                            <input className="surveyInput" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <ImagePicker onFileSelect={handleFileSelect} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSurvey
