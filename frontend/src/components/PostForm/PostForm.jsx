import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { usePostListContext } from "../../../hooks/usePostListContext";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { toast } from "react-toastify";

const PostForm = () => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
  const { dispatch } = usePostListContext();
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // State for preview
  const [privatePost, setPrivatePost] = useState(false); // Visibility state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate preview URL using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("privatePost", privatePost); // Append visibility status

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      dispatch({
        type: "CREATE_POST",
        payload: { ...result, createdBy: { username: user.uname } },
      });
      setFetching(false);
      toast.success("Post created successfully");
      setError("");
      navigate("/");
    } catch (err) {
      setFetching(false);
      setError("Failed to create post");
      setSuccess("");
    }
  };

  return (
    <div
      className={`container mx-auto w-[85%] p-5 max-w-[600px] rounded-xl m-5 ${
        mode === "dark" && "bg-gray-800"
      }`}
    >
      <h2
        className={`text-3xl font-semibold my-5 ${
          mode === "dark" && "text-gray-200"
        }`}
      >
        Upload Post
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            className={`block ${
              mode === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Image
          </label>
          {!preview && (
            <input
              type="file"
              onChange={handleImageChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                mode === "dark" && "text-gray-200"
              }`}
              required
              accept="image/*"
            />
          )}
        </div>
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-64 object-contain mb-3 rounded-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="bg-red-500  text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove Image
            </button>
          </div>
        )}

        <div className="mb-4">
          <label
            className={`block mb-2 ${
              mode === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Visibility
          </label>
          <div className="flex flex-col">
            <label className="inline-flex items-center mb-2">
              <input
                type="radio"
                value="false"
                checked={!privatePost}
                onChange={() => setPrivatePost(false)}
                className="form-radio text-blue-600"
              />
              <span className={`text-sm md:text-[1rem] ml-2 ${mode === "dark" && "text-gray-400"}`}>
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
              <span className={`text-sm md:text-[1rem] ml-2 ${mode === "dark" && "text-gray-400"}`}>
                Only Hello World members can see the post
              </span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label
            className={`block ${
              mode === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Title <span className="text-sm text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded ${
              mode === "dark" && "bg-gray-700 text-gray-200"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block ${
              mode === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Description <span className="text-sm text-gray-500">(Optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            className={`w-full p-2 border border-gray-300 rounded ${
              mode === "dark" && "bg-gray-700 text-gray-200"
            }`}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`${
            !fetching
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "bg-blue-800 text-gray-300"
          }  duration-150 p-3 w-full rounded-md`}
          disabled={fetching}
        >
          {!fetching ? "Upload" : "Uploading..."}
        </button>
        {fetching && (
          <div className="mt-4 text-green-600">Uploading your post 😀</div>
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </form>
    </div>
  );
};

export default PostForm;
