import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {VStack} from "@chakra-ui/react";
import {commentIdeaSelector, getCommentOfIdea,} from "../../../app/reducers/ideasSlice";
import Comment from "./Comment";

const Comments = ({ideaId, currentUser}) => {
    const comments = useSelector(commentIdeaSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommentOfIdea(ideaId));
    }, [dispatch, ideaId]);

    return (
        <>
            List Comment
            <VStack>
                {comments.map((comment, index) => (
                    <Comment ideaId={ideaId} comment={comment} currentUser={currentUser} key={index}/>
                ))}
            </VStack>
        </>
    );
};

export default Comments;
