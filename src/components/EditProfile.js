import React, { useState } from "react"
import Sidebar from "./Sidebar"
import ImagePicker from "./ImagePicker"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { getDatabase, ref as databaseRef, set } from "firebase/database"
import { getStorage, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import "../App.css"

function EditProfile() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

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
        if (user !== null && selectedFile) {
            uploadBytes(storageRef(storage, "/images/users/" + user.uid + "/profile"), selectedFile).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    updateUser(downloadURL)
                }).catch((error) => {
                    console.error("Error getting download URL:", error)
                })
            })
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        navigate("/Profile")
    }

    function updateUser(downloadURL) {
        if (user !== null) {
            set(databaseRef(db, "/users/" + user.uid), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: "Researcher",
                profilePicture: downloadURL
            })
            navigate("/Profile")
        }
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Edit Profile:</h5>
                    <div>
                        <button className="btn btn-primary save" type="submit" form="surveyForm">Save</button>
                        <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                <form id="surveyForm" className="survey" onSubmit={handleSubmit}>
                    <div className="formInputs">
                        <div className="inputGroup">
                            <label className="formInputLabel">First Name: </label>
                            <input className="formInput" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Last Name: </label>
                            <input className="formInput" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Email: </label>
                            <input className="formInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Profile Picture: </label>
                            <ImagePicker onFileSelect={handleFileSelect} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
