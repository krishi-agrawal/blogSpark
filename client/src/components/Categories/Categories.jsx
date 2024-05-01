import { useState } from 'react';
import "./Categories.css"
import { categories } from '../../constants/data';
import { Link, useSearchParams } from "react-router-dom"
import { motion } from 'framer-motion'
import { GiPalmTree } from "react-icons/gi";
const Categories = () => {
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    return (
        <div className="categories-section">

            <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}>
                <Link to={`/create?category=${category || ''}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <button className='create-blog-btn'>Create Blog</button>
                </Link>
            </motion.div>

            <table className='table'>
                <thead>
                    <motion.tr 
                    initial = {{ scale: 1 }}
                    whileHover = {{ scale: 1.07 }}>
                    <th>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                            All Categories
                        </Link>
                    </th>
                </motion.tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <motion.tr key={category.id}
                    initial = {{ scale: 1 }}
                    whileHover = {{ scale: 1.07 }}>
                        <td>
                            {/* <category.icon/> */}
                            <Link to={`/?category=${category.type}`} style={{ textDecoration: "none", color: "inherit" }}>
                                {category.type}
                            </Link>
                        </td>
                    </motion.tr>
                ))}
            </tbody>
        </table>
            
        </div >
    );
};

export default Categories