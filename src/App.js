import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Surveys from "./components/surveys";
import Analytics from "./components/analytics";
import Reporting from "./components/reporting";
import Activity from "./components/activity";
import Messaging from "./components/messaging";
import Notifications from "./components/notifications";
import TeamManagement from "./components/teammanagement";
import CreateSurvey from "./components/createsurvey";
import Profile from "./components/profile";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Surveys" element={<Surveys />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Reporting" element={<Reporting />} />
            <Route path="/Activity" element={<Activity />} />
            <Route path="/Messaging" element={<Messaging />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/TeamManagement" element={<TeamManagement />} />
            <Route path="/CreateSurvey" element={<CreateSurvey />} />
            <Route path="/Profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
