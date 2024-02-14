import { Route, Routes } from "react-router-dom"
import SignIn from "./components/Signin"
import SignUp from "./components/Signup"
import Surveys from "./components/Surveys"
import Analytics from "./components/Analytics"
import Messaging from "./components/Messaging"
import TeamManagement from "./components/TeamManagement"
import CreateSurvey from "./components/CreateSurvey"
import Profile from "./components/Profile"
import { SurveyProvider } from "./SurveyContext"
import "./App.css"

function App() {
    return (
        <SurveyProvider>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Surveys" element={<Surveys />} />
                <Route path="/Analytics" element={<Analytics />} />
                <Route path="/Messaging" element={<Messaging />} />
                <Route path="/TeamManagement" element={<TeamManagement />} />
                <Route path="/CreateSurvey" element={<CreateSurvey />} />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </SurveyProvider>
    )
}

export default App
