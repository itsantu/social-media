import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { usePostListContext } from "../../hooks/usePostListContext";
import { Link } from "react-router-dom";

const Feed = ({ post }) => {
  const { dispatch } = usePostListContext();
  const handleClick = async () => {
    const response = await fetch("http://localhost:8000/api/feed/" + post._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-xl p-3">
      <div className="flex items-center justify-between">
        <p className="text-gray-700 my-2">@{post.createdAt}</p>
        <Link to="/update" state={post}>
          <FaRegEdit className="text-xl cursor-pointer" />
        </Link>
      </div>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="mt-2">{post.description}</p>
      </div>
      <div
        onClick={handleClick}
        className="delete-btn flex justify-center items-center cursor-pointer bg-red-500 hover:bg-red-700 duration-150 p-2 rounded-lg text-2xl hover:text-3xl text-white"
      >
        <MdDelete />
      </div>
    </div>
  );
};

export default Feed;
