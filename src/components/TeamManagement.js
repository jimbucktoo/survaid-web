import React, { useState, useEffect, useContext } from "react"
import { getDatabase, ref, child, get, set } from "firebase/database"
import { SurveyContext } from "../SurveyContext"
import Sidebar from "./Sidebar"
import Loading from "./Loading"
import Black from "../assets/black.jpg"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "../App.css"

function TeamManagement() {
    const [isVisible, setIsVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isResearchers, setIsResearchers] = useState(true)
    const [userResearchers, setUserResearchers] = useState(null)
    const [userParticipants, setUserParticipants] = useState(null)
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { newSurveyKey } = useContext(SurveyContext)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
                                    } else {
                                        grabCurrentResearchers(foundUser)
                                        handleClose()
                                        setErrorMessage("")
                                        setEmail("")
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
    }, [newSurveyKey, dbRef, errorMessage, userResearchers, userParticipants])

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
                            <Button className="btn btn-primary inviteResearchers" variant="primary" onClick={handleShow}>
                                Invite Researchers
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Invite Researcher</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <input
                                    required
                                    name="email"
                                    type="email"
                                    className="form-control inputAuth modalFormGroup inviteResearchersInput"
                                    placeholder="Email"
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                        {errorMessage && (
                                            <div style={{ color: "red" }}>{errorMessage}</div>
                                        )}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                            variant="secondary"
                                            onClick={() => {
                                                handleClose()
                                                setErrorMessage("")
                                                setEmail("")
                                            }}
                                        >
                                                Close
                                        </Button>
                                        <Button
                                        variant="primary"
                                        onClick={sendInvite}
                                    >
                                            Send Invite
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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
