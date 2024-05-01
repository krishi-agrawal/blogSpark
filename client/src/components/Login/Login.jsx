import { useState, useContext, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
import { AiFillInfoCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "./Login.css"

import { API } from '../../service/api'
import { DataContext } from "../../context/DataProvider.js"
import { useNavigate } from 'react-router-dom'
import { Tooltip as ReactTooltip } from "react-tooltip";

const Login = ({ isUserAuthenticated }) => {
    const loginInitialValues = {
        username: '',
        password: ''
    };

    const signupInitialValues = {
        name: '',
        username: '',
        password: '',
    }

    const [account, toggleAccount] = useState("login")
    const [login, setLogin] = useState(loginInitialValues)
    const [signup, setSignup] = useState(signupInitialValues)
    const [error, setError] = useState("")
    const [loginError, setLoginError] = useState("")
    const [tooltip, setTooltip] = useState(false)
    const navigate = useNavigate()
    const { setAccount } = useContext(DataContext)

    useEffect(() => {
        setError("");
        setLoginError("")
    }, [signup, login])

    const toggleSignup = () => {
        account === "signup" ? toggleAccount("login") : toggleAccount("signup");
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const signupUser = async () => {
        if(signup.password.length < 8){
            setTooltip(true)
            return
        }
        let response
        try {
            response = await API.userSignup(signup);
            console.log("Signup response:", response.data.msg);
            if (response && response.status === 200) {
                console.log("Signup successful");
                setError("");
                setLoginError("")
                setSignup(signupInitialValues)
                toggleSignup();
            }
        } catch (error) {
            console.log(error)
            setError("Please check your details and try again.");
        }
    }

    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            if (response && response.status === 200) {
                setLoginError("")
                setError("")
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                console.log(localStorage)
                isUserAuthenticated(true)

                console.log("user authenticated");
                navigate("/")
            }
        } catch (error) {
            setLoginError("Failed to login. Please check your details and try again.");  // Set a user-friendly error message
        }
    }
    return (
        <div className='main'>
            <div className="left-section">
                <img src='../../../img/login-pic.png' className='login-pic'></img>
            </div>
            <div className='right-section'>
                {
                    account === "login" ?
                        <div className='wrapper'>
                            <div>
                                <h1>Login</h1>
                                <div className='input-box'>
                                    <input type="text" value={login.username} onChange={(e) => onValueChange(e)} placeholder='Username' name='username'></input>
                                    <FaUserCircle className='login-icon' />
                                </div>
                                <div className='input-box'>
                                    <input type="password" value={login.password} onChange={(e) => onValueChange(e)} placeholder='Password' name='password'></input>
                                    <FaLock className='login-icon' />
                                </div>
                                {loginError && <div className='error-message '>{loginError}</div>}
                                <button onClick={() => { loginUser() }}>Login</button>
                                <div className='register-link'>
                                    <p>Don't have an account? <button onClick={() => toggleSignup()}>Register</button></p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='wrapper'>
                            <div>
                                <h1>Signup</h1>
                                <div className='input-box'>
                                    <input type="text" placeholder='Name' name='name' onChange={(e) => { onInputChange(e) }}></input>
                                    <FaUser className='login-icon' />
                                </div>
                                <div className='input-box'>
                                    <input type="text" placeholder='Username' name='username' onChange={(e) => { onInputChange(e) }}></input>
                                    <FaUserCircle className='login-icon' />
                                </div>
                                <div className='input-box'>
                                    <input type="password" placeholder='Password' name='password' onChange={(e) => { onInputChange(e) }} ></input>
                                    {tooltip && <AiFillInfoCircle className='login-icon' data-tooltip-id="my-tooltip-1" fill='red'/>}
                                    <ReactTooltip
                                        id="my-tooltip-1"
                                        place="bottom"
                                        content="Password should be atleast 8 characters long"
                                    />
                                </div>
                                {error && <div className='error-message '>{error}</div>}
                                <button onClick={() => signupUser()}>Signup</button>
                                <div className='register-link'>
                                    <p>Already have an account? <button onClick={() => toggleSignup()}>Login</button></p>
                                </div>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default Login