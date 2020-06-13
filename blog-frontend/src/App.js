import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

/* Page Component */
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact/>
      <Route component={LoginPage} path={'/login'} exact/>
      <Route component={RegisterPage} path={'/register'} exact/>
      <Route component={WritePage} path={'/write'} exact/>
      <Route component={PostPage} path={'/@:username/:postId'} exact/>
     
    </>
  );
}

export default App;
