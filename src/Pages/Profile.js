import React, { useContext, useState } from 'react';
import { UserContext } from '../App.js';

const Profile = () => {
  const [posts, setPosts] = useContext(UserContext)
  const [updatedInfo, setUpdatedInfo] = useState({ title: "", body: "" })

  const handleDeletePost = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    const remainingPost = posts.filter(post => post.id !== id)
    setPosts(remainingPost)
  }

  const handleUpdatePost = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: 'foo',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const handleChange = e => {
    setUpdatedInfo({
      ...updatedInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <React.Fragment>

      <form onSubmit={handleSubmit} className="pt-24">
        <input name="title" onChange={handleChange} type="text" placeholder="title" />
        <input name="body" onChange={handleChange} type="text" placeholder="body" />
        <input type="submit" value="Update" />
      </form>

      <div className="grid grid-cols-3 gap-4 pt-24 px-16 pb-8">

        {posts?.map(post => (
          <div className="shadow-md p-4">
            <div className="flex justify-end">
              <svg onClick={() => handleUpdatePost(post.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <svg onClick={() => handleDeletePost(post.id)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h4> <span className="font-bold">Post ID : </span>{post?.id}</h4>
            <h3 className="font-bold capitalize">{post.title}</h3>
            <p className="italic">{post.body}</p>
          </div>
        ))}

      </div>

    </React.Fragment>
  );
};

export default Profile;