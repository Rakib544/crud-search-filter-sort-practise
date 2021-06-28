import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleUserDetails = () => {
    //catching dynamic id
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const pageNumbers = [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    //loading dynamic user post
    useEffect(() => {
        fetch(`http://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [id])

    //loading dynamic user details
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(data => setUserDetails(data))
    }, [id])

    //setup pagination functionality
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users?.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="pt-24 px-12">
            <h2 className="pb-2 font-bold text-lg border-b-2 border-primary">User Details</h2>
            <div className="py-4">
                <h3><span className="font-bold">Name:</span> {userDetails.name}</h3>
                <h3><span className="font-bold">Username:</span> {userDetails.username}</h3>
                <h3><span className="font-bold">Email:</span> {userDetails.email}</h3>
                <h3><span className="font-bold">Phone:</span> {userDetails.phone}</h3>
                <h3><span className="font-bold">Website:</span> {userDetails.website}</h3>
            </div>

            <h2 className="font-bold text-lg pb-2 border-b-2 border-primary">User All Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                {currentPosts.map(post => (
                    <div className="shadow-md p-4 cursor-pointer">
                        <h4 className="text-sm"><span className="font-bold">Post Id - </span>{post.id}</h4>
                        <h3 className="font-bold text-md capitalize">{post.title}</h3>
                        <p className="italic">{post.body}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                {pageNumbers.map(pageNumber => (
                    <button className="px-4 py-2 bg-primary text-white mx-2" onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                ))}
            </div>
            
        </div>

    );
};

export default SingleUserDetails;