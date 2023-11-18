import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Surveys from "./components/Surveys";
import Analytics from "./components/Analytics";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/analytics" element={<Analytics />} />
        </Routes>
    );
}

export default App;
