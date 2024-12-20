import classes from "./HighLightedPost.module.css";
import { useContext, Fragment } from 'react'
import { Link } from "react-router-dom";
import BlogContext from "../../store/blog-context";
import Card from "../UI/Card";

const HighLightedPost = () => {
  const blogCtx = useContext(BlogContext)

  function replaceWithBr(text) {
    return text.replace(/\n/g, "<br />")
  }

  return (
    <Fragment>
      <div className={classes['overview-link']}>
        <Link to='/blogs'>Back to overview</Link>
      </div>
      <Card className={classes["highlighted-card"]}>
        <div className={classes["highlighted-post"]}>
          <div>{blogCtx.selectedPost.category}</div>
          <h1>{blogCtx.selectedPost.title}</h1>
          <div className={classes["blog-author"]}>By: <span>{blogCtx.selectedPost.author}</span> | On: 6th October 2019 | 5minutes Read</div>
          <div>
            <img
              src={blogCtx.selectedPost.image}
              alt={blogCtx.selectedPost.title}
              className={classes["highlighted-image"]}
            />
          </div>
          <div className={classes.body} dangerouslySetInnerHTML={{__html: replaceWithBr(blogCtx.selectedPost.body)}}></div>
        </div>
      </Card>
    </Fragment>
  );
};
export default HighLightedPost;
