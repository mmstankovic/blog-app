import BlogContext from './blog-context'
import { useState, useCallback } from 'react'

const BlogProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(localStorage.getItem('isLoggedIn')==='1'?true:false)
    const [selectedPost, setSelectedPost] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    const loginUserHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setUserIsLoggedIn(true)
    }
    const logoutUserHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setUserIsLoggedIn(false)
    }

    const displayAllPosts = useCallback((dataPosts) => {
        setPosts(dataPosts)
    },[])

    const displayHighlightedPost = useCallback((postData) => {
       setSelectedPost(postData)   
    },[])

    const deletePost = (id) => {
        const updatedPosts = posts.filter((post) => post.id !== id)
        setPosts(updatedPosts)
    }

    const selectPostToEdit = (id) => {
        const existingPost = posts.find((post) => post.id === id)
        setSelectedPost(existingPost)
        setIsEditing(true)
    }

    const changeIsEditingHandler = () => {
        setIsEditing(false)
    }

    const contextValue = {
        posts: posts,
        isLoggedIn: userIsLoggedIn,
        getAllPosts: displayAllPosts,
        getSinglePost: displayHighlightedPost,
        login: loginUserHandler,
        logout: logoutUserHandler,
        deletePost: deletePost,
        selectPost: selectPostToEdit,
        selectedPost: selectedPost,
        isEditing: isEditing,
        changeIsEditing: changeIsEditingHandler
    }

    return (
        <BlogContext.Provider value={contextValue}>
            {props.children}
        </BlogContext.Provider>
    )
}
export default BlogProvider