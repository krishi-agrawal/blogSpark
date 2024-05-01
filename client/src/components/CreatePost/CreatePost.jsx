import { IoIosAddCircle } from "react-icons/io";
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css"

import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api.js"

const initialPost = {
    title: "",
    desc: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
}
const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : '../../../img/newBlog.png';

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
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [location.search, account.username]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const savePost = async () => {
        try {
            
            let response = await API.createPost(post);
            if(response && response.status === 200){
                console.log("succesfully posted...");
                navigate("/")
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

            <form className='__user-input' encType="multipart/form-data">
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
                <input type="text" placeholder='Title' className='title-input' onChange={(e) => handleChange(e)} name="title"></input>
                <button type='button' className='publish-btn' onClick={() => savePost()}>Publish</button>
            </form>

            <div className='content-editor'>
                <TextareaAutosize minRows={5} placeholder="Tell your story..." className="text-area-autosize" onChange={(e) => handleChange(e)} name="desc" />

            </div>
        </div>
    )
}

export default CreatePost