import { Link } from "react-router-dom"
import classes from './NoPostsFound.module.css'

const NoPostsFound = () => {
    return (
        <div className={classes['noposts']}>
            <p>No Posts Found!</p>
            <Link to='/new-blog'>Add a Post</Link>
        </div>
    )
}
export default NoPostsFound