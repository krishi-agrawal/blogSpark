import { useState, useEffect, useContext } from "react"
import { IoIosAddCircle } from "react-icons/io";
import TextareaAutosize from 'react-textarea-autosize';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api.js"
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import "./CreatePost.css"


const initialPost = {
    title: "",
    desc: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
}
const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams()
    
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : '../../../img/newBlog.png'
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id)
            if(response && response.status === 200){
                setPost(response.data)
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData()
                data.append("name", file.name)
                data.append('file', file)
                try {
                    let response = await API.uploadFile(data)
                    setPost(currentPost => ({ ...currentPost, picture: response.data }));
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        }
        getImage();        
    }, [file])

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [location.search, account.username]);
    
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const updateBlogPost = async () => {
        try {
            
            let response = await API.updatePost(post);
            if(response && response.status === 200){
                console.log("succesfully updated...");       
                navigate(`/view/${id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="blog-img">
                <img src={url} alt='blog-img'></img>
            </div>

            <div className='__user-input' autoComplete="off">
                <label htmlFor="fileInput">
                    <IoIosAddCircle size="2rem" color="action" cursor={"pointer"} />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".png, .jpg, .jpeg"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }}
                />
                <input value={post.title} onChange={(e) => handleChange(e)}  type="text" placeholder='Title' className='title-input'  name="title" ></input>
                <button  type="button" className='publish-btn' onClick={() => updateBlogPost()}>Update</button>
            </div>

            <div className='content-editor'>
                <TextareaAutosize onChange={(e) => handleChange(e)}  value={post.desc} minRows={5} placeholder="Tell your story..." className="text-area-autosize" name="desc"  />

            </div>
        </div>
    )
}

export default Update