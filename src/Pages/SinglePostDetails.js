import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePostDetails = () => {
    //catching dynamic id
    const { id } = useParams();

    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})

    //loading user comments
    useEffect(() => {
        fetch(`http://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data))
    }, [id])

    //loading posts
    useEffect(() => {
        fetch(`http://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])

    return (
        <div className="pt-24 px-8">
            <div>
                <h4 className="uppercase text-sm font-bold">Post ID: {post.id}</h4>
                <h4 className="text-sm capitalize"><span className='font-bold'>Title</span>: {post.title}</h4>
                <h4 className="italic">{post.body}</h4>
            </div>
            <h1 className="text-center font-bold border-b-2 border-gray-300 pt-16 pb-4">All Comments</h1>
            {comments.map(comment => (
                <div className="shadow-md p-4 cursor-pointer">
                    <h4 className="text-sm"><span className="font-bold">Comments By - </span>{comment.name}</h4>
                    <h4 className="text-sm"><span className="font-bold">Email</span> :{comment.email}</h4>
                    <h4 className="italic">{comment.body}</h4>
                </div>
            ))}
        </div>
    );
};

export default SinglePostDetails;