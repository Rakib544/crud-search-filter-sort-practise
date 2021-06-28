import React, { useState } from 'react';

const UpdatePost = () => {
    const [updatedInfo, setUpdatedInfo] = useState({ title: "", body: "" })

    const handleChange = e => {
        setUpdatedInfo({
            ...updatedInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // const handleUpdatePost = id => {
    //     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //         method: 'PATCH',
    //         body: JSON.stringify({
    //             title: 'foo',
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((json) => console.log(json));
    // }

    return (
        <div>
            <form onSubmit={handleSubmit} className="pt-24">
                <input name="title" onChange={handleChange} type="text" placeholder="title" />
                <input name="body" onChange={handleChange} type="text" placeholder="body" />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdatePost;