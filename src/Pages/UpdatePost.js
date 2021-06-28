import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';

const UpdatePost = () => {

    const { id } = useParams();

    //Get context api data
    const [posts, setPosts] = useContext(UserContext)
    // FInd the post which will be updating
    const updatingPost = posts.find(post => post.id === parseInt(id));
    //Find the index of the post which have been updated
    const updatingPostIndex = posts.findIndex(post => post.id === parseInt(id));

    const [updatedInfo, setUpdatedInfo] = useState({ title: updatingPost.title, body: updatingPost.body })

    const handleChange = e => {
        setUpdatedInfo({
            ...updatedInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPosts([
            ...posts,
            posts[updatingPostIndex].title = updatedInfo.title,
            posts[updatingPostIndex].body = updatedInfo.body
        ])
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-9/12 lg:w-1/2"
            >
                <input
                    name="title"
                    onChange={handleChange}
                    type="text"
                    placeholder="title"
                    value={updatedInfo.title}
                    className="w-full rounded-full mb-4 py-3 px-8 ring-0 focus:outline-none border border-gray-700"
                />
                <input
                    name="body"
                    onChange={handleChange}
                    type="text"
                    placeholder="body"
                    value={updatedInfo.body}
                    className="w-full rounded-full mb-4 py-3 px-8 ring-0 focus:outline-none border border-gray-700"
                />
                <button type="submit" className="btn">Update</button>
            </form>
        </div>
    );
};

export default UpdatePost;