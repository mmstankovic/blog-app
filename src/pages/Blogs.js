import BlogList from "../components/posts/BlogList"
import { useEffect, useContext, useState } from "react"
import BlogContext from "../store/blog-context"
import NoPostsFound from '../components/posts/NoPostsFound'
import BlogSummary from "../components/layout/BlogSummary"
import BlinkingDots from "../components/UI/BlinkingDots"

const Blogs = () => {
    const blogCtx = useContext(BlogContext)
    const { getAllPosts } = blogCtx
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showColdStartMessage, setShowColdStartMessage] = useState(false)

    useEffect(() => {
        const fetchPostsData = async () => {
            setIsLoading(true)
            setHttpError(null)

            const hasLoadedBefore = sessionStorage.getItem('hasLoadedPosts')

            if (!hasLoadedBefore) {
                setShowColdStartMessage(true)
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`)

                if (!response.ok) {
                    throw new Error('Fetch posts data failed!')
                }

                const data = await response.json()

                getAllPosts(data)
                sessionStorage.setItem('hasLoadedPosts', 'true')
            } catch (err) {
                setHttpError(err.message)
            } finally {
                setIsLoading(false)
                setShowColdStartMessage(false)
            }

        }
        fetchPostsData()

    }, [getAllPosts])

    let content

    if (isLoading) {
        content = (
            <div className='centered column text-warning'>
                {showColdStartMessage && (
                    <p>
                        Please wait, the server is waking up (cold start)
                        <BlinkingDots />
                    </p>
                )}
                <p className="text-loading">
                    Loading posts
                    <BlinkingDots />
                </p>
            </div>
        )
    } else if (httpError) {
        content = <div className='centered text-error'>{httpError}</div>
    } else if (!blogCtx.posts || blogCtx.posts.length === 0) {
        content = <NoPostsFound />
    } else {
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