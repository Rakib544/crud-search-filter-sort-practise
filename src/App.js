import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.js";
import AddPosts from './Pages/AddPosts.js';
import AllUsers from './Pages/AllUsers.js';
import Posts from './Pages/Posts.js';
import Profile from './Pages/Profile.js';
import SinglePostDetails from './Pages/SinglePostDetails.js';
import SingleUserDetails from './Pages/SingleUserDetails.js';
import UpdatePost from './Pages/UpdatePost.js';

export const UserContext = createContext()

function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=2')
      const data = await res.json()
      setPosts(data)
    }
    loadData();
  }, [])

  return (
    <UserContext.Provider value={[posts, setPosts]}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/allUsers">
            <AllUsers />
          </Route>
          <Route path="/addPosts">
            <AddPosts />
          </Route>
          <Route path="/post/:id">
            <SinglePostDetails />
          </Route>
          <Route path="/user/:id">
            <SingleUserDetails />
          </Route>
          <Route path="/update/:id">
            <UpdatePost />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
