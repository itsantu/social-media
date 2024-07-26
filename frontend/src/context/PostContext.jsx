import { createContext, useReducer } from "react";

export const PostListContext = createContext();

export const PostListReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        posts: [action.payload, ...state],
      };
    case "DELETE_POST":
      return {
        posts: state.posts.filter((post) => post._id !== action.payload._id)
      }
    default:
      return state;
  }
};

export const PostListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostListReducer, {
    posts: [],
  });

  return (
    <PostListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostListContext.Provider>
  );
};
