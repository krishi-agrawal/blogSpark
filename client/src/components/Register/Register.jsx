import {useState} from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "./Login.css"

import { API } from '../../service/api';
const [account, toggleAccount] = useState("login");
const [signup, setSignup] = useState(signupInitialValues)

const toggleSignup = () => {
    account === "signup"? toggleAccount("login") : toggleAccount("signup");
}
const onInputChange = (e) => {
    setSignup({...signup, [e.target.name] :[e.target.value]})
}
const signupUser = async () => {
    let response = await API.userSignup(signup)
}
const Register = () => {
    return (
        <div className='main'>
            <div className="left-section">
                <h1>Blogs</h1>
            </div>
            <div className='right-section'>
            {
                account === "login" ?
                <div className='wrapper'>
                    <form>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required onChange={(e) => {onInputChange(e)}}></input>
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' required onChange={(e) => {onInputChange(e)}}></input>
                            <FaLock className='icon' />
                        </div>
                        <button>Login</button>
                        <div className='register-link'>
                            <p>Don't have an account? <button onClick={() => toggleSignup()}>Register</button></p>
                        </div>
                    </form>
                </div>
                :
                <div className='wrapper'>
                    <form>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required onChange={(e) => {onInputChange(e)}}></input>
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' required onChange={(e) => {onInputChange(e)}}></input>
                            <FaLock className='icon' />
                        </div>
                        <button onClick={() => signupUser()}>Signup</button>
                        <div className='register-link'>
                            <p>Already have an account? <a href='#'>Login</a></p>
                        </div>
                    </form>
                </div>
            }
                
            </div>
        </div>
    )
}

export default Regis