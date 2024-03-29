import React, { useState, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import Black from "../assets/black.jpg"
import { useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getDatabase, ref as databaseRef, get, child } from "firebase/database"
import { getStorage, getDownloadURL, ref as storageRef } from "firebase/storage"
import "../App.css"

function Profile() {
    const { setNewSurveyTitle, setNewSurveyKey } = useContext(SurveyContext)
    const navigate = useNavigate()
    const auth = getAuth()
    const dbRef = databaseRef(getDatabase())
    const storage = getStorage()

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [imageUrl, setImageUrl] = useState(null)

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
                    setDisplayName(userData.firstName + " " + userData.lastName)
                    setEmail(userData.email)
                    setRole(userData.role)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })

    function editProfile() {
        navigate("/EditProfile")
    }

    function SignOut() {
        signOut(auth)
            .then(() => {
                setNewSurveyKey(null)
                setNewSurveyTitle("Select Survey")
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Profile:</h5>
                    <div>
                        <button className="btn btn-primary save" type="button" onClick={editProfile}>Edit</button>
                    </div>
                </div>
                <div className="profile">
                    <img className="profilePicture" src={imageUrl ? imageUrl : Black} alt="Profile"/>                   
                    <div className="profileInfo">
                        <h6><span className="bold">Name:</span> {displayName}</h6>
                        <h6><span className="bold">Role:</span> {role}</h6>
                        <h6><span className="bold">Email:</span> {email}</h6>
                        <div className="signOut">
                            <button className="btn btn-danger" onClick={SignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
