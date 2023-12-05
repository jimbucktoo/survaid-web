import React from "react";
import Sidebar from "./sidebar";
import "../App.css";

function Messaging() {
    return (
        <div className="main">
            <Sidebar />
            <div className="content"></div>
        </div>
    );
}

export default Messaging;
