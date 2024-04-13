import React, { useState } from "react"
import Sidebar from "./Sidebar"
import ImagePicker from "./ImagePicker"
import Black from "../assets/black.jpg"
import { useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref as databaseRef, get, set, child } from "firebase/database"
import { getStorage, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import "../App.css"

function EditProfile() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [displayFirstName, setDisplayFirstName] = useState("")
    const [displayLastName, setDisplayLastName] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const dbRef = databaseRef(getDatabase())
    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser
    const db = getDatabase()
    const storage = getStorage()

    onAuthStateChanged(auth, (user) => {
        const profilePicture = storageRef(storage, "images/users/" + user.uid + "/profile")
        if (user) {
            getDownloadURL(profilePicture)
                .then((url) => {
                    setImageUrl(url)
                })
                .catch((error) => {
                    console.log(error)
                })

            get(child(dbRef, "/users/" + user.uid))
                .then((snapshot) => {
                    const userData = snapshot.val()
                    setDisplayFirstName(userData.firstName)
                    setDisplayLastName(userData.lastName)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })

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
            const updatedFirstName = firstName || displayFirstName
            const updatedLastName = lastName || displayLastName

            set(databaseRef(db, "/users/" + user.uid), {
                email: user.email,
                firstName: updatedFirstName,
                lastName: updatedLastName,
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
                        <img className="editProfilePicture" src={imageUrl ? imageUrl : Black} alt="Profile"/>                   
                        <div className="imagePickerContainer inputGroup">
                            <label className="formInputLabel">Profile Picture: </label>
                            <ImagePicker onFileSelect={handleFileSelect} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">First Name: </label>
                            <input className="editProfileInput formInput" value={firstName} placeholder={displayFirstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label className="formInputLabel">Last Name: </label>
                            <input className="editProfileInput formInput" value={lastName} placeholder={displayLastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
