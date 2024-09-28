import { MdDelete } from "react-icons/md";
import { FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import { usePostListContext } from "../../hooks/usePostListContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useLikePost } from "../../hooks/useLikePost";
import { useThemeContext } from "../../hooks/useThemeContext";

const Feed = ({ post }) => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext()
  const { dispatch } = usePostListContext();
  const [isDeleting, setIsDeleting] = useState(null);
  const [hasLiked, setHasLiked] = useState(post.likedBy[user.uname]);
  const [likesCount, setLikesCount] = useState(
    Object.keys(post.likedBy).length
  );

  const [lineTruncate, setLineTruncate] = useState(post.description.length > 42)
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
      if (!likeError) {
        const { likeResponse, likeCount } = result;
        setHasLiked(likeResponse);
        setLikesCount(likeCount);
      }
    } catch (error) {
      return;
    }
  };

  const [liked, setLiked] = useState(false)
  const handleDoubleClickOnImage = async () => {
    setLiked(true);
    await handleLike();
    setLiked(false);
  }

  return (
    <div className="border-1 border-slate-200 rounded-lg overflow-hidden shadow-2xl p-3">
      <div className="flex items-center justify-between">
        <p className={` my-2 ${mode == 'dark' ? "text-gray-100" : "text-gray-700"}`}>@{post.createdBy.username}</p>
        {user.uname === post.createdBy.username && (
          <Link to="/update" state={post}>
            <FaRegEdit className="text-xl cursor-pointer" />
          </Link>
        )}
      </div>
      <div className="relative w-full text-center">
        <LazyLoadImage
          src={post.imageUrl}
          alt={post.title}
          effect="blur"
          className="w-full max-h-[450px] md:h-80 object-cover rounded-md select-none"
          onDoubleClick={handleDoubleClickOnImage}
        />
        {liked && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2-translate-x-1/2 -translate-y-1/2 text-red-600 text-8xl"><FaHeart/></div>}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p onClick={() => setLineTruncate(!lineTruncate)} className={`mt-2 ${lineTruncate && "truncate"}`}>{post.description}</p>
        {lineTruncate && <span onClick={() => setLineTruncate(!lineTruncate)} className="text-gray-400 hover:underline hover:text-gray-600 cursor-pointer">more</span>}
        {/* {!lineTruncate && <span onClick={() => setLineTruncate(!lineTruncate)} className="text-gray-400 hover:underline hover:text-gray-600 cursor-pointer">see less</span>} */}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center text-lg mr-3 rounded-md cursor-pointer">
          <button onClick={handleLike} disabled={likeLoading} className="ml-3 mr-1">
            {!likeLoading && !hasLiked && <FaRegHeart className="text-2xl" />}
            {likeLoading && <FaRegHeart className="text-2xl text-gray-400" />}
            {!likeLoading && hasLiked && (
              <FaHeart className="text-2xl text-red-500" />
            )}
          </button>{" "}
          {likesCount}
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
