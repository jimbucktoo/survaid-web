import React from "react";
import logo from "../assets/survaid.png";
import Alex from "../assets/Alex.jpeg";
import { Link } from "react-router-dom";
import "../App.css";

function Sidebar() {
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
                    <li class="navDropdown">
                        <div class="dropdown">
                            <button
                            class="btn btn-primary dropdown-toggle surveyDropdown"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                                Sleep Apnea Survey
                        </button>
                        <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                            <li>
                                <Link className="dropdown-item" to={"/Surveys"}>
                                    Sleep Apnea Survey
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={"/Surveys"}>
                                    Sunlight Step Count Survey
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={"/Surveys"}>
                                    Nicotine Addiction Survey
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <Link className="navigation" to={"/Surveys"}>
                    <li class="navigationItem">Survey</li>
                </Link>
                <Link className="navigation" to={"/Analytics"}>
                    <li class="navigationItem">Analytics</li>
                </Link>
                <Link className="navigation" to={"/Reporting"}>
                    <li class="navigationItem">Reporting</li>
                </Link>
                <Link className="navigation" to={"/Activity"}>
                    <li class="navigationItem">Activity</li>
                </Link>
                <Link className="navigation" to={"/Messaging"}>
                    <li class="navigationItem">Messaging</li>
                </Link>
                <Link className="navigation" to={"/Notifications"}>
                    <li class="navigationItem">Notifications</li>
                </Link>
                <Link className="navigation" to={"/TeamManagement"}>
                    <li class="navigationItem lastItem">Team Management</li>
                </Link>
                <Link className="createSurveyLink" to={"/CreateSurvey"}>
                    <li class="createSurvey">+ Create Survey</li>
                </Link>
            </ul>
            <Link className="user" to={"/Profile"}>
                <div class="profile">
                    <img className="survaidProfile" src={Alex} alt="Profile" />
                    Alex Gallion
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
