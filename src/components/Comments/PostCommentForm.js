import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Api from "../../api/Api";
import { useDispatch } from "react-redux";
import { getCommentOfIdea } from "../../app/reducers/ideasSlice";

const PostCommentForm = ({ ideaId }) => {
  const [textComment, setTextComment] = useState("");
  const dispatch = useDispatch();

  const handlePostComment = async () => {
    if (textComment === "") {
      alert("Please input content comment");
    } else {
      try {
        let formData = new FormData();
        formData.append("content", textComment);
        await Api().post(`ideas/${ideaId}/comments`, formData);
        dispatch(getCommentOfIdea(ideaId));
        alert("Post comment success");
        setTextComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Box p="5" m={"5"} borderWidth="1px" borderRadius="lg">
        <FormControl>
          <FormLabel htmlFor="email">Enter your comment</FormLabel>
          <Textarea
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            placeholder="Write your comment"
          ></Textarea>
          <Button
            onClick={handlePostComment}
            align={"left"}
            mt={4}
            colorScheme="teal"
          >
            Post comment
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default PostCommentForm;
