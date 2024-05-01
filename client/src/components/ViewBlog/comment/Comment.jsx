import { useContext } from 'react'
import "./Comment.css"
import { MdDelete } from "react-icons/md"
import { DataContext } from '../../../context/DataProvider'
import { API } from '../../../service/api'

const Comment = ({ oneComment, setToggle}) => {
    const { account } = useContext(DataContext)
    const handleDelete = async () => {
        let response = await API.deleteComment(oneComment._id)
        if(response && response.status === 200){
            setToggle(prev => !prev)
        }
    }

    return (
        <div className='__single-comment'>
            <div className='user-details'>
                <h4>{oneComment.name}</h4>
                <div className='date'>{new Date(oneComment.date).toDateString()}</div>
                {oneComment.name === account.username && <MdDelete className='delete-icon' onClick={() => handleDelete()}/>}
            </div>
            <div className='user-comment'>
                <p>{oneComment.comments}</p>
            </div>
        </div>
    )
}

export default Comment