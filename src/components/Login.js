import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/survaid.png";
import "../App.css";
import '../firebase/firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email + ": Signed In")
        } else {
            console.log("Signed Out")
        }
    });

    const Login = (e) => {
        e.preventDefault();
        console.log("Login")
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="loginComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <div>
                <form onSubmit={Login}>
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
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
            </div>
            <div className="signUp">
                <Link className="signUpLink" to={"/SignUp"}>
                    Don't have an account?{" "}
                    <span className="signUpNow">Sign up now</span>
                </Link>
            </div>
            <div className="forgotPassword">
                <Link className="forgotPasswordLink" to={"/"}>
                    Forgot your password?
                </Link>
            </div>
        </div>
    );
}

export default Login;
