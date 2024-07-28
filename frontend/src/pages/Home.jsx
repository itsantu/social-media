import React, { useEffect, useState } from "react";
import { usePostListContext } from "../../hooks/usePostListContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Feed from "../components/Feed";
import EmptyFeed from "../components/EmptyFeed";
import FetchPost from "../components/FetchPost";

const Home = () => {
  const { posts, dispatch } = usePostListContext();
  const [fetching, setFetching] = useState(false)
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAllPosts = async () => {
      setFetching(true)
      try {
        const response = await fetch("http://localhost:8000/api/feed", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_POSTS", payload: json });
          setFetching(false)
        }
        // console.log(response)
      } catch (err) {
        console.log(err);
        setFetching(false)
      }
    };
    if (user) {
      fetchAllPosts();
    }
  }, [dispatch, user]);

  return (
    <div className="container mx-auto p-4 overflow-x-hidden">
      {fetching ? (
        <FetchPost/>
      ) : !fetching && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
