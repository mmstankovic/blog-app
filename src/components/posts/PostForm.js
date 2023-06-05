import { useState, useContext } from "react"
import BlogContext from "../../store/blog-context"
import classes from '../posts/PostForm.module.css'
import Card from "../UI/Card"

const isNotEmpty = (value) => value.trim() !== ''

const Form = (props) => {
    const blogCtx = useContext(BlogContext)
    const {isEditing} = blogCtx
    
    const {author: ctxAuthor, title: ctxTitle, category: ctxCategory, body: ctxBody} = blogCtx.selectedPost
    const [postData, setPostData] = useState({
        author: isEditing ? ctxAuthor : '',
        title: isEditing ? ctxTitle : '',
        category: isEditing ? ctxCategory : '',
        body: isEditing ? ctxBody : ''
    })
   
    const [formInputsValidity, setFormInputsValidity] = useState({
        author: true,
        title: true,
        category: true,
        body: true
    })

    const authorInputIsValid = isNotEmpty(postData.author)
    const titleInputIsValid = isNotEmpty(postData.title)
    const categoryInputIsValid = isNotEmpty(postData.category)
    const bodyInputIsValid = isNotEmpty(postData.body)

    const submitForm = (e) => {
        e.preventDefault()

        setFormInputsValidity({
            author: authorInputIsValid,
            title: titleInputIsValid,
            category: categoryInputIsValid,
            body: bodyInputIsValid
        })

        const formIsValid = authorInputIsValid && titleInputIsValid && categoryInputIsValid && bodyInputIsValid

        if(!formIsValid) {
            return
        }

        if(isEditing) {
            props.onEdit(postData)
            blogCtx.changeIsEditing()
        }
        if(!isEditing) {
            props.sendNewPostData(postData)
        }
    }

    return (
        <>
        <h1>{isEditing ? 'Edit your post' : 'Create your post'}</h1>
        <Card>
            <form onSubmit={submitForm}>
                <div className={classes.control}>
                    <label htmlFor="author">Author Name</label>
                    <input id="author" type="text" value={postData.author} onChange={(e) => setPostData({...postData, author: e.target.value})} />
                    {!formInputsValidity.author && <p className={classes.error}>Please enter author name!</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="title">Post Title</label>
                    <input id="title" type="text" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                    {!formInputsValidity.title && <p className={classes.error}>Please enter a post title!</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="category">Post Category</label>
                    <input id="category" type="text" value={postData.category} onChange={(e) => setPostData({...postData, category: e.target.value})}/>
                    {!formInputsValidity.category && <p className={classes.error}>Please enter a post category!</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="body">Post Body</label>
                    <textarea id="body" type="text" rows='5' value={postData.body} onChange={(e) => setPostData({...postData, body: e.target.value})}></textarea>
                    {!formInputsValidity.body && <p className={classes.error}>Please enter a post body!</p>}
                </div>
                <div className={classes.actions}>
                    <button type='submit'>{blogCtx.isEditing ? 'Edit' : 'Submit'}</button>
                </div>
            </form>
        </Card>
        </>
    )
}
export default Form