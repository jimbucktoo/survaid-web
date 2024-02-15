import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/survaid.png"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "../firebase/firebase"
import "../App.css"

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const auth = getAuth()

    const Signin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/Survey")
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="signInComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <div>
                <form onSubmit={Signin}>
                    <div className="form-group">
                        <input
                        required
                        name="email"
                        type="email"
                        className="form-control inputAuth"
                        placeholder="Email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input
                        required
                        name="password"
                        type="password"
                        className="form-control inputAuth"
                        placeholder="Password"
                        pattern=".{8,}" title="Eight or more characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="buttonOptions">
                        <button className="btn btn-primary" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
            <div className="signUp">
                <Link className="signUpLink" to={"/SignUp"}>
                    Don"t have an account?{" "}
                    <span className="signUpNow">Sign up now</span>
                </Link>
            </div>
            <div className="forgotPassword">
                <Link className="forgotPasswordLink" to={"/"}>
                    Forgot your password?
                </Link>
            </div>
        </div>
    )
}

export default Signin
