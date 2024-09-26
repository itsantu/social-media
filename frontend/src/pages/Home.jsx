import React from "react";
import { usePostListContext } from "../../hooks/usePostListContext";
import Feed from "../components/Feed";
import EmptyFeed from "../components/EmptyFeed";
import FetchPost from "../components/FetchPost";

const Home = () => {
  const { posts, fetching } = usePostListContext();
  return (
    <div className="container mx-auto p-4 md:w-[500px] overflow-x-hidden">
      {fetching ? (
        <FetchPost/>
      ) : !fetching && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Feed key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
};

export default Home;
