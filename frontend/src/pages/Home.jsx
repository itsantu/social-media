import { usePostListContext } from "../../hooks/usePostListContext";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useCommentContext } from "../../hooks/useCommentContext";

import Feed from "../components/Home/Feed";
import EmptyFeed from "../components/Home/EmptyFeed";
import FetchPost from "../components/Fetch/FetchPost";
import CommentModal from "../components/Comment/CommentModal";

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
