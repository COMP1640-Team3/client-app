import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetailIdea,
  ideaSelector,
  totalLikeOfIdeaSelector,
} from "../../app/reducers/ideasSlice";
// Chakra UI
import { Box, Text, Heading } from "@chakra-ui/react";
import Comments from "./Comments/Comments";
import PostCommentForm from "../Comments/PostCommentForm";

const IdeaDetail = () => {
  const { ideaId } = useParams();
  const dispatch = useDispatch();

  const idea = useSelector(ideaSelector);
  const totalLikeIdea = useSelector(totalLikeOfIdeaSelector);

  useEffect(() => {
    dispatch(getDetailIdea(ideaId));
  }, [dispatch]);

  return (
    <div>
      <Heading as={"h1"} size={"xl"}>
        Title: {idea?.title}
      </Heading>

      <Box
        mt={5}
        p={20}
        borderWidth="1px"
        borderRadius="lg"
        borderColor="blue"
        overflow="hidden"
      >
        <Text fontSize={"xl"} as={"i"} color="gray.500">
          {idea?.content}
        </Text>
        <Text fontSize={"sm"} align={"right"} color="red.500">
          {/* Total Like: {totalLikeIdea} <i className="far fa-thumbs-up"></i> */}
        </Text>
        <Text mt={2} color={"telegram.600"} align={"left"}>
          Author: {idea?.user?.email}
        </Text>
      </Box>

      {/* form post comment  */}
      <PostCommentForm ideaId={ideaId} />

      {/* Comments */}
      <Box>
        <Comments ideaId={ideaId} />
      </Box>
    </div>
  );
};

export default IdeaDetail;
