import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext} from '../../hooks/useAuthContext'

const EditForm = () => {
  const {user} = useAuthContext()
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state || {}; // Fallback in case post is undefined
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);

    const response = await fetch(`https://social-media-fxfa.onrender.com/api/feed/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}`
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      // Handle success (e.g., redirect or show a success message)
      navigate("/");
      setFetching(!fetching);
    } else {
      // Handle error
      setError("Failed to Update the post");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-[600px] m-6">
      <h2 className="text-3xl font-semibold mb-5">Edit Post</h2>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={fetching}
        >
          Update
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default EditForm;
