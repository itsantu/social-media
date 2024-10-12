import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCommentContext } from "./useCommentContext";
import { usePostListContext } from "./usePostListContext";

export const useComment = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCommentContext();
  const { dispatch: postDispatch } = usePostListContext();
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [addReplyLoading, setAddReplyLoading] = useState(false);
  const [deleteReplyLoading, setDeleteReplyLoading] = useState(false);

  const addComment = async ({ postId, username, comment }) => {
    setAddCommentLoading(true);
    setCommentError(null);
    if (!comment) {
      setCommentError("Kuch soch ke daal vai!"); // Display error if comment is empty
      return;
    }

    try {
      const response = await axios.post(
        `https://social-media-fxfa.onrender.com/api/feed/comments/add-comment/${postId}`,
        {
          username,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 || response.status < 300) {
        dispatch({ type: "ADD_COMMENT", payload: response.data.newComment });
        postDispatch({ type: "INC_COMMENT_COUNT", payload: { _id: postId } });
      } else {
        setCommentError(response.data.error);
      }
      setAddCommentLoading(false);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    } finally {
      setAddCommentLoading(false);
    }
  };

  const deleteComment = async ({ commentId, postId, decrementValue }) => {
    setDeleteCommentLoading(true);
    setCommentError(null);
    try {
      const response = await axios.delete(
        `https://social-media-fxfa.onrender.com/api/feed/comments/delete-comment?id=${commentId}&postId=${postId}&decrementValue=${decrementValue}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({ type: "DELETE_COMMENT", payload: { _id: commentId } });
        postDispatch({
          type: "DEC_COMMENT_COUNT",
          payload: { _id: postId, decrementValue },
        });
      } else {
        setCommentError(response.data.error);
      }
      setDeleteCommentLoading(false);
    } catch (error) {
      setDeleteCommentLoading(false);
      setCommentError(error.message);
    }
  };

  const addReply = async ({ commentId, comment, postId }) => {
    setAddReplyLoading(true);
    setCommentError(null);
    if (!comment) {
      setCommentError("Kuch soch ke daal vai!"); // Display error if comment is empty
      return;
    }

    try {
      const response = await axios.post(
        `https://social-media-fxfa.onrender.com/api/feed/comments/add-reply/${commentId}`,
        {
          username: user.uname,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 || response.status < 300) {
        dispatch({
          type: "ADD_REPLY",
          payload: {
            _id: commentId,
            replies: response.data.updatedComment.replies,
          },
        });
        postDispatch({ type: "INC_COMMENT_COUNT", payload: { _id: postId } });
      } else {
        setCommentError(response.data.error);
      }
      setAddReplyLoading(false);
    } catch (error) {
      console.error("Error adding reply:", error.message);
    } finally {
      setAddReplyLoading(false);
    }
  };

  const deleteReply = async ({ commentId, replyId, postId }) => {
    setDeleteReplyLoading(true);
    setCommentError(null);

    try {
      const response = await axios.delete(
        `https://social-media-fxfa.onrender.com/api/feed/comments/delete-reply/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            replyid: replyId,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: "DELETE_REPLY",
          payload: {
            _id: commentId,
            replyId,
          },
        });
        postDispatch({
          type: "DEC_COMMENT_COUNT",
          payload: { _id: postId, decrementValue: 1 },
        });
      } else {
        setCommentError(response.data.error);
      }
      setDeleteReplyLoading(false);
    } catch (error) {
      setDeleteReplyLoading(false);
      setCommentError(error.message);
    }
  };

  return {
    addComment,
    addCommentLoading,
    commentError,
    deleteComment,
    deleteCommentLoading,
    addReply,
    addReplyLoading,
    deleteReply,
    deleteReplyLoading,
  };
};
