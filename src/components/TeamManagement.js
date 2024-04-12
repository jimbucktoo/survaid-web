import React, { useState, useEffect, useContext } from "react"
import { getDatabase, ref, child, get, set } from "firebase/database"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import Loading from "./Loading"
import Black from "../assets/black.jpg"
import "../App.css"

function TeamManagement() {
    const [isVisible, setIsVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isResearchers, setIsResearchers] = useState(true)
    const [userResearchers, setUserResearchers] = useState(null)
    const [userParticipants, setUserParticipants] = useState(null)
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [showModal, setShowModal] = useState(false)
    const { newSurveyKey } = useContext(SurveyContext)

    const dbRef = ref(getDatabase())

    function sendInvite() {
        get(child(dbRef, "/users/"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var usersData = snapshot.val()
                    const usersArray = Object.entries(usersData)
                    const filteredUsers = usersArray.filter(
                        ([key, user]) => user.email === email
                    )
                    if (filteredUsers.length > 0) {
                        var foundUser = filteredUsers[0][0]
                        get(child(dbRef, "/surveys/" + newSurveyKey + "/researchers"))
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    const researcherArray = snapshot.val()
                                    if (researcherArray.includes(foundUser)) {
                                        setErrorMessage("This user has already been invited.")
                                        setShowModal(false)
                                    } else {
                                        grabCurrentResearchers(foundUser)
                                    }
                                }
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    } else {
                        setErrorMessage("User with this email does not exist.")
                    }
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function grabCurrentResearchers(foundUser) {
        get(child(dbRef, "/surveys/" + newSurveyKey + "/researchers"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    var researcherArray = []
                    researcherArray = snapshot.val()
                    researcherArray.push(foundUser)
                    set(
                        child(dbRef, "/surveys/" + newSurveyKey + "/researchers"),
                        researcherArray
                    )
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        function updateUsers() {
            get(child(dbRef, "/surveys/" + newSurveyKey + "/researchers"))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        matchUsers(snapshot.val(), "researchers")
                    } else {
                        setUserResearchers([])
                    }
                })
                .catch((error) => {
                    console.error(error)
                })

            get(child(dbRef, "/surveys/" + newSurveyKey + "/participants"))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        matchUsers(snapshot.val(), "participants")
                    } else {
                        setUserParticipants([])
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        function matchUsers(users, type) {
            const promises = users.map((userId) => {
                return get(child(dbRef, "/users/" + userId))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            return snapshot.val()
                        }
                    })
                    .catch((error) => {
                        console.error("No Users Found")
                    })
            })

            Promise.all(promises)
                .then((dataArray) => {
                    if (type === "researchers") {
                        setUserResearchers(dataArray.filter(Boolean))
                    } else if (type === "participants") {
                        setUserParticipants(dataArray.filter(Boolean))
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
    }, [newSurveyKey, dbRef, errorMessage])

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
                            type="button"
                            className="btn btn-primary inviteResearchers"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                                Invite Researchers
                        </button>
                        <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Invite Researcher
                                        </h5>
                                        <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input
                                        required
                                        name="email"
                                        type="email"
                                        className="form-control inputAuth modalFormGroup"
                                        placeholder="Email"
                                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                        </div>
                                        {errorMessage && (
                                            <p style={{ color: "red" }}>{errorMessage}</p>
                                        )}
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={() => {
                                                setErrorMessage("")
                                                setEmail("")
                                            }}
                                        >
                                                Close
                                        </button>
                                        <button
                                        type="button"
                                        onClick={sendInvite}
                                        className="btn btn-primary"
                                        data-bs-dismiss={showModal ? "modal" : ""}
                                    >
                                            Send Invite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                className="userRow"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapseResearchers${index}`}
                                aria-expanded="false"
                                aria-controls={`collapseResearchers${index}`}
                            >
                                    <td>
                                        <div className="userContainer">
                                            <img
                                            className="survaidProfile"
                                            src={
                                                researcher.profilePicture
                                                    ? researcher.profilePicture
                                                    : Black
                                            }
                                            alt="Profile"
                                        />
                                                <div className="userInfo">
                                                    {researcher.firstName + " " + researcher.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td><div className="userInfo">{researcher.role}</div></td>
                                        <td><div className="userInfo">{researcher.email}</div></td>
                                    </tr>
                                    <tr
                                    className="collapse multi-collapse"
                                    id={`collapseResearchers${index}`}
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
                        {userParticipants !== null &&
                                userParticipants.map((participant, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                        className="userRow"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapseParticipants${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapseParticipants${index}`}
                                    >
                                            <td>
                                                <div className="userContainer">
                                                    <img
                                                    className="survaidProfile"
                                                    src={
                                                        participant.profilePicture
                                                            ? participant.profilePicture
                                                            : Black
                                                    }
                                                    alt="Profile"
                                                />
                                                        <div className="userInfo">
                                                            {participant.firstName +
                                                                    " " +
                                                                    participant.lastName}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><div className="userInfo">{participant.role}</div></td>
                                                <td><div className="userInfo">{participant.email}</div></td>
                                            </tr>
                                            <tr
                                            className="collapse multi-collapse"
                                            id={`collapseParticipants${index}`}
                                            data-bs-parent="#participantsTeam"
                                        >
                                                <td colSpan="3">
                                                    <div className="editManagement">
                                                        <button className="remove">
                                                            Remove Participant
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
