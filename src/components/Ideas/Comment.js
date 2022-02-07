import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  Box,
} from "@chakra-ui/react";
const Comment = ({ ideaId }) => {
  const [comments, setComments] = useState();

  const handleFetchComments = async () => {
    try {
      const response = await Api().get(`/ideas/${ideaId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchComments();
  }, []);

  return (
    <>
      List Comment
      <OrderedList>
        {comments?.map((comment) => (
          <>
            <Box p="5" mb={"5"} borderWidth="1px" borderRadius="lg">
              <Text color={"red.500"} align={"left"}>
                User: {comment.user.email}
              </Text>
              <ListItem styleType={"none"} align="left" key={comment.id}>
                {comment.content}
              </ListItem>
            </Box>
          </>
        ))}
      </OrderedList>
    </>
  );
};

export default Comment;
