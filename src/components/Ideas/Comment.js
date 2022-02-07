import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  commentIdeaSelector,
  getCommentOfIdea,
} from "../../app/reducers/ideasSlice";
const Comment = ({ ideaId }) => {
  // const [comments, setComments] = useState();
  const comments = useSelector(commentIdeaSelector);
  const dispatch = useDispatch();

  // const handleFetchComments = async () => {
  //   try {
  //     const response = await Api().get(`/ideas/${ideaId}/comments`);
  //     setComments(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getCommentOfIdea(ideaId));
  }, [dispatch]);

  return (
    <>
      List Comment
      <OrderedList>
        {comments?.data
          ? comments?.data?.map((comment) => (
              <>
                <Box p="5" mb={"5"} borderWidth="1px" borderRadius="lg">
                  <Text color={"red.500"} align={"left"}>
                    User: {comment.user.email}
                  </Text>
                  <ListItem styleType={"none"} align="left">
                    {comment.content}
                  </ListItem>
                </Box>
              </>
            ))
          : "Loading"}
      </OrderedList>
    </>
  );
};

export default Comment;
