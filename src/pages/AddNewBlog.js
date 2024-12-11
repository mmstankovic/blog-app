import { useHistory } from "react-router-dom"
import { useState } from "react"
import PostForm from "../components/posts/PostForm"
import Modal from "../components/UI/Modal"

const AddNewBlog = () => {
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const [displayNotificationModal, setDisplayNotificationModal] = useState(false)

    const sendNewPostData = (postData) => {
        setIsLoading(true)
        setHttpError(null)
        fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: postData.author,
                title: postData.title,
                category: postData.category,
                image: postData.image,
                body: postData.body
            })
        })
        
        .then((res) => {
            setIsLoading(false)
            if(res.ok) {
                return res.json()
            } else {
                return res.json().then((data) => {
                    let errorMessage = 'Could not create post.'
                    if(data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage)
                })
            }
            
        })
        .then((data) => {
            console.log(data)
            if(data.title) {
                setDisplayNotificationModal(true)
            }
        })
        .catch((err) => {
            setHttpError(err.message)
        })
    }

    const modalHandler = () => {
        setDisplayNotificationModal(false)
        history.replace('/blogs')
    }

    return (
        <>
            {displayNotificationModal && <Modal title='Success!' message='You succeessfully added a new post!' onClose={modalHandler} name='Ok' />}
            <PostForm sendNewPostData={sendNewPostData} error={httpError} isLoading={isLoading}/>
        </> 
    )
}
export default AddNewBlog