import React, { useRef, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './CommonStyling.css';

// Regular expressions for username and password validation
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/Login';

function Signup() {
  // Refs for DOM elements
  const userRef = useRef();
  const errRef = useRef();

  // State variables for user input, validation, and focus
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // Error and success state
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // Effect to focus on the username input field on mount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Effect to validate the username whenever it changes
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // Effect to validate the password and password match whenever they change
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Effect to clear error message whenever username, password, or password match changes
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUsernameValid = USER_REGEX.test(user);
    const isPasswordValid = PWD_REGEX.test(pwd);

    // Check if the entered username and password are valid
    if (!isUsernameValid || !isPasswordValid) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      // Attempt to register the user using Axios and the defined API endpoint
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      // Log relevant registration information
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      // Registration successful, update success state and clear input fields
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      // Handle registration errors, display appropriate error message
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        // Display a success message if registration was successful
        <section>
          <h1>Account Created Successfully!</h1>
          <p>Your account has been created. You can now <NavLink to="/login"className="nav-link">login</NavLink>.</p>
          {/* Additional content for successful registration */}
        </section>
      ) : (
        // Display the registration form if registration was not successful
        <section>
          {/* Display error message if present, otherwise hide offscreen */}
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="form">
            {/* Username input field with validation icons */}
            <label htmlFor="username">
              Username:
              {validName ? <span className="valid">✓</span> : null}
              {!validName && user ? <span className="invalid">✕</span> : null}
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {/* Instructions for username input */}
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* Password input field with validation icons */}
            <label htmlFor="password">
              Password:
              {validPwd ? <span className="valid">✓</span> : null}
              {!validPwd && pwd ? <span className="invalid">✕</span> : null}
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {/* Instructions for password input */}
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number, and a special character.<br />
              Allowed special characters: ! @ # $ %
            </p>

            {/* Confirm Password input field with validation icons */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              {validMatch && matchPwd ? <span className="valid">✓</span> : null}
              {!validMatch && matchPwd ? <span className="invalid">✕</span> : null}
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            {/* Instructions for confirming password input */}
            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
            >
              Must match the first password input field.
            </p>

            {/* Submit button with disabled state based on input validity */}
            <button disabled={!validName || !validPwd || !validMatch}
            style={{ color: "black" }}>
              Sign Up
            </button>
          </form>
          {/* Option to navigate to the login page if already registered */}
          <p>
            Already registered?<br />
            <span className="line">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Signup;
