import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { API } from "../../service/api.js"

import "./BlogsList.css"
import Blog from "../Blog/Blog.jsx"

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [ searchParams] = useSearchParams()
  const category = searchParams.get("category")
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({category : category || ''})
      if (response && response.status === 200) {
        console.log(response.data);
        setPosts(response.data)
      }
    }
    fetchData()
  }, [category])


  return (
    <div className='blog-main'>
      {
        posts && posts.length > 0 ?
          posts.map((post) => {
            return (
              <Link to={`view/${post._id}`} key={post._id} style={{textDecoration: "none", color: "inherit"}}>
                <Blog post={post}/>
              </Link>
            )
          })
          :
          <div>No posts available to display</div>
      }

    </div>
  )
}

export default BlogList

