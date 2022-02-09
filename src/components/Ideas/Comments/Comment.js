import React from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  Box,
} from "@chakra-ui/react";
const Comment = ({ comment }) => {
  return (
    <>
      <Box p="5" mb="5" borderWidth="1px" borderRadius="lg">
        <Text color={"red.500"} align={"left"}>
          User: {comment.user.email}
        </Text>
        <ListItem styleType={"none"} align="left">
          {comment.content}
        </ListItem>
      </Box>
    </>
  );
};

export default Comment;
