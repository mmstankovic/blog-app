import classes from "./HighLightedPost.module.css";
import { useContext, Fragment } from 'react'
import { Link } from "react-router-dom";
import BlogContext from "../../store/blog-context";
import Card from "../UI/Card";

const HighLightedPost = () => {
  const blogCtx = useContext(BlogContext)

  return (
    <Fragment>
      <div className={classes['overview-link']}>
        <Link to='/blogs'>Back to overview</Link>
      </div>
      <Card>
        <div className={classes["highlighted-post"]}>
          <div>{blogCtx.selectedPost.category}</div>
          <h1>{blogCtx.selectedPost.title}</h1>
          <div>By: <span>{blogCtx.selectedPost.author}</span> | On: 6th October 2019 | 5minutes Read</div>
          <div>
            <img
              src={`http://localhost:3000/assets/images/${blogCtx.selectedPost.image}`}
              alt="card__image"
              className={classes["highlighted-image"]}
            />
          </div>
          <div className={classes.body}> {blogCtx.selectedPost.body}</div>
        </div>
      </Card>
    </Fragment>
  );
};
export default HighLightedPost;
