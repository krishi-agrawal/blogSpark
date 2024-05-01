import express from "express"
import { signupUser } from "../controllers/user-controller.js"
import { loginUser } from "../controllers/user-controller.js"
import { uploadImage, getImage } from "../controllers/image-controller.js"
import { createPost, getAllPosts, getPost, updatePost, deletePost, getAllPostsByUsername} from '../controllers/post-controller.js'
import { addComment, getAllComments, deleteComment } from "../controllers/comment-controller.js"
import {authenticateToken} from "../controllers/jwt-controller.js"
import upload from "../utils/upload.js"

const router = express.Router()

// login routes
router.post('/signup', signupUser)
router.post('/login', loginUser)

// image routes
router.post("/file/upload", upload.single("file"), uploadImage)
router.get("/file/:filename", getImage)

// blog routes
router.post("/create", authenticateToken, createPost)
router.get("/posts", authenticateToken, getAllPosts)
router.get("/postsByUsername", authenticateToken, getAllPostsByUsername)
router.get("/post/:id", authenticateToken, getPost)
router.put("/update/:id", authenticateToken, updatePost)
router.delete( "/delete/:id", authenticateToken, deletePost) 

//  comment routes
router.post("/comment/new", authenticateToken, addComment)
router.get("/comments/:id", authenticateToken, getAllComments)
router.delete("/comment/delete/:id", authenticateToken, deleteComment)

export default router