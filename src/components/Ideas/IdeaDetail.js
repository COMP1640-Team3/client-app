import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getDetailIdea, getTotalLike, ideaSelector, totalLikeOfIdeaSelector,} from "../../app/reducers/ideasSlice";
// Chakra UI
import {Box, Button, Heading, HStack, Text} from "@chakra-ui/react";
import Comments from "./Comments/Comments";
import PostCommentForm from "../Comments/PostCommentForm";
import LikeIdea from "../LikeIdea/LikeIdea";
import Api from "../../api/Api";
import UserEditIdeas from "../../Views/Ideas/Users/UserEditIdeas";
import UserDeleteIdeas from "../../Views/Ideas/Users/UserDeleteIdeas";

const IdeaDetail = () => {
    const {ideaId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const idea = useSelector(ideaSelector);
    const totalLikeIdea = useSelector(totalLikeOfIdeaSelector);

    const handleDownloadPDFFile = () => {
        window.open(`http://127.0.0.1:8000/api/ideas/${ideaId}/download`, '_blank').focus();
    }

    const getUserId = async () => {
        try {
            const res = await Api().get('/user')
            // console.log('userId fetch:', res.data)
            setCurrentUser(res.data)
        } catch (e) {
            console.log('Error get user id', e)
        }
    }


    useEffect(() => {
        getUserId();
        dispatch(getDetailIdea(ideaId)).unwrap().then().catch(e => navigate(-1));
        dispatch(getTotalLike(ideaId));
    }, [dispatch]);

    return (<>
        <Heading as={"h1"} size={"xl"}>
            Title: {idea?.title}
        </Heading>

        {/* Button download file */}
        <HStack>
            <Button colorScheme={'blackAlpha'} onClick={handleDownloadPDFFile}>
                Download idea as a pdf file
            </Button>
            {
                idea?.user_id === currentUser?.id && (<>
                    <UserEditIdeas ideaId={ideaId}/>
                    <UserDeleteIdeas ideaId={ideaId}/>
                </>)
            }
        </HStack>

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
                Total Like: {totalLikeIdea} <i className="far fa-thumbs-up"></i>
            </Text>
            <Text mt={2} color={"telegram.600"} align={"left"}>
                Author: {idea?.user?.email}
            </Text>
        </Box>

        {/*Like idea button*/}
        <LikeIdea ideaId={ideaId} />
        {/* form post comment  */}
        <PostCommentForm ideaId={ideaId}/>

        {/* Comments */}
        <Box>
            <Comments ideaId={ideaId} currentUser={currentUser}/>
        </Box>
    </>);
};

export default IdeaDetail;
