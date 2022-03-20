import React, {useState} from "react";
import {Box, Button, FormControl, FormLabel, Textarea, useToast} from "@chakra-ui/react";
import Api from "../../api/Api";
import {useDispatch} from "react-redux";
import {getCommentOfIdea} from "../../app/reducers/ideasSlice";

const PostCommentForm = ({ideaId}) => {
    const [textComment, setTextComment] = useState("");
    const dispatch = useDispatch();
    const toast = useToast()
    const handlePostComment = async () => {
        if (textComment === "") {
            toast({
                title: 'Comment is not empty!',
                description: "Please enter your comment again!",
                position: 'top-right',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            try {
                let formData = new FormData();
                formData.append("content", textComment);
                await Api().post(`ideas/${ideaId}/comments`, formData);
                dispatch(getCommentOfIdea(ideaId));
                toast({
                    status: 'success',
                    title: 'Post comment success',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true,
                })

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
                    />
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

