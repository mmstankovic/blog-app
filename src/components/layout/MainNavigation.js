import { NavLink } from "react-router-dom"
import classes from './MainNavigation.module.css'
import BlogContext from "../../store/blog-context"
import { useContext, useState } from "react"

const MainNavigation = () => {
    const blogCtx = useContext(BlogContext)
    const {isLoggedIn, changeIsEditing} = blogCtx
    const [open, setOpen] = useState(false)

    const logoutUserHandler = () => {
        blogCtx.logout()
    }
    const changeIsEditingHandler = () => {
        changeIsEditing()
    }

    const toggleMobileMenu = () => {
        setOpen((prevState) => !prevState)
    }

    const closeMenuOnMobile = () => {
        setOpen(false);
    };
    
    return (
        <header className={classes.header}>
            <div className={classes.logo}>React Blog App</div>
            <nav className={`${classes.nav} ${open ? classes.opened : ''}`}>
                <ul>
                    <li onClick={closeMenuOnMobile}><NavLink to='/blogs' activeClassName={classes.active}>Home</NavLink></li>
                    <li onClick={closeMenuOnMobile}><NavLink to='/about' activeClassName={classes.active}>About</NavLink></li>
                    {!isLoggedIn && <li onClick={closeMenuOnMobile}><NavLink to='/login' activeClassName={classes.active}>Login</NavLink></li>}
                    {isLoggedIn && <li onClick={closeMenuOnMobile}><NavLink to='/new-blog' onClick={changeIsEditingHandler} activeClassName={classes.active}>New Post</NavLink></li>}
                    {isLoggedIn && <li onClick={closeMenuOnMobile}><NavLink to='/blogs' onClick={logoutUserHandler}>Logout</NavLink></li>}
                </ul>
            </nav>
            <div className={`${classes['mobile-btn']} ${open ? classes.active : ''}`} onClick={toggleMobileMenu}>
                <span className={classes.bar}></span>
                <span className={classes.bar}></span>
                <span className={classes.bar}></span>
            </div>
        </header>
    )
}
export default MainNavigation