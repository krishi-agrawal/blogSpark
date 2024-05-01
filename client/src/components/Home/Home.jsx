import React from 'react'
import Slider from "../Slider/Slider.jsx"
import Categories from '../Categories/Categories.jsx'
import BlogsList from '../BlogsList/BlogsList.jsx'
import "./Home.css"
const Home = () => {
    return (
        <>
            <Slider />
            <div className='__cat-and-blogs'>
                <Categories className='category-list' />
                <BlogsList className="blog-list"/>
            </div>

        </>
    )
}

export default Home