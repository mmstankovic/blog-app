import { NavLink } from "react-router-dom"
import classes from './MainNavigation.module.css'
import BlogContext from "../../store/blog-context"
import { useContext } from "react"

const MainNavigation = () => {
    const blogCtx = useContext(BlogContext)
    const {isLoggedIn, changeIsEditing} = blogCtx

    const logoutUserHandler = () => {
        blogCtx.logout()
    }
    const changeIsEditingHandler = () => {
        changeIsEditing()
    }
    return (
        <header className={classes.header}>
            <div className={classes.logo}>React Blog App</div>
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink to='/blogs' activeClassName={classes.active}>Home</NavLink></li>
                    <li><NavLink to='/about' activeClassName={classes.active}>About</NavLink></li>
                    {!isLoggedIn && <li><NavLink to='/login' activeClassName={classes.active}>Login</NavLink></li>}
                    {isLoggedIn && <li><NavLink to='/new-blog' onClick={changeIsEditingHandler} activeClassName={classes.active}>New Post</NavLink></li>}
                    {isLoggedIn && <li><NavLink to='/blogs' onClick={logoutUserHandler}>Logout</NavLink></li>}
                </ul>
            </nav>
        </header>
    )
}
export default MainNavigation