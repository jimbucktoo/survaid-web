import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/survaid.png"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getDatabase, ref, child, get } from "firebase/database"
import "../firebase/firebase"
import "../App.css"

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isResearcher, setIsResearcher] = useState(true)

    const navigate = useNavigate()
    const auth = getAuth()
    const dbRef = ref(getDatabase())

    function getUsersByEmail(users, email) {
        const usersArray = Object.values(users)
        return usersArray.filter((user) => user.email === email)
    }

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                get(child(dbRef, "/users/"))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const users = snapshot.val()
                            const foundUsers = getUsersByEmail(users, email)
                            if (foundUsers.length > 0) {
                                navigate("/Survey")
                                console.log("Users found:", foundUsers)
                            } else {
                                setIsResearcher(false)
                                console.log("No users found with email:", email)
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })
            .catch((error) => {
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
                <form onSubmit={signIn}>
                    <div className="form-group">
                        <input
                        required
                        name="email"
                        type="email"
                        className="form-control inputAuth"
                        placeholder="Email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                        </div>
                        <div className="form-group">
                            <input
                            required
                            name="password"
                            type="password"
                            className="form-control inputAuth"
                            placeholder="Password"
                            pattern=".{8,}"
                            title="Eight or more characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                            </div>
                            {isResearcher ? null : (
                                <div className="signInError">
                                    Please use the Survaid mobile app to sign in as a participant
                                </div>
                            )}
                                <div className="buttonOptions">
                                    <button className="btn btn-primary" type="submit">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signUp">
                            <Link className="signUpLink" to={"/SignUp"}>
                                Don"t have an account? <span className="signUpNow">Sign up now</span>
                            </Link>
                        </div>
                    </div>
    )
}

export default Signin
