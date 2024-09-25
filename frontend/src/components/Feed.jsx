import { MdDelete } from "react-icons/md";
import { FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import { usePostListContext } from "../../hooks/usePostListContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLikePost } from "../../hooks/useLikePost";

const Feed = ({ post }) => {
  const { user } = useAuthContext();
  const { dispatch } = usePostListContext();
  const [isDeleting, setIsDeleting] = useState(null);
  const [hasLiked, setHasLiked] = useState(post.likedBy[user.uname]);
  const [likesCount, setLikesCount] = useState(
    Object.keys(post.likedBy).length
  );
  const { likePost, likeError, likeLoading } = useLikePost();

  const handleClick = async () => {
    setIsDeleting(true);
    const response = await fetch(
      "https://social-media-fxfa.onrender.com/api/feed/" + post._id,
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
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  const handleLike = async () => {
    try {
      const result = await likePost({ postId: post._id, token: user.token });
      console.log(result);
      if (!likeError) {
        const { likeResponse, likeCount } = result;
        setHasLiked(likeResponse);
        setLikesCount(likeCount);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="border-2 border-slate-200 rounded-lg overflow-hidden shadow-xl p-3">
      <div className="flex items-center justify-between">
        <p className="text-gray-700 my-2">@{post.createdBy.username}</p>
        {user.uname === post.createdBy.username && (
          <Link to="/update" state={post}>
            <FaRegEdit className="text-xl cursor-pointer" />
          </Link>
        )}
      </div>
      <div className="w-full text-center">
        <LazyLoadImage
          src={post.imageUrl}
          alt={post.title}
          effect="blur"
          className="w-full max-h-[450px] md:h-64 object-cover rounded-md select-none"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="mt-2">{post.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <div
          className="flex gap-1 items-center text-md mr-3 rounded-md cursor-pointer"
          aria-disabled={likeLoading}
          onClick={handleLike}
        >
          {!likeLoading && !hasLiked && <FaRegHeart className="text-xl" />} 
          {likeLoading && <FaRegHeart className="text-xl text-gray-400"/>}
          {!likeLoading && hasLiked && <FaHeart className="text-xl text-red-500" />} {likesCount}
        </div>
        {user.uname === post.createdBy.username && (
          <div
            onClick={handleClick}
            className="delete-btn flex justify-center items-center cursor-pointer bg-red-500 hover:bg-red-700 duration-150 p-2 rounded-lg text-2xl text-white"
          >
            <MdDelete />
          </div>
        )}
      </div>
      {/* {user.uname === post.createdBy.username && (
        <div
          onClick={handleClick}
          className="delete-btn flex justify-center items-center cursor-pointer bg-red-500 hover:bg-red-700 duration-150 p-2 rounded-lg text-2xl text-white"
        >
          <MdDelete />
        </div>
      )} */}
      {isDeleting && <div className="mt-4 text-red-500">Deleting post...</div>}
    </div>
  );
};

export default Feed;
