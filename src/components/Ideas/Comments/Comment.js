import React from "react";
import {Box, Text,} from "@chakra-ui/react";
import DeleteComment from "../../Comments/DeleteComment";
import EditComments from "../../Comments/EditComments";

const Comment = ({ideaId, comment, currentUser}) => {
    return (
        <>
            <Box boxShadow='base' p='6' rounded='md' bg='white' width={'100%'} p="5" mb="5" borderWidth="1px"
                 borderRadius="lg">
                <Text color={"red.500"} align={'left'}>
                    User: {comment.user.email}
                </Text>

                <Text align={'left'}>
                    {comment.content}
                </Text>

                {/*show button delete if comment belong a current user is auth*/}
                {
                    comment?.user_id === currentUser?.id && (
                        <>
                            <EditComments comment={comment} ideaId={ideaId}/>
                            <DeleteComment ideaId={ideaId} comment={comment}/>
                        </>
                    )
                }
            </Box>
        </>
    );
};

export default Comment;
