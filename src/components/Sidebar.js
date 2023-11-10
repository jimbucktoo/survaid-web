import React from "react";
import logo from "../assets/survaid.png";
import "../App.css";
import Alex from "../assets/Alex.jpeg";
import { Link } from "react-router-dom";

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
                            <a class="dropdown-item" href="#">Sleep Apnea Survey</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Sunlight Step Count Survey</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Nicotine Addiction Survey</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="navigationItem">
                <a class="active navigation" aria-current="page" href="#">
                    Survey
                </a>
            </li>
            <li class="navigationItem">
                <a class="navigation" href="#">
                    Analytics
                </a>
            </li>
            <li class="navigationItem">
                <a class="navigation" href="#">
                    Reporting
                </a>
            </li>
            <li class="navigationItem">
                <a class="navigation" href="#">
                    Activity
                </a>
            </li>
            <li class="navigationItem">
                <a class="navigation" href="#">
                    Messaging
                </a>
            </li>
            <li class="navigationItem">
                <a class="navigation" href="#">
                    Notifications
                </a>
            </li>
            <li class="navigationItem lastItem">
                <a class="navigation" href="#">
                    Team Management
                </a>
            </li>
            <li class="createSurvey">
                <a class="createSurveyLink" href="#">
                    + Create Survey
                </a>
            </li>
        </ul>
        <ul class="profile">
            <img className="survaidProfile" src={Alex} alt="Profile Picture" />
            <a class="navigation" href="#">
                Alex Gallion
            </a>
        </ul>
    </div>
    );
}

export default Sidebar;
