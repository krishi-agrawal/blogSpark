import { useContext, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import "./Comments.css"
import { FaUser } from "react-icons/fa";
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from '../comment/Comment.jsx';
const initialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
}


const Comments = ({ post }) => {
    const { account } = useContext(DataContext)
    const [comment, setComment] = useState(initialValues)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    const [popup, setPopup] = useState(false)

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        })
    }


    const addComment = async () => {
        let response = await API.newComment(comment)
        if (response && response.status === 200) {
            setComment(initialValues)
        }
        setToggle(prev => !prev)
        setPopup(true)
        setTimeout(() => {
            setPopup(false);
        }, 2000);

    }

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await API.getAllComments(post._id)
                if (response && response.status === 200) {
                    console.log(response.data);
                    setComments(response.data)
                }
            } catch (error) {
                console.log('Error while getting data ', error)
            }
        }
        getData()
    }, [post, toggle])

    return (
        <div className='__comments-main'>
            <h2>Comments</h2>
            <div className='user-comment'>
                <div className='user-info'>
                    <FaUser className='user-icon' />
                    <div>{account.username}</div>
                    <button onClick={() => addComment()}>Post</button>
                    {popup && <div className='pop-up'>Comment posted!</div>}
                </div>
                <TextareaAutosize
                    minRows={5}
                    placeholder="Write a comment ..."
                    className='text-area'
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                {

                    comments && comments.length > 0 ? comments.map(oneComment =>
                        (<Comment oneComment={oneComment} key={oneComment._id} setToggle={setToggle} />)
                    )
                        :
                        <div>No comments available to display</div>
                }
            </div>
        </div>
    )
}

export default Comments