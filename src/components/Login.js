import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/survaid.png";
import "../App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import '../firebase/firebase';

function Login() {

    const database = getDatabase();
    const surveyRef = ref(database, 'surveys/');
    onValue(surveyRef, (snapshot) => {
        const data = snapshot.val();
        if( !!data ) {
            console.log(data);
        } else {
            console.log('Data not found');
        }  
    });

    return (
        <div className="loginComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <div>
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
                        </form>
                        <div className="buttonOptions">
                            <Link className="loginLink" to={"/Surveys"}>
                                <button className="btn btn-primary">Login</button>
                            </Link>
                        </div>
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
