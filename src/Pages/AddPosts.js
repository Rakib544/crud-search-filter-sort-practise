import React, { useContext, useState } from "react";
import { UserContext } from "../App.js";

const AddPosts = () => {
  const [posts, setPosts] = useContext(UserContext);
  const [updatedInfo, setUpdatedInfo] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    setUpdatedInfo({
      ...updatedInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, updatedInfo]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full md:w-9/12 lg:w-1/2">
        <input
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="title"
          className="w-full rounded-full mb-4 py-3 px-8 ring-0 focus:outline-none border border-gray-700"
        />
        <input
          name="body"
          onChange={handleChange}
          type="text"
          placeholder="body"
          className="w-full rounded-full mb-4 py-3 px-8 ring-0 focus:outline-none border border-gray-700"
        />
        <button type="submit" className="btn">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPosts;
