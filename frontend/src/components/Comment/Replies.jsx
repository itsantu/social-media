import { useThemeContext } from "../../../hooks/useThemeContext";
import { useComment } from "../../../hooks/useComment";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { formatDistanceToNowStrict } from "date-fns";
import { RiDeleteBinLine } from "react-icons/ri";

const Replies = ({ reply, commentId, postId }) => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
  const { deleteReply, deleteReplyLoading, commentError } = useComment();

  const handleDeleteReply = async () => {
    await deleteReply({ commentId, replyId: reply._id, postId });
  };

  return (
    <div className="pl-4 mb-2 mt-1">
      <div className=" flex justify-between text-sm text-white">
        <div>
          <p
            className={`${
              mode === "dark" ? "text-white" : "text-black"
            } font-semibold`}
          >
            @{reply.username}
          </p>
          <p
            className={`${
              mode === "dark" ? "text-white" : "text-black"
            } pl-4 pr-1 pt-1 text-[14px]`}
          >
            {reply.comment}
          </p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-[12px] min-w-16 text-gray-400 text-end">
            {formatDistanceToNowStrict(new Date(reply.createdAt))}
          </p>
          {reply.username === user.uname && (
            <div
              onClick={handleDeleteReply}
              className="cursor-pointer text-[12px] hover:bg-gray-600 p-1 rounded-md duration-100"
            >
              <RiDeleteBinLine />
            </div>
          )}
        </div>
      </div>
      {deleteReplyLoading && (
        <div className="text-[10px] text-red-500">Deleting...</div>
      )}
      {commentError && (
        <div className="text-[10px] text-red-500">Some error occured</div>
      )}
    </div>
  );
};

export default Replies;
