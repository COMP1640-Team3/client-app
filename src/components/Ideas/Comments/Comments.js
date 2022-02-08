import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderedList } from "@chakra-ui/react";
import {
  commentIdeaSelector,
  getCommentOfIdea,
} from "../../../app/reducers/ideasSlice";
import Comment from "./Comment";

const Comments = ({ ideaId }) => {
  // const [comments, setComments] = useState();
  const comments = useSelector(commentIdeaSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentOfIdea(ideaId));
  }, [dispatch, ideaId]);

  return (
    <>
      List Comment
      <OrderedList>
        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </OrderedList>
    </>
  );
};

export default Comments;
