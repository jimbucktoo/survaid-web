import React from "react";
import Sidebar from "./Sidebar";
import "../App.css";

function Profile() {
    return (
        <div className="main">
            <Sidebar />
            <div className="content"></div>
        </div>
    );
}

export default Profile;
