import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext} from '../../../hooks/useAuthContext'
import { usePostListContext} from '../../../hooks/usePostListContext'
import { useThemeContext } from "../../../hooks/useThemeContext";

const EditForm = () => {
  const {user} = useAuthContext();
  const { mode } = useThemeContext();
  const {dispatch} = usePostListContext()
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state || {}; // Fallback in case post is undefined
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [privatePost, setPrivatePost] = useState(post?.privatePost); // Visibility state
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/feed/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}`
      },
      body: JSON.stringify({ title, description, privatePost }),
    });

    
    if (response.ok) {
      // Handle success (e.g., redirect or show a success message)
      dispatch({type: 'UPDATE_POST', payload: {_id:post._id, title, description, privatePost}})
      navigate("/");
      setFetching(!fetching);
    } else {
      // Handle error
      setError("Failed to Update the post");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-[600px] m-6">
      <h2 className={`text-xl md:text-3xl font-semibold mb-6 ${mode == 'dark' && "text-gray-400"}`}>Edit Post</h2>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-64 mb-6 object-cover rounded-md"
      />
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label
            className={`block mb-2 ${
              mode === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Visibility
          </label>
          <div className="flex flex-col pl-3">
            <label className="inline-flex items-center mb-2">
              <input
                type="radio"
                value="false"
                checked={!privatePost}
                onChange={() => setPrivatePost(false)}
                className="form-radio text-blue-600"
              />
              <span className={`ml-2 ${mode === "dark" && "text-gray-200"}`}>
                Everyone outside Hello World can also see the post
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="true"
                checked={privatePost}
                onChange={() => setPrivatePost(true)}
                className="form-radio text-blue-600"
              />
              <span className={`ml-2 ${mode === "dark" && "text-gray-200"}`}>
                Only Hello World members can see the post
              </span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${mode == 'dark' ? "text-white" : "text-gray-700"}`}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${mode == 'dark' ? "text-white" : "text-gray-700"}`}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={`${!fetching ? "bg-blue-500 text-white" : "bg-blue-800 text-gray-300"} p-2 rounded`}
          disabled={fetching}
        >
          {!fetching ? "Update" : "Updating your post..."}
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default EditForm;
