import classes from "./BlogSummary.module.css";

const BlogSummary = () => {
  return (
    <div className={classes.summary}>
      <h1>React Blog App</h1>
      <h5>
        Want a blog app with react router ? Here is the fully workable blog app
        in which
        <br />
        we are giving add post, edit post and delete post.
      </h5>
    </div>
  );
};
export default BlogSummary;
