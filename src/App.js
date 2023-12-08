import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Surveys from "./components/Surveys";
import Analytics from "./components/Analytics";
import Reporting from "./components/Reporting";
import Messaging from "./components/Messaging";
import Notifications from "./components/Notifications";
import TeamManagement from "./components/TeamManagement";
import CreateSurvey from "./components/CreateSurvey";
import Profile from "./components/Profile";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Surveys" element={<Surveys />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Reporting" element={<Reporting />} />
            <Route path="/Messaging" element={<Messaging />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/TeamManagement" element={<TeamManagement />} />
            <Route path="/CreateSurvey" element={<CreateSurvey />} />
            <Route path="/Profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
