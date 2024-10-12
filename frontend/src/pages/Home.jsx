import React, { useState } from "react";
import { usePostListContext } from "../../hooks/usePostListContext";
import Feed from "../components/Feed";
import EmptyFeed from "../components/EmptyFeed";
import FetchPost from "../components/FetchPost";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useCommentContext } from "../../hooks/useCommentContext";
import CommentModal from "../components/CommentModal";

const Home = () => {
  const { mode } = useThemeContext();
  const { posts, fetching } = usePostListContext();
  const { isOpen } = useCommentContext();
  // const [showLikedBy, setShowLikedBy] = useState(false);
  return (
    <div
      className={`relative container mx-auto p-4 md:w-[500px] overflow-x-hidden ${
        mode == "dark" && " text-white"
      } `}
    >
      {fetching ? (
        <FetchPost />
      ) : !fetching && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Feed key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyFeed />
      )}
      {isOpen && <CommentModal/>}
    </div>
  );
};

export default Home;
