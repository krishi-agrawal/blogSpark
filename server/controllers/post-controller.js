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
        if(category) {
            posts = await Post.find({categories : category})
        }
        else{
            posts = await Post.find({})
        }
        return response.status(200).json(posts)
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getAllPostsByUsername = async (request, response) => {
    let posts
    let username = request.query.username
    try {
        if(username) {
            posts = await Post.find({username : username})
        }
        else{
            posts = await Post.find({})
        }
        return response.status(200).json(posts)
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id)
        return response.status(200).json(post)
    } catch(error) {
        return response.status(500).json(error)
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id)
        if(!post){
            return response.status(400).json('No post with this id...')
        }
        await Post.findByIdAndUpdate(request.params.id, {$set: request.body})
        response.status(200).json(post)
    } catch(error) {
        return response.status(500).json(error)
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.id)
        return response.status(200).json({msg :'Deleted the post'})
    } catch(error) {
        return response.status(500).json(error)
    }
}