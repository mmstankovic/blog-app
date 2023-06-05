import { useContext, useState } from 'react'
import BlogContext from '../store/blog-context'
import { useHistory } from 'react-router-dom'
import PostForm from '../components/posts/PostForm'

const EditPost = () => {
    const blogCtx = useContext(BlogContext)
    const {id} = blogCtx.selectedPost
    const [isLoading, setIsLoading] = useState(false)
    const [httpEditError, setHttpEditError] = useState(null)
    const history = useHistory() 

    const editPostHandler = (newPostData) => {
        setIsLoading(true)
        setHttpEditError(null)
        fetch(`http://localhost:5000/posts/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: newPostData.author,
                title: newPostData.title,
                category: newPostData.category,
                body: newPostData.body
            })
        })
        .then((res) => {
            setIsLoading(false)
            if(res.ok) {
                return res.json()
            } else {
                return res.json().then((data) => {
                    let errorMessage = 'Post edit failed!'
                    
                    if(data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage)
                })
            }
        })
        .then((data) => {
            history.replace('/blogs')
        })
        .catch((error) => {
            setHttpEditError(error.message)
        })
    }

    if(httpEditError) {
        return <div className='centered'>{httpEditError}</div>
    }

    return <PostForm onEdit={editPostHandler} isLoading={isLoading} />
}
export default EditPost