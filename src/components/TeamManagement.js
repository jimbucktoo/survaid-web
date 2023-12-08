import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Alex from "../assets/Alex.jpeg";
import Brandon from "../assets/Brandon.jpeg";
import Jimmy from "../assets/Jimmy.jpeg";
import Nathaniel from "../assets/Nathaniel.jpeg";
import "../App.css";

function TeamManagement() {
    const [isVisible, setIsVisible] = useState(true);
    const [isResearchers, setIsResearchers] = useState(true);

    const toggleVisibility = (x) => {
        if (isResearchers !== x) {
            setIsResearchers(!isResearchers);
            setIsVisible(!isVisible);
        }
    };

    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Team Management:</h5>
                    <div>
                        <button
                            class="btn btn-primary createTeam"
                            type="button"
                        >
                            Create Team
                        </button>
                        <button class="btn btn-secondary invite" type="button">
                            Invite Users
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
                <div
                    className={
                        isVisible
                            ? "bodyBoxResearchers"
                            : "bodyBoxResearchers hide"
                    }
                >
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Researchers</th>
                                <th scope="col">Status</th>
                                <th scope="col">Permissions</th>
                            </tr>
                        </thead>
                        <tbody id="participantsTeam">
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse1"
                                aria-expanded="false"
                                aria-controls="collapse1"
                            >
                                <td>
                                    <div className="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile userInfo"
                                                src={Nathaniel}
                                                alt="Nathaniel"
                                            />
                                            <h6 className="userInfo">
                                                Nathaniel Shupert
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Online</td>
                                <td>Create, View, Edit, Delete, Export</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse1"
                                data-bs-parent="#participantsTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                checked
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse1"
                                                aria-expanded="false"
                                                aria-controls="collapse1"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse2"
                                aria-expanded="false"
                                aria-controls="collapse2"
                            >
                                <td>
                                    <div class="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile"
                                                src={Brandon}
                                                alt="Brandon"
                                            />
                                            <h6 className="userInfo">
                                                Brandon Oldberg
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Online</td>
                                <td>View, Export</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse2"
                                data-bs-parent="#participantsTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                checked
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse2"
                                                aria-expanded="false"
                                                aria-controls="collapse2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse3"
                                aria-expanded="false"
                                aria-controls="collapse3"
                            >
                                <td>
                                    <div class="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile"
                                                src={Jimmy}
                                                alt="Jimmy"
                                            />
                                            <h6 className="userInfo">
                                                Jimmy Liang
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Online</td>
                                <td>Create, View, Edit, Export</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse3"
                                data-bs-parent="#participantsTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                checked
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse3"
                                                aria-expanded="false"
                                                aria-controls="collapse3"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse4"
                                aria-expanded="false"
                                aria-controls="collapse4"
                            >
                                <td>
                                    <div class="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile"
                                                src={Alex}
                                                alt="Alex"
                                            />
                                            <h6 className="userInfo">
                                                Alex Gallion
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Offline</td>
                                <td>View</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse4"
                                data-bs-parent="#participantsTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse4"
                                                aria-expanded="false"
                                                aria-controls="collapse4"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    className={
                        !isVisible
                            ? "bodyBoxParticipants"
                            : "bodyBoxParticipants hide"
                    }
                >
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Participants</th>
                                <th scope="col">Status</th>
                                <th scope="col">Permissions</th>
                            </tr>
                        </thead>
                        <tbody id="researchersTeam">
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse5"
                                aria-expanded="false"
                                aria-controls="collapse5"
                            >
                                <td>
                                    <div className="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile userInfo"
                                                src={Nathaniel}
                                                alt="Nathaniel"
                                            />
                                            <h6 className="userInfo">
                                                Nathaniel Shupert
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Online</td>
                                <td>Create, View, Edit, Delete, Export</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse5"
                                data-bs-parent="#researchersTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                checked
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse5"
                                                aria-expanded="false"
                                                aria-controls="collapse5"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse6"
                                aria-expanded="false"
                                aria-controls="collapse6"
                            >
                                <td>
                                    <div class="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile"
                                                src={Brandon}
                                                alt="Brandon"
                                            />
                                            <h6 className="userInfo">
                                                Brandon Oldberg
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Online</td>
                                <td>View, Export</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse6"
                                data-bs-parent="#researchersTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                checked
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse6"
                                                aria-expanded="false"
                                                aria-controls="collapse6"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse7"
                                aria-expanded="false"
                                aria-controls="collapse7"
                            >
                                <td>
                                    <div class="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile"
                                                src={Jimmy}
                                                alt="Jimmy"
                                            />
                                            <h6 className="userInfo">
                                                Jimmy Liang
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Online</td>
                                <td>Create, View, Edit, Export</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse7"
                                data-bs-parent="#researchersTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                                checked
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse7"
                                                aria-expanded="false"
                                                aria-controls="collapse7"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse8"
                                aria-expanded="false"
                                aria-controls="collapse8"
                            >
                                <td>
                                    <div class="userContainer">
                                        <Link className="user" to={"/Profile"}>
                                            <img
                                                className="survaidProfile"
                                                src={Alex}
                                                alt="Alex"
                                            />
                                            <h6 className="userInfo">
                                                Alex Gallion
                                            </h6>
                                        </Link>
                                    </div>
                                </td>
                                <td>Offline</td>
                                <td>View</td>
                            </tr>
                            <tr
                                className="collapse multi-collapse"
                                id="collapse8"
                                data-bs-parent="#researchersTeam"
                            >
                                <td colspan="3">
                                    <div className="managementOptions">
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox1"
                                            >
                                                Create
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox1"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox2"
                                            >
                                                View
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox2"
                                                checked
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox3"
                                            >
                                                Edit
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox3"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox4"
                                            >
                                                Delete
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox4"
                                            ></input>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label
                                                class="form-check-label"
                                                for="inlineCheckbox5"
                                            >
                                                Export
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                id="inlineCheckbox5"
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="editManagement">
                                        <button className="remove">
                                            Remove Researcher
                                        </button>
                                        <div className="saveCancel">
                                            <button
                                                class="btn btn-primary save"
                                                type="button"
                                            >
                                                Save
                                            </button>
                                            <button
                                                class="cancel"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapse8"
                                                aria-expanded="false"
                                                aria-controls="collapse8"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TeamManagement;
