import { FaTimes } from "react-icons/fa";
import { useThemeContext } from "../../hooks/useThemeContext";

const LikedByModal = ({ post, onClose }) => {
  const { mode } = useThemeContext();

  return (
    <div
      onClick={onClose} 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className={`${
          mode === "dark" ? "bg-gray-900" : "bg-white"
        }  rounded-lg shadow-lg w-2/3 md:w-1/2 p-6 relative`}
      >
        {/* Close Button */}
        <div className="text-end">
          <button onClick={onClose} className="">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Post Image */}
        <div>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-[300px] object-cover rounded-md mb-4"
          />
        </div>

        {/* Post Description */}
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="mb-4">{post.description}</p>

        {/* Liked By Users */}
        <h3 className="text-lg font-semibold mb-2 text-gray-400">Liked by:</h3>
        <ul>
          {Object.keys(post.likedBy).map((username) => (
            <li key={username} className={`${mode === "dark" ? "text-white" : "text-gray-700"} mb-1`}>
              @{username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LikedByModal;
