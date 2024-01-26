import React from "react";
import Sidebar from "./Sidebar";
import pencil from "../assets/pencil.png";
import trashCan from "../assets/trashCan.png";
import exportData from "../assets/export.png";
import { Chart } from "react-google-charts";
import "../App.css";

export const data = [
    ["Time", "dB"],
    ["9:00 PM", 20],
    ["9:15 PM", 20],
    ["9:30 PM", 40],
    ["9:45 PM", 20],
    ["10:00 PM", 90],
    ["10:15 PM", 60],
    ["10:30 PM", 60],
    ["10:45 PM", 20],
    ["11:00 PM", 20],
];

export const options = {
    title: "Sleep Apnea",
    titlePosition: "none",
    titleTextStyle: {
        color: "#026eff",
    },
    vAxis: {
        title: "Microphone (dB)",
    },
    hAxis: {
        title: "Time",
    },
    colors: ["#026eff"],
    legend: "none",
};

function Analytics() {
    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <div className="headerBar">
                    <h5 className="header">Analytics:</h5>
                    <div>
                        <button
                        class="btn btn-primary createGraph"
                        type="button"
                    >
                            Create Graph
                    </button>
                    <button class="btn btn-secondary export" type="button">
                        Export Data
                    </button>
                </div>
            </div>
            <div className="graph">
                <div className="pictureBar">
                    <h6 className="graphTitle">
                        Trends in Sleep Volume Over Time
                    </h6>
                    <div className="graphOptions">
                        <button class="iconButton">
                            <img className="edit" src={pencil} alt="Edit" />
                        </button>
                        <button class="iconButton">
                            <img
                            className="exportData"
                            src={exportData}
                            alt="Export Data"
                        />
                            </button>
                            <button class="iconButton">
                                <img
                                className="delete"
                                src={trashCan}
                                alt="Delete"
                            />
                                </button>
                            </div>
                        </div>
                        <Chart
                        chartType="LineChart"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                        </div>
                        <div className="editGraph">
                            <div className="editGraphHeader">
                                <h6 className="editGraphTitle">Edit Graph:</h6>
                                <div>
                                    <button
                                    class="btn btn-primary saveOption"
                                    type="button"
                                >
                                        Save
                                </button>
                                <button class="cancel">Cancel</button>
                            </div>
                        </div>
                        <div className="editGraphInputs">
                            <div className="editGraphInput">
                                <label className="editInputLabel">
                                    Title: Trends in Sleep Volume Over Time
                                </label>
                                <input className="editInput" />
                                <label className="editInputLabel">
                                    Graph Type: Line Graph{" "}
                                </label>
                                <input className="editInput" />
                            </div>
                            <div className="editGraphInput">
                                <label className="editInputLabel">
                                    X-Axis Sensor: Clock
                                </label>
                                <input className="editInput" />
                                <label className="editInputLabel">
                                    X-Axis: Time
                                </label>
                                <input className="editInput" />
                                <label className="editInputLabel">
                                    Interval: 15 Minutes{" "}
                                </label>
                                <input className="editInput" />
                            </div>
                            <div className="editGraphInput">
                                <label className="editInputLabel">
                                    Y-Axis Sensor: Microphone{" "}
                                </label>
                                <input className="editInput" />
                                <label className="editInputLabel">
                                    Y-Axis: Volume (dB){" "}
                                </label>
                                <input className="editInput" />
                                <label className="editInputLabel">
                                    Interval: 20 (dB){" "}
                                </label>
                                <input className="editInput" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Analytics;
