import classes from "./BlogItem.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import BlogContext from "../../store/blog-context";
import { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const BlogItem = (props) => {
  const categoryClasses = `${classes.tag} ${classes["tag-red"]}`;
  const blogCtx = useContext(BlogContext)
  const match = useRouteMatch()
  
  return (
    <li className={classes.card}>
        <div className={classes["card__header"]}>
          <img
            src="https://source.unsplash.com/600x400/?development,programming"
            alt="card__image"
            className={classes["card__image"]}
          />
        </div>
        <div className={classes["card__body"]}>
          <Link className={categoryClasses} to={`${match.path}/?category=${props.category}`}>{props.category}</Link>
          <h4>{props.title}</h4>
          <div>{props.body}</div>
        </div>
        <div className={classes["card__footer"]}>
          <Link className={classes.details} to={`/blogs/${props.id}`}>Read more</Link>
          {blogCtx.isLoggedIn && <div>
            <button onClick={() => props.onEdit(props.id)}><AiOutlineEdit className={classes.icons}/></button>
            <button onClick={() => props.onShow(props.id)}><AiOutlineDelete className={classes.icons}/></button>
          </div>}
        </div>
    </li>
  );
};
export default BlogItem;