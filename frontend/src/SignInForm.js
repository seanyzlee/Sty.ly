import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function SignInForm() {
  const [formType, setFormType] = useState("signIn");
  const [state, setState] = useState({
    email: "",
    password: "",
    gender: "",
    ageCategory: ""
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
    const { email, password, gender, ageCategory } = state;
    alert(`You are logging in with email: ${email}, password: ${password}, gender: ${gender}, and age category: ${ageCategory}`);
    setState({
      email: "",
      password: "",
      gender: "",
      ageCategory: ""
    });
  };

  const toggleForm = () => {
    setFormType(prevFormType => (prevFormType === "signIn" ? "signUp" : "signIn"));
  };

  const closeForm = () => {
    navigate('/chat');
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
            {formType === "signUp" && (
              <>
                <div className="gender-selection">
                  <button
                    type="button"
                    className={`gender-button ${state.gender === "female" ? "selected" : ""}`}
                    name="gender"
                    value="female"
                    onClick={handleChange}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    className={`gender-button ${state.gender === "male" ? "selected" : ""}`}
                    name="gender"
                    value="male"
                    onClick={handleChange}
                  >
                    Male
                  </button>
                </div>
                <div className="age-selection">
                  <button
                    type="button"
                    className={`age-button ${state.ageCategory === "18-25" ? "selected" : ""}`}
                    name="ageCategory"
                    value="18-25"
                    onClick={handleChange}
                  >
                    18-25
                  </button>
                  <button
                    type="button"
                    className={`age-button ${state.ageCategory === "26-45" ? "selected" : ""}`}
                    name="ageCategory"
                    value="26-45"
                    onClick={handleChange}
                  >
                    26-45
                  </button>
                  <button
                    type="button"
                    className={`age-button ${state.ageCategory === "46-65" ? "selected" : ""}`}
                    name="ageCategory"
                    value="46-65"
                    onClick={handleChange}
                  >
                    46-65
                  </button>
                  <button
                    type="button"
                    className={`age-button ${state.ageCategory === "66+" ? "selected" : ""}`}
                    name="ageCategory"
                    value="66+"
                    onClick={handleChange}
                  >
                    66+
                  </button>
                </div>
              </>
            )}
            <button className={`button ${formType === "signIn" ? "sign-in-button" : "sign-up-button"}`} type="submit">
              {formType === "signIn" ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <button className="ghost sign-in-button" id="signIn" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hi friend! Enter your personal details and start your journey with us today.</h2>
              <button className="ghost sign-up-button" id="signUp" onClick={toggleForm}>
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
