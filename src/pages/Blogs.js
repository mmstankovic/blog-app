import BlogList from "../components/posts/BlogList"
import { useEffect, useContext, useState } from "react"
import BlogContext from "../store/blog-context"
import NoPostsFound from '../components/posts/NoPostsFound'
import BlogSummary from "../components/layout/BlogSummary"

const Blogs = () => {
    const blogCtx = useContext(BlogContext)
    const { getAllPosts } = blogCtx
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPostsData = async () => {
            setIsLoading(true)
            setHttpError(null)
            const response = await fetch('http://localhost:5000/posts')

            if(!response.ok) {
                throw new Error('Fetch posts data failed!')
            }

            const data = await response.json()
            
            getAllPosts(data)
            setIsLoading(false)
        }
        fetchPostsData().catch(error => {
            setHttpError(error.message)
            setIsLoading(false)
        })
    }, [getAllPosts])

    let content

    if(isLoading) {
        content = <div className='centered'>Loading posts...</div>
    }

    if(httpError) {
        content = <div className='centered'>{httpError}</div>
    }
        
    if(!isLoading && (!blogCtx.posts || blogCtx.posts.length === 0)) {
        content = <NoPostsFound />
    }
    if(!isLoading && (blogCtx.posts || blogCtx.posts.length !== 0)) {
        content = <BlogList />
    }

    return (
        <>
            <BlogSummary />
            {content}
        </>
    )
      
}
export default Blogs