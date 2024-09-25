import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLikePost = () => {
  const { user } = useAuthContext();
  const [likeError, setLikeError] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);
  // const [likeResponse, setLikeResponse] = useState(false);

  const likePost = async ({ postId }) => {
    setLikeError(null);
    setLikeLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/feed/${postId}?username=${user.uname}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status >= 400) {
        setLikeError(response.data?.error);
      } else if (response.status >= 200 && response.status < 300) {
        // setLikeResponse(response?.data?.hasLiked);
        return {
          likeResponse: response.data?.hasLiked,
          likeCount: response.data?.likes,
        };
      }
    } catch (error) {
      setLikeError(error.message);
    } finally {
      setLikeLoading(false);
    }
  };

  return { likePost, likeError, likeLoading };
};
