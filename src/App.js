import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Surveys from "./components/Surveys";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Surveys" element={<Surveys />} />
        </Routes>
    );
}

export default App;
