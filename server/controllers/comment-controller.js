
import Comment from "../models/comment.js"

export const addComment = async(request, response) => {
    try {
        const comment = await new Comment(request.body)
        comment.save()
        response.status(200).json({msg: "added comment successfully..."})
    } catch (error) {
        response.status(500).json({msg: "could not add comment..."})
    }
}

export const getAllComments = async(request, response) => {
    try {
        const comments = await Comment.find({postId : request.params.id })
        response.status(200).json(comments)
    } catch (error) {
        response.status(500).json({msg: "could not get comments..."})
    }
}

export const deleteComment = async(request, response) => {
    try {
        await Comment.findByIdAndDelete(request.params.id)
        return response.status(200).json({msg :'deleted the comment...'})
    } catch (error) {
        response.status(500).json({msg: "could not get comments..."})
    }
}