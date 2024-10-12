import { useContext } from "react";
import { CommentContext } from "../src/context/CommentContext";

export const useCommentContext = () => {
    const context = useContext(CommentContext)

    if (!context) {
        throw Error("useCommentContext must be used inside an PostListContextProvider")
    }

    return context
}