import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Eye, EyeOff } from "react-feather";
import firebase from "../../firebase-config";
import Button from "../navbar/Button";
import "./Signup.scss";

export default function Signup() {
  const auth = getAuth(firebase);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    if (registerPassword === registerConfirmPassword) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );

        // window.location.reload(true);
      } catch (error) {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password"
        )
          setErrorMessage("Incorrect email address or password.");
        else if (error.code === "auth/internal-error")
          setErrorMessage("No login or password.");
        else if (error.code === "auth/weak-password")
          setErrorMessage("Password is too short.");
        else if (error.code === "auth/email-already-in-use")
          setErrorMessage("User already exists.");
      }
    } else {
      setErrorMessage("Those passwords didn’t match. Try again.");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form onSubmit={register} className="signup">
      <h3> Register User</h3>
      <div className="signup__input">
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          className="signup__password"
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          type={passwordShown ? "text" : "password"}
        />
        <div className="signup__confirm-password">
          <input
            placeholder="Confirm Password..."
            onChange={(event) => {
              setRegisterConfirmPassword(event.target.value);
            }}
            type={passwordShown ? "text" : "password"}
          />
          <Button
            type="button"
            buttonStyle="btn--outline"
            buttonSize="btn--small"
            onClick={togglePassword}
          >
            {passwordShown ? <Eye size={12} /> : <EyeOff size={12} />}
          </Button>
        </div>
      </div>
      <div className="signup__error">{errorMessage}</div>
      <Button submitButton>Create User</Button>
    </form>
  );
}
