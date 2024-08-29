import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginService from "../../../services/login.service";
import styles from "./LoginForm.module.css"; // Import the CSS module

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true; // Flag

    // Email validation
    if (!employee_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // Password validation
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    // Handle form submission here
    const formData = { employee_email, employee_password };
    console.log(formData);

    // Call the service
    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        if (data.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(data.data));
        }
        if (location.pathname === "/login") {
          window.location.replace("/");
        } else {
          window.location.reload();
        }
      } else {
        setServerError(data.message);
      }
    } catch (err) {
      console.log(err);
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.autoContainer}>
        <div className={styles.contactTitle}>
          <h2>Login to your account</h2>
        </div>
        <div className={styles.row}>
          <div className={`${styles.formColumn} col-lg-7`}>
            <div className={styles.innerColumn}>
              <div className={styles.contactForm}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.row}>
                    <div className={`${styles.formGroup} col-md-12`}>
                      {serverError && (
                        <div className={styles.validationError} role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        value={employee_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                        className={emailError ? styles.invalid : ""}
                      />
                      {emailError && (
                        <div className={styles.validationError} role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    <div className={`${styles.formGroup} col-md-12`}>
                      <input
                        type="password"
                        name="employee_password"
                        value={employee_password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        className={passwordError ? styles.invalid : ""}
                      />
                      {passwordError && (
                        <div className={styles.validationError} role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    <div className={`${styles.formGroup} col-md-12`}>
                      <button
                        className={`${styles.themeBtn} ${styles.btnStyleOne}`}
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
