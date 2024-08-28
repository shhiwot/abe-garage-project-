import React, { useState } from "react";
//useLocation gets the current URL location.
import { useLocation } from "react-router-dom";
import loginService from "../../../services/login.service";
import "./LoginForm.css"
function LoginForm() {
  //Initializes to access the current URL.
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  //form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle client side validations here
    let valid = true;
    // Email validation

    if (!employee_email) {
      setEmailError("Please enter your email address");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    //Stops form submission if there are validation errors.
    if (!valid) {
      return;
    }
    //  Creates an object with email and password for submission.
    const formData = {
      employee_email,
      employee_password,
    };
    // console.log(formData);
    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();

      if (data.status === "success" && data.employee_token) {
        localStorage.setItem("employee", JSON.stringify(data));
        if (location.pathname === "/login") {
          window.location.replace("/");
        } else {
          window.location.reload();
        }
      } else {
        setServerError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setServerError("An error has occurred. Please try again later." + err);
    }
  };
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div
                      className={`form-group col-md-12 ${serverError ? "validation-error" : ""}`}
                    >
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        value={employee_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                      />
                      <span className="line"></span>
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        value={employee_password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                      />
                      <span className="line"></span>
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Login</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
