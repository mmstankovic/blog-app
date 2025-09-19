import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import BlogContext from "../../store/blog-context"
import classes from '../posts/PostForm.module.css'
import Card from "../UI/Card"
import BlinkingDots from '../UI/BlinkingDots'

const isNotEmpty = (value) => value.trim() !== ''

const Form = (props) => {
    const blogCtx = useContext(BlogContext)
    const { isEditing } = blogCtx

    const { author: ctxAuthor, title: ctxTitle, category: ctxCategory, body: ctxBody } = blogCtx.selectedPost
    const [postData, setPostData] = useState({
        author: isEditing ? ctxAuthor : '',
        title: isEditing ? ctxTitle : '',
        category: isEditing ? ctxCategory : '',
        image: '',
        body: isEditing ? ctxBody : ''
    })
    const [fileName, setFileName] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const [formInputsValidity, setFormInputsValidity] = useState({
        author: true,
        title: true,
        category: true,
        image: true,
        body: true
    })

    const authorInputIsValid = isNotEmpty(postData.author)
    const titleInputIsValid = isNotEmpty(postData.title)
    const categoryInputIsValid = isNotEmpty(postData.category)
    const bodyInputIsValid = isNotEmpty(postData.body)
    const fileInputIsValid = isEditing ? true : isNotEmpty(fileName)

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
        setIsUploading(true)
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            })

            const data = await res.json()

            if (!res.ok) {
                const errorMsg = (data.error && data.error.message) || data.message || 'Uploading image failed'
                throw new Error(errorMsg)
            }
            return data.secure_url
        } catch (err) {
            console.log('Cloudinary upload error: ', err.message)
            throw err
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file')
            return
        }

        setFileName(file.name)

        try {
            const imageUrl = await uploadImageToCloudinary(file)
            setPostData({ ...postData, image: imageUrl })
        } catch (err) {
            alert(`Upload failed: ${err.message}`)
        }
    }

    const submitForm = (e) => {
        e.preventDefault()

        setFormInputsValidity({
            author: authorInputIsValid,
            title: titleInputIsValid,
            category: categoryInputIsValid,
            image: fileInputIsValid,
            body: bodyInputIsValid
        })

        const formIsValid = authorInputIsValid && titleInputIsValid && categoryInputIsValid && bodyInputIsValid && fileInputIsValid

        if (!formIsValid) {
            return
        }

        if (isEditing) {
            props.onEdit(postData)
            blogCtx.changeIsEditing()
        }
        if (!isEditing) {
            props.sendNewPostData(postData)
        }
    }

    return (
        <>
            <h1 className="page-title">{isEditing ? 'Edit your post' : 'Create your post'}</h1>
            <Card>
                <form onSubmit={submitForm}>
                    <div className={classes.control}>
                        <label htmlFor="author">Author Name</label>
                        <input id="author" type="text" value={postData.author} onChange={(e) => setPostData({ ...postData, author: e.target.value })} />
                        {!formInputsValidity.author && <p className={classes.error}>Please enter author name!</p>}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="title">Post Title</label>
                        <input id="title" type="text" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        {!formInputsValidity.title && <p className={classes.error}>Please enter a post title!</p>}
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="category">Post Category</label>
                        <input id="category" type="text" value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })} />
                        {!formInputsValidity.category && <p className={classes.error}>Please enter a post category!</p>}
                    </div>
                    {!isEditing && <div className={classes.control}>
                        <label htmlFor="image">Post Image</label>
                        <div className={`${classes['custom-file-wrapper']} ${isUploading ? classes.disabled : ''}`}>
                            <label className={classes['custom-file-label']} htmlFor="file">Choose File</label>
                            <span className={classes['custom-file-name']}>{fileName ? fileName : 'No file chosen'}</span>
                        </div>
                        <input id="file" type="file" accept="image/*" onChange={handleFileChange} disabled={isUploading}/>
                        {isUploading && <p className={classes['uploading']}>Uploading file<BlinkingDots /></p>}
                        {postData.image && (
                            <div className={classes['post-image-container']}>
                                <img className={classes['post-image']} src={postData.image} alt='Preview' />
                            </div>
                        )}
                        {!formInputsValidity.image && <p className={classes.error}>Please select an image!</p>}
                    </div>}
                    <div className={classes.control}>
                        <label htmlFor="body">Post Body</label>
                        <textarea id="body" type="text" value={postData.body} onChange={(e) => setPostData({ ...postData, body: e.target.value })}></textarea>
                        {!formInputsValidity.body && <p className={classes.error}>Please enter a post body!</p>}
                    </div>
                    <div className={classes.actions}>
                        <Link to='/blogs'><button>Cancel</button></Link>
                        <button type='submit'>{blogCtx.isEditing ? 'Edit' : 'Submit'}</button>
                    </div>
                </form>
            </Card>
        </>
    )
}
export default Form