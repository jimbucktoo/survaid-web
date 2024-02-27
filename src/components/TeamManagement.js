import React, { useState, useEffect, useContext } from "react"
import { getDatabase, ref, child, get } from "firebase/database"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import Loading from "./Loading"
import Black from "../assets/black.jpg"
import { Link } from "react-router-dom"
import "../App.css"

function TeamManagement() {
    const [isVisible, setIsVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const dbRef = ref(getDatabase())
    const [isResearchers, setIsResearchers] = useState(true)
    const { newSurveyKey } = useContext(SurveyContext)
    const [userResearchers, setUserResearchers] = useState(null)

    useEffect(() => {
        function updateUsers() {
            get(child(dbRef, "/surveys/" + newSurveyKey + "/researchers"))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        matchUsers(snapshot.val())
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        function matchUsers(researchers) {
            get(child(dbRef, "/users/" + researchers))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var data = snapshot.val()
                        var dataArray = []
                        dataArray.push(data)
                        setUserResearchers(dataArray)
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        if (newSurveyKey !== null) {
            updateUsers()
            setIsLoading(false)
        }
    }, [newSurveyKey, dbRef])

    const toggleVisibility = (x) => {
        if (isResearchers !== x) {
            setIsResearchers(!isResearchers)
            setIsVisible(!isVisible)
        }
    }

    return (
        <div className="main">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="content">
                    <div className="headerBar">
                        <h5 className="header">Team Management:</h5>
                        <div>
                            <button
                            className="btn btn-primary inviteResearchers"
                            type="button"
                        >
                                Invite Researchers
                        </button>
                        <button
                        className="btn btn-secondary inviteParticipants"
                        type="button"
                    >
                            Invite Participants
                    </button>
                </div>
            </div>
            <div className="management">
                <button
                onClick={() => toggleVisibility(true)}
                className={isVisible ? "researcher" : "researchers"}
            >
                    Researchers
            </button>
            <button
            onClick={() => toggleVisibility(false)}
            className={!isVisible ? "participant" : "participants"}
        >
                Participants
        </button>
    </div>
    <div className={isVisible ? "researchersTeam" : "hide"}>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Researchers</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody id="researchersTeam">
                {userResearchers !== null &&
                        userResearchers.map((researcher, index) => (
                            <React.Fragment key={index}>
                                <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseResearchers"
                                aria-expanded="false"
                                aria-controls="collapseResearchers"
                            >
                                    <td>
                                        <div className="userContainer">
                                            <img
                                            className="survaidProfile userInfo"
                                            src={
                                                researcher.profilePicture
                                                    ? researcher.profilePicture
                                                    : Black
                                            }
                                            alt="Profile"
                                        />
                                                <h6 className="userInfo">
                                                    {researcher.firstName + " " + researcher.lastName}
                                                </h6>
                                            </div>
                                        </td>
                                        <td>{researcher.role}</td>
                                        <td>{researcher.email}</td>
                                    </tr>
                                    <tr
                                    className="collapse multi-collapse"
                                    id="collapseResearchers"
                                    data-bs-parent="#researchersTeam"
                                >
                                        <td colSpan="3">
                                            <div className="editManagement">
                                                <button className="remove">
                                                    Remove Researcher
                                                </button>
                                                <div className="saveCancel">
                                                    <button
                                                    className="btn btn-primary save"
                                                    type="button"
                                                >
                                                        Save
                                                </button>
                                                <button
                                                className="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseResearchers"
                                                aria-expanded="false"
                                                aria-controls="collapseResearchers"
                                            >
                                                    Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={!isVisible ? "participantsTeam" : "hide"}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Participants</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody id="participantsTeam">
                        {userResearchers !== null &&
                                userResearchers.map((participant, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseParticipants"
                                        aria-expanded="false"
                                        aria-controls="collapseParticipants"
                                    >
                                            <td>
                                                <div className="userContainer">
                                                    <Link className="user" to={"/Profile"}>
                                                        <img
                                                        className="survaidProfile userInfo"
                                                        src={
                                                            participant.profilePicture
                                                                ? participant.profilePicture
                                                                : Black
                                                        }
                                                        alt="Profile"
                                                    />
                                                            <h6 className="userInfo">
                                                                {participant.firstName +
                                                                        " " +
                                                                        participant.lastName}
                                                            </h6>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>{participant.role}</td>
                                                <td>{participant.email}</td>
                                            </tr>
                                            <tr
                                            className="collapse multi-collapse"
                                            id="collapseParticipants"
                                            data-bs-parent="#participantsTeam"
                                        >
                                                <td colSpan="3">
                                                    <div className="editManagement">
                                                        <button className="remove">
                                                            Remove Researcher
                                                        </button>
                                                        <div className="saveCancel">
                                                            <button
                                                            className="btn btn-primary save"
                                                            type="button"
                                                        >
                                                                Save
                                                        </button>
                                                        <button
                                                        className="cancel"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseParticipants"
                                                        aria-expanded="false"
                                                        aria-controls="collapseParticipants"
                                                    >
                                                            Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            </div>
    )
}

export default TeamManagement
