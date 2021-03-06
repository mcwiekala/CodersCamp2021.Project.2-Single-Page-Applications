import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Eye, EyeOff } from "react-feather";
import firebase from "../../firebase-config";
import Button from "../navbar/Button";
import "./Login.scss";

export default function Login() {
  const auth = getAuth(firebase);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // window.location.reload(true);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password"
      )
        setErrorMessage("Incorrect email address or password.");
      else if (error.code === "auth/internal-error")
        setErrorMessage("No login or password.");
      else if (error.code === "auth/user-not-found")
        setErrorMessage("User does not exist.");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form onSubmit={login} className="login">
      <h3> Login</h3>
      <div className="login__input">
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <div className="login__password ">
          <input
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
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
      <div className="login__error">{errorMessage}</div>
      <Button submitButton>Login</Button>
    </form>
  );
}
