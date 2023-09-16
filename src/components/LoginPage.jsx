import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./NavBar";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    "email": "",
    "password": "",
    "first name": "",
    "last name": " ",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with:", loginForm);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signing up with:", signupForm);
  };

  const loadData = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
      })
  }

  const loginSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(loginForm))
    fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  };

  const signUpSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setSignupForm)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Signup form: ", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">{isLogin ? "Login" : "Sign Up"}</div>
              <div className="card-body">
                {isLogin ? (
                  <form onSubmit={loginSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      Login
                    </button>
                  </form>
                ) : (
                  <form onSubmit={signUpSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={signupForm.email}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="first name" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="first-name"
                        name="first name"
                        value={signupForm["first name"]}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="last name" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="last-name"
                        name="last name"
                        value={signupForm["last name"]}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ fontWeight: "bold" }}
                    >
                      Sign Up
                    </button>
                  </form>
                )}
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleSwitchForm}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
