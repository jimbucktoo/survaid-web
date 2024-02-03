import React from "react";
import logo from "../assets/survaid.png";
import Alex from "../assets/Alex.jpeg";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Sidebar() {
    const navigate = useNavigate();

    function SignOut(){
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Signing Out")
            navigate("/");
        }).catch((error) => {
            console.log("Signing Out Error: " + error)
        });
    }

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
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                                Sleep Apnea Survey
                        </button>
                        <ul
                        className="dropdown-menu"
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
                    <li className="navigationItem">Survey</li>
                </Link>
                <Link className="navigation" to={"/Analytics"}>
                    <li className="navigationItem">Analytics</li>
                </Link>
                <Link className="navigation" to={"/Reporting"}>
                    <li className="navigationItem">Reporting</li>
                </Link>
                <Link className="navigation" to={"/Messaging"}>
                    <li className="navigationItem">Messaging</li>
                </Link>
                <Link className="navigation" to={"/Notifications"}>
                    <li className="navigationItem">Notifications</li>
                </Link>
                <Link className="navigation" to={"/TeamManagement"}>
                    <li className="navigationItem lastItem">Team Management</li>
                </Link>
                <Link className="createSurveyLink" to={"/CreateSurvey"}>
                    <li className="createSurvey">+ Create Survey</li>
                </Link>
                <div>
                    <button className="btn btn-danger" onClick={SignOut}>Sign Out</button>
                </div>
            </ul>
            <Link className="user" to={"/Profile"}>
                <div className="profile">
                    <img className="survaidProfile" src={Alex} alt="Profile" />
                    Alex Gallion
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
