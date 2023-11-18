import React from "react";
import logo from "../assets/survaid.png";
import Alex from "../assets/Alex.jpeg";
import { Link } from "react-router-dom";
import "../App.css";

function Sidebar() {
    return (
        <div className="sideBar">
            <ul className="nav flex-column">
                <a className="survaidBrand" href="#">
                    <div className="survaidContainer">
                        <img className="survaidLogoBrand" src={logo} alt="Survaid Logo" />
                        <p className="survBrand">
                            Surv<span className="aid">aid</span>
                        </p>
                    </div>
                </a>
                <li class="navDropdown">
                    <div class="dropdown">
                        <button
                        class="btn btn-secondary dropdown-toggle surveyDropdown"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Sleep Apnea Survey
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a class="dropdown-item" href="/surveys">Sleep Apnea Survey</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="/surveys">Sunlight Step Count Survey</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="/surveys">Nicotine Addiction Survey</a>
                        </li>
                    </ul>
                </div>
            </li>
            <Link className="navigation" to={"/surveys"}>
                <li class="navigationItem">
                    Survey
                </li>
            </Link>
            <Link className="navigation" to={"/analytics"}>
                <li class="navigationItem">
                    Analytics
                </li>
            </Link>
            <Link className="navigation" to={"/surveys"}>
                <li class="navigationItem">
                    Reporting
                </li>
            </Link>
            <Link className="navigation" to={"/surveys"}>
                <li class="navigationItem">
                    Activity
                </li>
            </Link>
            <Link className="navigation" to={"/surveys"}>
                <li class="navigationItem">
                    Messaging
                </li>
            </Link>
            <Link className="navigation" to={"/surveys"}>
                <li class="navigationItem">
                    Notifications
                </li>
            </Link>
            <Link className="navigation" to={"/surveys"}>
                <li class="navigationItem lastItem">
                    Team Management
                </li>
            </Link>
            <Link className="createSurveyLink" to={"/surveys"}>
                <li class="createSurvey">
                    + Create Survey
                </li>
            </Link>
        </ul>
        <Link className="navigation" to={"/surveys"}>
            <div class="profile">
                <img className="survaidProfile" src={Alex} alt="Profile Picture" />
                Alex Gallion
            </div>
        </Link>
    </div>
    );
}

export default Sidebar;
