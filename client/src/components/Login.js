import React, { useRef, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../components/Home';
import './CommonStyling.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = '/login';

function Login() {
    const Navigate = useNavigate();

    // Refs for DOM elements
    
    const userRef = useRef();
    const pwdRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handlesubmit = () => {
        Navigate('/');
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const isUsernameValid = USER_REGEX.test(user);
        const isPasswordValid = PWD_REGEX.test(pwd);

        if (!isUsernameValid || !isPasswordValid) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));

            // Handle successful login
            setSuccess(true);
            // Clear state and controlled inputs
            setUser('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid Credentials');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Login Successful!</h1>
                    {/* Additional content for successful login */}
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handlesubmit} className="form">
                        {/* Username */}
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
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                        {/* Password */}
                        <label htmlFor="password">
                            Password:
                            {validPwd ? <span className="valid">✓</span> : null}
                            {!validPwd && pwd ? <span className="invalid">✕</span> : null}
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={pwdRef}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />

                        <button disabled={!validName || !validPwd} style={{ color: "black" }}>
                            Login
                        </button>
                    </form>
                    <p>
                        Not registered yet?<br />
                        <span className="line">
                            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login;
