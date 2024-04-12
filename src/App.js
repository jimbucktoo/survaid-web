import { Route, Routes } from "react-router-dom"
import SignIn from "./components/Signin"
import SignUp from "./components/Signup"
import Survey from "./components/Survey"
import Analytics from "./components/Analytics"
import TeamManagement from "./components/TeamManagement"
import CreateSurvey from "./components/CreateSurvey"
import Profile from "./components/Profile"
import EditProfile from "./components/EditProfile"
import Loading from "./components/Loading"
import { SurveyProvider } from "./SurveyContext"
import "./App.css"

function App() {
    return (
        <SurveyProvider>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Survey" element={<Survey />} />
                <Route path="/Analytics" element={<Analytics />} />
                <Route path="/TeamManagement" element={<TeamManagement />} />
                <Route path="/CreateSurvey" element={<CreateSurvey />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/EditProfile" element={<EditProfile />} />
                <Route path="/Loading" element={<Loading />} />
            </Routes>
        </SurveyProvider>
    )
}

export default App
