import classes from './Layout.module.css'
import MainNavigation from "./MainNavigation"
import Footer from './Footer'

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
            <Footer />
        </div>
    )
}
export default Layout