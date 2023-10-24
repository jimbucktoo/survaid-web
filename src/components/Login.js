import React from "react";

import logo from "../assets/survaid.png";
import "../App.css";

function Login() {
  return (
    <div>
      <h1 className="surv">
        Surv<span className="aid">aid</span>
      </h1>

      <div className="Login">
        <img className="survaidLogo" src={logo} alt="Survaid Logo" />
      </div>

      <div>
        <div id="input">
          <input
            className="login"
            placeholder="Username"
            id="username"
            name="username"
            type="text"
            required
          />
          <input
            className="login"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>

        <button className="btn btn-primary">Login</button>
        <div id="signup">
          <a>
            Don't have an account?{" "}
            <span className="signUpNow">Sign up now</span>
          </a>
        </div>

        <div id="forgot-password">
          <a>Forgot your Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
