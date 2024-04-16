import React, { useState, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import ImagePicker from "./ImagePicker"
import { useNavigate } from "react-router-dom"
import { getDatabase, ref as databaseRef, push, serverTimestamp } from "firebase/database"
import { getStorage, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import { getAuth } from "firebase/auth"
import "../App.css"

function CreateSurvey() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const { setNewSurveyTitle, setNewSurveyKey } = useContext(SurveyContext)

    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser
    const db = getDatabase()
    const storage = getStorage()

    const handleFileSelect = (file) => {
        setSelectedFile(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedFile) {
            uploadBytes(storageRef(storage, "/images/surveys/" + Date.now() + "/surveyImage"), selectedFile).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    pushSurvey(downloadURL)
                }).catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    function pushSurvey(downloadURL) {
        if (user) {
            const newSurveyRef = push(databaseRef(db, "/surveys"), {
                title: title,
                description: desc,
                price: price,
                createdBy: user.uid,
                createdByEmail: user.email,
                createdAt: serverTimestamp(),
                researchers: [user.uid],
                surveyImage: downloadURL
            })

            const newSurveyKey = newSurveyRef.key
            setNewSurveyTitle(title)
            setNewSurveyKey(newSurveyKey)
            navigate("/Survey")
        }
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Create Survey:</h5>
                    <div>
                        <button className="btn btn-primary create" type="submit" form="surveyForm">Create</button>
                    </div>
                </div>
                <form id="surveyForm" className="survey" onSubmit={handleSubmit}>
                    <div className="formInputs">
                        <div className="inputGroup">
                            <label className="formInputLabel">Title: </label>
                            <input className="formInput" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Description: </label>
                            <input className="formInput" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Price: </label>
                            <input className="formInput" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Image: </label>
                            <ImagePicker onFileSelect={handleFileSelect} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSurvey
