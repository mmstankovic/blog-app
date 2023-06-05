import BlogItem from './BlogItem'
import classes from './BlogList.module.css'
import { useContext, useState } from 'react'
import BlogContext from '../../store/blog-context'
import { useLocation, useHistory } from 'react-router-dom'
import Modal from '../UI/Modal'
import PostsFilter from '../filter/PostsFilter'

const BlogList = () => {
    const blogCtx = useContext(BlogContext)
    const history = useHistory()
    const location = useLocation()
    const category = new URLSearchParams(location.search).get('category')
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
    const [postId, setPostId] = useState()
    const [postCategory, setPostCategory] = useState('all')

    const showConfirmationModal = (id) => {
        setPostId(id)
        setDisplayConfirmationModal(true)
    }
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false)
    }

    const submitDelete = async (id) => {
        await fetch(`http://localhost:5000/posts/${id}`, {
            method: 'DELETE'
        })

        blogCtx.deletePost(id)
        setDisplayConfirmationModal(false)
    }

    const editSelectedPost = (id) => {
        blogCtx.selectPost(id)
        history.push('/edit-post')
    }

    const getPartOfBody = (str) => {
        if(str.length < 100) {
            return str
        } else if(str.length >= 100) {
            return str.slice(0,140) + '...'
        }
    }
    const displayAllPosts = () => {
        history.replace('/blogs')
    }

    const postsFilterHandler = (selectedCategory) => {
        setPostCategory(selectedCategory)
    }

    let loadedPosts
   
    if(postCategory) {
        loadedPosts = blogCtx.posts.filter((post) => post.category === postCategory)
    }

    if(category) {
        loadedPosts = blogCtx.posts.filter((post) => post.category === category)
    }
    if(postCategory === 'all' && !category) {
        loadedPosts = blogCtx.posts
    }

    loadedPosts.sort((a,b) => {
        if(a.id < b.id) return 1
        if(a.id > b.id) return -1 
        return 0
    })

    const allPosts = loadedPosts.map((post) => <BlogItem 
        key={post.id} 
        id={post.id} 
        title={post.title}
        category={post.category}
        body={getPartOfBody(post.body)}
        author={post.author}
        onShow={showConfirmationModal}
        onEdit={editSelectedPost}
    />)

    return (
        <>
            {displayConfirmationModal && <Modal id={postId} name='Cancel' title='Delete Confirmation' message='Are you sure you want to delete this post?' action='Delete' onDelete={submitDelete} onClose={hideConfirmationModal}/>}
            {!category && <PostsFilter onFilter={postsFilterHandler} selCategory={postCategory}/>}
            {category && <button className={classes['all-categories']} onClick={displayAllPosts}>All Categories</button>}
            <ul className={classes['posts-list']}>
                {allPosts}
            </ul>
        </>
    )
}
export default BlogList