import React from "react";

const FetchComments = () => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="w-full animate-pulse">
          <div className="flex items-center justify-between">
            <div className="py-2">
              <div className="w-20 h-4 bg-gray-500"></div>
            </div>
            <div className="py-2">
              <div className="w-14 h-2 bg-gray-500"></div>
            </div>
          </div>
          <div className="bg-gray-500 flex space-x-4 h-5 md:h-80 w-[90%] rounded-md"></div>
          <div className="py-3">
            <div className="text-sm text-gray-400">Reply</div>
          </div>
          <hr className="border-t-1 border-gray-300 my-3 w-full" />
        </div>
      ))}
    </div>
  );
};

export default FetchComments;
