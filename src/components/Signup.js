import React, {useState} from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/survaid.png";
import "../App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import '../firebase/firebase';
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const auth = getAuth();
    const SignUp = (e) => {
        e.preventDefault();
        console.log("SignUp")
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) => {
                console.log(error)
            })
    } 
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
        <div className="signUpComponent">
            <h1 className="surv">
                Surv<span className="aid">aid</span>
            </h1>
            <img className="survaidLogo" src={logo} alt="Survaid Logo" />
            <div>
                <form onSubmit={SignUp}>
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
    );
}

export default Signup;
