import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { usePostListContext } from "../../../hooks/usePostListContext";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { useCommentContext } from "../../../hooks/useCommentContext";
import { useLikePost } from "../../../hooks/useLikePost";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { formatDistanceToNowStrict } from "date-fns";

import LikedByModal from "../Modal/LikedByModal";
import { FaHeart, FaRegEdit, FaRegHeart, FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlinePublic,MdPeopleAlt  } from "react-icons/md";
import { toast } from "react-toastify";

const Feed = ({ post }) => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
  const { dispatch } = usePostListContext();
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(null);
  const [hasLiked, setHasLiked] = useState(post.likedBy[user?.uname.trim()]);
  const [likesCount, setLikesCount] = useState(
    Object.keys(post.likedBy).length
  );

  const [lineTruncate, setLineTruncate] = useState(
    post.description.length > 42
  );
  const { likePost, likeError, likeLoading } = useLikePost();

  const [deleteConfirmDialogue, setDeleteConfirmDialogue] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/feed/${post._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setIsDeleting(!isDeleting);
      toast.error("Post deleted successfully")
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  const handleClick = async () => {
    setDeleteConfirmDialogue(false);
    await handleDelete();
  };

  const handleLike = async () => {
    if(user){
      try {
        const result = await likePost({ postId: post._id, token: user.token });
        if (!likeError) {
          const { likeResponse, likeCount } = result;
          setHasLiked(likeResponse);
          setLikesCount(likeCount);
          if (hasLiked) {
            dispatch({
              type: "REMOVE_LIKE",
              payload: { _id: post._id, username: user?.uname },
            });
          } else {
            dispatch({
              type: "ADD_LIKE",
              payload: { _id: post._id, username: user?.uname },
            });
          }
        }
      } catch (error) {
        return;
      }
    } else {
      toast.error('Login to Like the post!')
    }
  };

  const [liked, setLiked] = useState(false);
  const handleDoubleClickOnImage = async () => {
    if (!hasLiked) {
      setLiked(true);
      await handleLike();
      setLiked(false);
    } else {
      setLiked(true);
      setTimeout(() => {
        setLiked(false);
      }, 1500);
    }
  };

  const { dispatch: commentDispatch } = useCommentContext();
  const handleCommentClick = () => {
    if(user){
      commentDispatch({ type: "SET_POST", payload:  post  });
      commentDispatch({ type: "OPEN_COMMENTS" });
    } else {
      navigate('/signup')
    }
  };

  const [showLikedBy, setShowLikedBy] = useState(false)
  const handleShowLikedBy = () => {
    setShowLikedBy(true); // Open the modal
  };

  const closeLikedByModal = () => {
    setShowLikedBy(false); // Close the modal
  };

  return (
    <div className="relative">
      <div className="border-1 border-slate-200 rounded-lg overflow-hidden shadow-2xl p-3 pb-2">
        <div className="flex items-center justify-between">
          <p
            className={` my-2 ${
              mode == "dark" ? "text-gray-100" : "text-gray-700"
            }`}
          >
            @{post.createdBy.username}
          </p>
          <div className="flex items-center gap-4">
          {post.privatePost ? <MdPeopleAlt className="text-xl text-gray-400" title="Member View Only"/> : <MdOutlinePublic className="text-xl text-gray-400" title="Public View"/>}
          {user?.uname === post.createdBy.username && (
            <Link to="/update" state={post}>
              <FaRegEdit className="text-xl cursor-pointer" title="Edit the post"/>
            </Link>
          )}
          </div>
        </div>
        <div className="relative w-full text-center">
          <LazyLoadImage
            src={post.imageUrl}
            alt={post.title}
            effect="blur"
            className="w-full max-h-[450px] md:h-80 object-cover rounded-md select-none cursor-pointer"
            onDoubleClick={handleDoubleClickOnImage}
            aria-label="Double tap to Like"
          />
          {liked && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2-translate-x-1/2 -translate-y-1/2 text-red-600 text-8xl">
              <FaHeart />
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p
            onClick={() => setLineTruncate(!lineTruncate)}
            className={`mt-2 ${lineTruncate && "truncate"}`}
          >
            {post.description}
          </p>
          {lineTruncate && (
            <span
              onClick={() => setLineTruncate(!lineTruncate)}
              className="text-gray-400 hover:underline hover:text-gray-600 cursor-pointer"
            >
              more
            </span>
          )}
          {/* {!lineTruncate && <span onClick={() => setLineTruncate(!lineTruncate)} className="text-gray-400 hover:underline hover:text-gray-600 cursor-pointer">see less</span>} */}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <div className="flex gap-1 items-center text-lg mr-4 rounded-md cursor-pointer">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className="ml-3 mr-1"
              >
                {!likeLoading && !hasLiked && (
                  <FaRegHeart className="text-2xl" />
                )}
                {likeLoading && (
                  <FaRegHeart className="text-2xl text-gray-400" />
                )}
                {!likeLoading && hasLiked && (
                  <FaHeart className="text-2xl text-red-500" />
                )}
              </button>{" "}
              <p onClick={handleShowLikedBy}>{likesCount}</p>
            </div>

            {/* Comment Section */}
            <div className="flex items-center text-lg cursor-pointer">
              <FaRegComment
                className="text-2xl mr-2"
                onClick={handleCommentClick}
              />
              {post.commentCount == undefined ? 0 : post.commentCount}
            </div>
          </div>

          {user?.uname === post.createdBy.username && (
            <div
              onClick={() => setDeleteConfirmDialogue(true)}
              className="delete-btn flex justify-center items-center cursor-pointer bg-red-500 hover:bg-red-700 duration-150 p-2 rounded-lg text-2xl text-white"
            >
              <MdDelete />
            </div>
          )}
        </div>
        <p className="text-[12px] text-gray-400 p-2 pb-1">
          {formatDistanceToNowStrict(new Date(post.createdAt), { addSuffix: true })}
        </p>
        {isDeleting && (
          <div className="mt-4 text-red-500">Deleting post...</div>
        )}
      </div>

      {/* Delete confirmation dialogue box */}
      {deleteConfirmDialogue && (
        <div
          className={`absolute w-2/3 md:w-1/2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 rounded-xl z-10 shadow-2xl shadow-slate-600 ${
            mode == "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <p className="mb-5">Are you sure?</p>
          <div className="flex items-center justify-between">
            <button
              className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700"
              onClick={handleClick}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-600 rounded-md hover:bg-gray-700"
              onClick={() => {
                setDeleteConfirmDialogue(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {showLikedBy && <LikedByModal post={post} onClose={closeLikedByModal} />}
    </div>
  );
};

export default Feed;
