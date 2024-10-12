import { createContext, useReducer } from "react";

export const CommentContext = createContext();

export const CommentReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_COMMENTS":
      return {
        ...state,
        isOpen: true,
      };
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
      };

    case "CLOSE_COMMENTS":
      return {
        ...state,
        isOpen: false,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "CLEAR_COMMENTS":
      return {
        ...state,
        comments: [],
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload._id
        ),
      };
    case "ADD_REPLY":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id
            ? { ...comment, replies: action.payload.replies }
            : comment
        ),
      };
      case "DELETE_REPLY":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload._id
            ? { ...comment, replies: comment.replies.filter((reply) => reply._id !== action.payload.replyId) }
            : comment
        ),
      };

    default:
      return state;
  }
};

export const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentReducer, {
    post: {},
    comments: [],
    isOpen: false,
  });

  return (
    <CommentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};
