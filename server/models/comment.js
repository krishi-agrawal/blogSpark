import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('comment', commentSchema)
export default Comment