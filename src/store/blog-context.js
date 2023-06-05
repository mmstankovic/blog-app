import React from "react";

const BlogContext = React.createContext({
    posts: [],
    isLoggedIn: false,
    getAllPosts: (data) => {},
    getSinglePost: (id) => {},
    login: () => {},
    logout: () => {},
    deletePost: (id) => {},
    selectPost: (id) => {},
    selectedPost: {},
    isEditing: false, //added
    changeIsEditing: () => {}//added
})
export default BlogContext