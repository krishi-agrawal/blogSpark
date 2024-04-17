
import Post from "../models/post.js"
export const createPost = async (request, response) => {
    try {
        const post = await  new Post(request.body).save();
        return response.status(200).json({message: 'Post created successfully'});
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let posts
    let category = request.query.category
    try {
        console.log(request.query);
        if(category) {
            console.log(category);
            posts = await Post.find({categories : category})
        }
        else{
            console.log("ooppss");
            posts = await Post.find({})
        }
        return response.status(200).json(posts)
    } catch (error) {
        return response.status(500).json(error)
    }
}