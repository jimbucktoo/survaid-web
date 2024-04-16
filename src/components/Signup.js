import React, {useState} from "react"
import { Link } from "react-router-dom"
import logo from "../assets/survaid.png"
import { useNavigate } from "react-router-dom"
import { getDatabase, ref, set } from "firebase/database"
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import "../firebase/firebase"
import "../App.css"

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]  = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()
    const auth = getAuth()
    const db = getDatabase()

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                set(ref(db, "/users/" + user.uid), {
                    email: user.email,
                    firstName: firstName,
                    lastName: lastName,
                    role: "Researcher"
                })
                navigate("/Survey")
            }).catch((error) => {
                setErrorMessage("Sign Up Error: " + error.code)
            })
    } 

    return (
        <div className="signUpComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <div>
                <form onSubmit={signUp}>
                    <div className="form-group">
                        <input
                        required
                        name="firstName"
                        type="text"
                        className="form-control inputAuth"
                        placeholder="First Name"
                        pattern="[A-Za-z]+"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input
                        required
                        name="lastName"
                        type="text"
                        className="form-control inputAuth"
                        placeholder="Last Name"
                        pattern="[A-Za-z]+"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input
                        required
                        name="email"
                        type="email"
                        className="form-control inputAuth"
                        placeholder="Email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input
                        required
                        name="password"
                        type="password"
                        className="form-control inputAuth"
                        pattern=".{8,}" title="Eight or more characters"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        {errorMessage && <div className="signInError">{errorMessage}</div>}
                        <div className="buttonOptions">         
                            <button className="btn btn-primary" type="submit">Sign Up</button>
                            <Link className="forgotPasswordLink" to={"/"}>
                                <button className="btn btn-danger cancelSignUp" type="submit">Cancel</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
