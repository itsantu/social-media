import { act, createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export const PostListContext = createContext();

export const PostListReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        posts: [action.payload, ...state.posts],
      };
      case "UPDATE_POST": 
        return {
          posts: state.posts.map((post) => {
            if (post._id === action.payload._id) {
              return {...post, ...action.payload}
            }
            return post
          })
        }
    case "DELETE_POST":
      return {
        posts: state.posts.filter((post) => post._id !== action.payload._id)
      }
    default:
      return state;
  }
};

export const PostListContextProvider = ({ children }) => {
  const { user } = useAuthContext()
  const [fetching, setFetching] = useState(false)
  const [state, dispatch] = useReducer(PostListReducer, {
    posts: [],
  });

  useEffect(() => {
    const fetchAllPosts = async () => {
      setFetching(true)
      try {
        const response = await fetch("https://social-media-fxfa.onrender.com/api/feed", {
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
  }, [user]);

  return (
    <PostListContext.Provider value={{ ...state,fetching, dispatch }}>
      {children}
    </PostListContext.Provider>
  );
};
