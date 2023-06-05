import HighLightedPost from "../components/posts/HighLightedPost"
import { useParams } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import BlogContext from "../store/blog-context"

const BlogDetails = () => {
    const params = useParams()
    const {postId} = params
    const blogCtx = useContext(BlogContext)
    const {getSinglePost} = blogCtx
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {selectedPost} = blogCtx

    useEffect(() => {
        const fetchPost = async (id) => {
            setIsLoading(true)
            setError(null)
            const response = await fetch(`http://localhost:5000/posts/${id}`)

            if(!response.ok) {
                throw new Error('Could not fetch post details!')
            }

            const data = await response.json()
            
            getSinglePost(data)
            setIsLoading(false)
        }
        fetchPost(postId).catch((err) => {
            setIsLoading(false)
            setError(err.message)
        })
    }, [getSinglePost, postId])

    if(isLoading) {
        return <div className='centered'>Loading post...</div>
    }
    if(error) {
        return <div className='centered'>{error}</div>
    }
    if(!selectedPost.author) {
        return <p>No found post!</p>
    }

    return <HighLightedPost />
}
export default BlogDetails