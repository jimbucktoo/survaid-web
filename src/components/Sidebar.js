import React, { useState, useEffect, useContext } from "react"
import { SurveyContext } from "../SurveyContext"
import logo from "../assets/survaid.png"
import Alex from "../assets/Alex.jpeg"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import "../App.css"

function Sidebar() {
    const [surveys, setSurveys] = useState([])
    const [selectedSurvey, setSelectedSurvey] = useState(null)
    const { setNewSurveyKey } = useContext(SurveyContext)

    const navigate = useNavigate()
    const auth = getAuth()
    const dbRef = ref(getDatabase())

    function loadSurvey(survey) {
        setSelectedSurvey(survey.title)
        setNewSurveyKey(survey.key)
    }

    function SignOut() {
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        function getSurveys() {
            onAuthStateChanged(auth, (user) => {
                if(user) {
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
                                setSurveys(filteredSurveys)
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }
            })
        }
        getSurveys()
    }, [auth, dbRef])

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
                                {selectedSurvey || "Select Survey"}
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
                    <Link className="navigation" to={"/Surveys"}>
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
                    <div>
                        <button className="btn btn-danger" onClick={SignOut}>
                            Sign Out
                        </button>
                    </div>
                </ul>
                <Link className="user" to={"/Profile"}>
                    <div className="profile">
                        <img className="survaidProfile" src={Alex} alt="Profile" />
                        Alex Gallion
                    </div>
                </Link>
            </div>
    )
}

export default Sidebar
