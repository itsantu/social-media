import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { IoMdSend } from "react-icons/io";
import Comments from "./Comments";
import { useCommentContext } from "../../../hooks/useCommentContext";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useComment } from "../../../hooks/useComment";
import FetchComments from "../Fetch/FetchComments";

function CommentModal() {
  const { mode } = useThemeContext();
  const { user } = useAuthContext();
  const { post, comments, dispatch } = useCommentContext();
  const [commentFetching, setCommentFetching] = useState(false);
  const [isError, setIsError] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const { addComment, addCommentLoading, commentError } = useComment();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getAllComments = async () => {
      setCommentFetching(true);
      try {
        const allComments = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/feed/comments/${post._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            signal,
          }
        );
        dispatch({ type: "SET_COMMENTS", payload: allComments.data });
        setCommentFetching(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("Request canceled", error.message);
          return
        } else {
          setIsError(error.message);
        }
        setCommentFetching(false);
      } finally {
        setCommentFetching(false); // Ensure fetching is stopped
      }
    };

    getAllComments();

    return () => {
      dispatch({ type: "CLEAR_COMMENTS" });
      controller.abort();
    };
  }, [post._id, user.token]);

  const handleCloseComments = () => {
    dispatch({ type: "CLOSE_COMMENTS" });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    await addComment({
      postId: post._id,
      username: user.uname,
      comment: commentValue,
    });
    setCommentValue("");
  };

  return (
    <>
      {/* Modal overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleCloseComments}
      ></div>

      {/* Modal content */}
      <div
        className={`${
          mode === "dark" ? "bg-gray-800" : "bg-gray-200"
        } fixed z-50 top-0 left-1/2 transform -translate-x-1/2 p-4 pt-10 w-full max-w-[500px]  h-screen overflow-y-auto`}
      >
        {/* Image, Title, and Description section */}
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <div className="relative w-full flex flex-col items-start md:flex md:flex-row md:items-center">
              <img
                src={post?.imageUrl}
                className="h-[30%] max-h-40 mr-3 mb-3 rounded-md"
                alt="Post"
              />
              <div>
                <h3
                  className={`${
                    mode === "dark" ? "text-white" : "text-black"
                  } font-semibold `}
                >
                  {post?.title}
                </h3>
                <p
                  className={`${
                    mode === "dark" ? "text-white" : "text-black"
                  } text-sm`}
                >
                  {post?.description}
                </p>
              </div>
            </div>
            <button
              onClick={handleCloseComments}
              className={`${
                mode === "dark" ? "text-white" : "text-black"
              } absolute top-2 right-2 border-2 border-gray-500 px-2 py-1 rounded-sm`}
            >
              X
            </button>
          </div>
          <form className="flex mt-4 sticky top-0">
            <input
              type="text"
              className={`w-full p-2 rounded ${
                mode === "dark" && "bg-gray-700 text-gray-200"
              }`}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <button
              onClick={(e) => handleAddComment(e)}
              className="ml-2 px-3 py-1 bg-blue-500 text-white text-xl rounded cursor-pointer"
            >
              <IoMdSend />
            </button>
          </form>
          {commentError && <p className="text-gray-400">{commentError}</p>}
          {addCommentLoading && (
            <p className="text-green-700">Posting your comment...</p>
          )}
        </div>

        <h2
          className={`${
            mode === "dark" ? "text-gray-200" : "text-black"
          } mt-4 mb-3 font-semibold `}
        >
          Comments
        </h2>
        {/* Scrollable Comments Section */}
        <div className="my-3 pl-2 pr-2">
          {commentFetching ? (
            <FetchComments/>
          ) : comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <Comments key={index} comment={comment} />
            ))
          ) : comments === undefined || comments.length === 0 ? (
            <p>Be the first one to comment</p>
          ) : (
            <p>Error: {isError}</p>
          )}
          {isError && <p className="text-red-500">{isError}</p>}
        </div>
      </div>
    </>
  );
}

export default CommentModal;
