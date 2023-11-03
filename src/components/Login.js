import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/survaid.png";
import "../App.css";

function Login() {
    return (
        <div className="loginComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <div>
                <form>
                    <div className="form-group">
                        <input
                        required
                        name="email"
                        type="email"
                        className="form-control inputAuth"
                        placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <input
                        required
                        name="password"
                        type="password"
                        className="form-control inputAuth"
                        placeholder="Password"/>
                    </div>
                </form>
                <div className="buttonOptions">
                    <Link className="loginLink" to={"/Surveys"}>
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
            <div className="signUp">
                <Link className="signUpLink" to={"/signup"}>
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
