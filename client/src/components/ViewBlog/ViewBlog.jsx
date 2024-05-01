import { useEffect, useState, useContext } from 'react'
import "./ViewBlog.css"
import { useParams, Link, useNavigate } from "react-router-dom"

import Comments from './comments/Comments.jsx'
import { API } from "../../service/api.js"
import { FaPen } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { DataContext } from '../../context/DataProvider.js'

const ViewBlog = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const url = post.picture ? post.picture : '../../../img/newBlog.png'
  const { account } = useContext(DataContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id)
      if (response && response.status === 200) {
        setPost(response.data)
      }
    }

    console.log("post is here...")
    fetchData()
  }, [id])

  const deleteBlogPost = async () => {
    try {
      let response = await API.deletePost(post._id)
      if (response && response.status === 200) {
        console.log("Deleted post successfully...")
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }

  }
  const handleClick = () => {
    console.log("clicked edit btn")
  }

  return (
    <div className='__view-blog'>
      <div className='blog-contents'>
        <div className='blog-img'>
          <img src={url}></img>
        </div>
        {account.username === post.username &&
          <div className='edit-icons'>
            <Link to={`/update/${post._id}`}>
              <FaPen className='edit' onClick={() => handleClick()} />
            </Link>
            <MdDelete className='delete' onClick={() => deleteBlogPost()} />

          </div>}
        <h2>{post.title}</h2>
        <div className='grey'>
          <p className='blog-username'>Author: {post.username}</p>
          <p className='blog-date'>Pubished on: {new Date(post.createdDate).toDateString()}</p>
        </div>
        <p className='blog-desc'> {post.desc}</p>
      </div>
      <Comments post={post}/>
    </div>
  )
}

export default ViewBlog