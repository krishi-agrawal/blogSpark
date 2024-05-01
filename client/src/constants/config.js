export const API_NOTIFICATION_MSGS = {
    loading: {
        title: 'Loading data...',
        message: "Please wait while we load the data.."
    },
    success: {
        title: "success",
        message: "Data loaded successfully."
    },
    responseFailure: {
        title: "Server Error!",
        message: "An error detected while fetching data from server"
    },
    requestFailure: {
        title: "Error!",
        message: "An error detected while parsing request datar"
    },
    networkError: {
        title: "error",
        message: "unable to connect with server. Please check interner connection"
    }

}

export const SERVICE_URLS = {
    userSignup: { url: "/signup", method: 'POST' },
    userLogin: { url: "/login", method: 'POST' },
    uploadFile: { url: "/file/upload", method: 'POST' },
    createPost: { url: "/create", method: 'POST' },
    getAllPosts: { url: "/posts", method: 'GET', params: true },
    uploadFile: { url: 'file/upload', method: 'POST' },
    getAllPostsByUsername: { url: "/postsByUsername", method: 'GET', params: true },
    getPostById: { url: "/post", method: 'GET', query: true },
    updatePost: { url: "/update", method: 'PUT', query: true },
    deletePost: { url: "/delete", method: 'DELETE', query: true },
    newComment: { url: "/comment/new", method: 'POST' },
    getAllComments: { url: "/comments", method: 'GET', query: true },
    deleteComment: { url: "/comment/delete", method: 'DELETE', query: true}
}