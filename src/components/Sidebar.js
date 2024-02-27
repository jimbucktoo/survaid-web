import React, { useState, useEffect, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import logo from "../assets/survaid.png"
import Black from "../assets/black.jpg"
import { Link } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref as databaseRef, child, get } from "firebase/database"
import { getStorage, getDownloadURL, ref as storageRef } from "firebase/storage"
import "../App.css"

function Sidebar() {
    const [surveys, setSurveys] = useState([])
    const { newSurveyTitle, setNewSurveyTitle, setNewSurveyKey } = useContext(SurveyContext)

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState(null)

    const auth = getAuth()
    const dbRef = databaseRef(getDatabase())
    const storage = getStorage()

    function loadSurvey(survey) {
        setNewSurveyTitle(survey.title)
        setNewSurveyKey(survey.key)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const profilePicture = storageRef(storage, "images/users/" + user.uid + "/profile")
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
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                get(child(dbRef, "/surveys"))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const surveysData = []
                            snapshot.forEach((childSnapshot) => {
                                const surveyKey = childSnapshot.key
                                const surveyData = childSnapshot.val()
                                surveysData.push({ key: surveyKey, ...surveyData })
                            })
                            const filteredSurveys = surveysData.filter(
                                (survey) => survey.createdBy === user.uid
                            )
                            setSurveys([])
                            setSurveys(filteredSurveys)
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        })
    }, [auth, dbRef, storage])

    return (
        <div className="sideBar">
            <ul className="nav flex-column">
                <a className="survaidBrand" href="/">
                    <div className="survaidContainer">
                        <img
                        className="survaidLogoBrand"
                        src={logo}
                        alt="Survaid Logo"
                    />
                            <p className="survBrand">
                                Surv<span className="aid">aid</span>
                            </p>
                        </div>
                    </a>
                    <li className="navDropdown">
                        <div className="dropdown">
                            <button
                            className="btn btn-primary dropdown-toggle surveyDropdown"
                            type="button"
                            id="dropdownMenuButtonSidebar"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                                {newSurveyTitle}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSidebar">
                            {surveys.map((survey) => (
                                <li key={survey.key}>
                                    <button className="dropdown-item" onClick={() => loadSurvey(survey)}>{survey.title}</button>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </li>
                    <Link className="navigation" to={"/Survey"}>
                        <li className="navigationItem">Survey</li>
                    </Link>
                    <Link className="navigation" to={"/Analytics"}>
                        <li className="navigationItem">Analytics</li>
                    </Link>
                    <Link className="navigation" to={"/Messaging"}>
                        <li className="navigationItem">Messaging</li>
                    </Link>
                    <Link className="navigation" to={"/TeamManagement"}>
                        <li className="navigationItem lastItem">Team Management</li>
                    </Link>
                    <Link className="createSurveyLink" to={"/CreateSurvey"}>
                        <li className="createSurvey">+ Create Survey</li>
                    </Link>
                </ul>
                <Link className="user" to={"/Profile"}>
                    <div className="profileSidebar">
                        <img className="survaidProfile" src={imageUrl ? imageUrl : Black} alt="Profile" />
                        {displayName === "" ? email : displayName}
                    </div>
                </Link>
            </div>
    )
}

export default Sidebar
