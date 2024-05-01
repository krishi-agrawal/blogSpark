import React from 'react'
import "./Blog.css"
import { motion } from 'framer-motion'
const Blog = ({ post }) => {
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  }

  return (
    <div >
      <motion.div
        className='blog-card'
        key={post.id}>
        <motion.h1
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >{addEllipsis(post.title, 25)}</motion.h1>
        <motion.p
          className='blog-username'
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >by {post.username}</motion.p>
        <motion.p
          className='blog-categories'
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >Categories : {post.categories}</motion.p>
        <div className='blog-pic'>
          {post.picture ? <img src={post.picture}></img> : <img src='../../../img/newBlog.png'></img>}
        </div>

      </motion.div>
    </div>
  )
}

export default Blog

