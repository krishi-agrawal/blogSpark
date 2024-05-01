import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { API } from "../../service/api.js"
import { DataContext } from '../../context/DataProvider.js'
import "./MyBlogs.css"
import "../BlogsList/BlogsList.css"
import Blog from "../Blog/Blog.jsx"

const MyBlogs = () => {
  const [posts, setPosts] = useState([])
  const { account } = useContext(DataContext)

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPostsByUsername({ username: account.username })
      if (response && response.status === 200) {
        console.log(response.data);
        setPosts(response.data)
      }
    }
    fetchData()
  }, [])


  return (
    <div className='my-blogs'>
      <div className='blog-main'>
        {
          posts && posts.length > 0 ?
            posts.map((post) => {
              return (
                <Link to={`/view/${post._id}`} key={post._id} style={{ textDecoration: "none", color: "inherit" }}>
                  <Blog post={post} />
                </Link>
              )
            })
            :
            <div>No posts available to display</div>
        }

      </div>
    </div>
  )
}

export default MyBlogs

