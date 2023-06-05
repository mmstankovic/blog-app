import PostCategory from "./PostCategory"
import { useContext } from "react"
import BlogContext from "../../store/blog-context"
import classes from './PostsFilter.module.css'

const PostsFilter = (props) => {
    const blogCtx = useContext(BlogContext)
    let categories = []
    
    for(let post of blogCtx.posts) {
        let isFound = false
        for(let cat of categories) {
            if(post.category === cat.category) {
                isFound = true 
                break
            }
        }
        if(!isFound) {
            categories.push({id: post.id, category: post.category})
        } 
    }
    categories.sort((a,b) => {
        if(a.category > b.category) return 1
        if(a.category < b.category) return -1
        return 0
    })

    const availableCategories = categories.map((post, index) => <PostCategory key={index} val={post.category} name={post.category}/>)

    const dropdownHandler = (e) => {
        props.onFilter(e.target.value)
    }

    return (
        <div className={classes.filter}>
            <label>Filter by Category:</label>
            <select value={props.selCategory} onChange={dropdownHandler}>
                <option value='all'>All categories</option>
                {availableCategories}
            </select>
        </div>
    )
}
export default PostsFilter