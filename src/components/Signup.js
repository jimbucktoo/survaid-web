import React from "react";
import logo from "../assets/survaid.png";
import "../App.css";

function SignUp() {
    return (
        <div className="signUpComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <form>
                <div>
                    <input
                        required
                        name="email"
                        type="email"
                        className="form-control inputAuth"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        required
                        name="password"
                        type="password"
                        className="form-control inputAuth"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <input
                        required
                        name="confirmPassword"
                        type="password"
                        className="form-control inputAuth"
                        placeholder="Confirm Password"
                    />
                </div>
                <div>
                    <input
                        required
                        name="firstName"
                        type="text"
                        className="form-control inputAuth"
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <input
                        required
                        name="lastName"
                        type="text"
                        className="form-control inputAuth"
                        placeholder="Last Name"
                    />
                </div>
            </form>
            <div className="buttonOptions">
                <button className="btn btn-primary">Sign Up</button>
                <button className="btn btn-danger cancelSignUp">Cancel</button>
            </div>
        </div>
    );
}

export default SignUp;
