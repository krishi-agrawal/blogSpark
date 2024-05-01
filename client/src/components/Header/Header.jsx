import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div>
            <nav>
                <input type="checkbox" id="sidebar-active" />
                <label for="sidebar-active" className="open-sidebar-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                </label>
                <label id="overlay" for="sidebar-active"></label>
                <div className="links-container">
                    <label for="sidebar-active" className="close-sidebar-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </label>

                    <Link to="/" className="home-link">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/myblogs">My Blogs</Link>
                    <Link to="/login">Login</Link>

                </div>
            </nav>
        </div>
    )
}

export default Header