import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInForm.css"; // Ensure this CSS file is correctly imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function SignInForm() {
  const [formType, setFormType] = useState("signIn");
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    alert(`You are logging in with email: ${email} and password: ${password}`);
    setState({
      email: "",
      password: ""
    });
  };

  const toggleForm = () => {
    setFormType(prevFormType => (prevFormType === "signIn" ? "signUp" : "signIn"));
  };

  const closeForm = () => {
    navigate('/chat'); // Navigate to the chat page or any other route
  };

  return (
    <div className="Log">
      <div className={`container ${formType === "signUp" ? "right-panel-active" : ""}`} id="container">
        <div className={`form-container ${formType === "signIn" ? "sign-in-container" : "sign-up-container"}`}>
          <button className="close-button" onClick={closeForm}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form onSubmit={handleOnSubmit}>
            <h1>{formType === "signIn" ? "Sign In" : "Sign Up"}</h1>
            {formType === "signIn"}
            <input
              type="email"
              placeholder="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
            />
            <button type="submit" >{formType === "signIn" ? "Sign In" : "Sign Up"}</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <button className="ghost" id="signIn" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1> Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
