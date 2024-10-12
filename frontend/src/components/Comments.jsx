import { formatDistanceToNowStrict, set } from "date-fns";
import React, { useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useComment } from "../../hooks/useComment";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import Replies from "./Replies";
import { useAuthContext } from "../../hooks/useAuthContext";

function Comments({ comment }) {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
  const [showReply, setShowReply] = useState(false);
  const {
    deleteComment,
    deleteCommentLoading,
    commentError,
    addReply,
    addReplyLoading,
  } = useComment();
  const [isError, setIsError] = useState(null);
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [replyValue, setReplyValue] = useState("");

  const handleDeleteComment = async () => {
    await deleteComment({
      commentId: comment._id,
      postId: comment.postId,
      decrementValue: comment.replies.length + 1,
    });
    if (commentError) {
      setTimeout(() => {
        setIsError(true);
      }, 1500);
      setIsError(false);
    }
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    await addReply({
      commentId: comment._id,
      comment: replyValue,
      postId: comment.postId,
    });
    if (!commentError) {
      setReplyValue("");
      setIsOpenReply(false);
      setShowReply(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="mb-4">
      <div className="w-full flex justify-between">
        <div className={` py-1`}>
          <h3
            className={`${
              mode === "dark" ? "text-gray-200" : "text-black"
            } font-semibold  mb-1`}
          >
            @{comment.username}
          </h3>
          <p
            className={`${deleteCommentLoading && "text-gray-500"} ${
              mode === "dark" ? "text-white" : "text-black"
            }  text-sm pl-1`}
          >
            {comment.comment}
          </p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-[12px] min-w-16 text-gray-400 text-end">
            {formatDistanceToNowStrict(new Date(comment.createdAt))}
          </p>
          {comment.username === user.uname && (
            <div
              onClick={handleDeleteComment}
              className="cursor-pointer hover:bg-gray-600 p-1 rounded-md duration-100"
            >
              <RiDeleteBinLine />
            </div>
          )}
        </div>
      </div>

        {deleteCommentLoading && <div className="text-[10px] text-red-500 mt-1">Deleting...</div>}
      {/* Reply Section */}

      <div className="pl-3 mt-2 mb-2">
        <p
          className="text-sm text-gray-400"
          onClick={() => setIsOpenReply((prev) => !prev)}
        >
          Reply
        </p>
        {isOpenReply && (
          <div>
            <form className="flex mt-2 sticky top-0">
              <input
                type="text"
                className={`w-full p-1 px-2 rounded ${
                  mode === "dark" && "bg-gray-700 text-gray-200"
                }`}
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
                placeholder={`Reply to ${comment.username}...`}
                required
              />
              <button
                onClick={(e) => handleAddReply(e)}
                className="ml-2 px-2 sm:px-3 py-1 bg-cyan-600 text-white text-xl rounded cursor-pointer"
              >
                <IoMdSend />
              </button>
            </form>
            {addReplyLoading && (
              <p className="text-[8px] text-gray-400">Adding reply...</p>
            )}
            <p
              className="mt-2 text-sm text-gray-400"
              onClick={() => setIsOpenReply(false)}
            >
              Cancel
            </p>
          </div>
        )}
      </div>

      {comment.replies?.length > 0 && !showReply ? (
        <div onClick={() => setShowReply(true)}>
          <p className="text-sm text-gray-500 pl-4 cursor-pointer">
            Show {comment.replies.length > 1 ? "replies" : "reply"}
          </p>
        </div>
      ) : (
        showReply && (
          <div>
            {comment.replies.map((reply, index) => (
              <Replies
                reply={reply}
                commentId={comment._id}
                postId={comment.postId}
                key={index}
              />
            ))}
            <p
              onClick={() => setShowReply(false)}
              className="text-sm text-gray-400 pl-4 cursor-pointer mt-1"
            >
              Hide replies
            </p>
          </div>
        )
      )}
      {isError && (
        <div className="text-[8px] text-red-600">Some error occured.</div>
      )}
      <hr className="border-t-1 border-gray-300 my-4 w-full" />
    </div>
  );
}

export default Comments;
