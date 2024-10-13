import { FaRegHeart, FaRegComment } from "react-icons/fa";

const FetchPost = () => {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full p-3 shadow-2xl animate-pulse">
            <div className="py-2">
              <div className="w-24 h-4 bg-gray-500"></div>
            </div>
            <div className="bg-gray-500 flex space-x-4 h-96 md:h-80 w-full rounded-md"></div>
            <div className="py-3">
              <div className="w-1/2 h-6 bg-gray-500"></div>
            </div>
            <div className="py-2">
              <div className="w-full h-4 bg-gray-500"></div>
            </div>
            <div className="flex gap-3 text-2xl py-2">
              <div className="flex gap-2 items-center">
                <FaRegHeart />
                <div className="w-5 h-full bg-gray-500"></div>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegComment />
                <div className="w-5 h-full bg-gray-500"></div>
              </div>
            </div>
            <div className="py-2">
              <div className="w-24 h-3 bg-gray-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchPost;
