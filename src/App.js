import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Layout from './components/layout/Layout';
import AddNewBlog from './pages/AddNewBlog';
import BlogDetails from './pages/BlogDetails';
import Blogs from './pages/Blogs';
import NotFound from './pages/NotFound';
import About from './pages/About'
import Login from './pages/Login';
import EditPost from './pages/EditPost';
import BlogContext from './store/blog-context';

function App() {
  const blogCtx = useContext(BlogContext)
  const {isLoggedIn} = blogCtx 
  
  return (
      <Layout>
        <Switch>
            <Route path='/' exact>
                <Redirect to='/blogs'/>
            </Route>
            <Route path='/blogs' exact>
                <Blogs />
            </Route>
            <Route path='/blogs/:postId'>
                <BlogDetails />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/login'>
                {isLoggedIn && <Redirect to='/'/>}
                {!isLoggedIn && <Login />}
            </Route>
            <Route path='/new-blog'>
                {isLoggedIn && <AddNewBlog />}
                {!isLoggedIn && <Redirect to='/login'/>}
            </Route>
            <Route path='/edit-post'>
                {isLoggedIn && <EditPost />}
                {!isLoggedIn && <Redirect to='/login'/>}
            </Route>
            <Route path='*'>
                <NotFound />
            </Route>
        </Switch>
      </Layout>
  );
}

export default App;
