import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Api from "../../api/Api";
import {getTotalLike} from "../../app/reducers/ideasSlice";
import {Button} from "@chakra-ui/react";

const LikeIdea = ({ideaId}) => {
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(false)

    const handleLikeIdea = async () => {
        try {
            await Api().post(`ideas/${ideaId}/likes`)

            // Get total like again
            dispatch(getTotalLike(ideaId));
            await checkIdeaIsLiked();

        } catch (e) {
            console.log(e)
        }
    }
    const handleUnLikeIdea = async () => {
        try {
            const res = await Api().delete(`ideas/${ideaId}/likes`)
            // console.log(res.data)

            // Get total like again
            dispatch(getTotalLike(ideaId));
            await checkIdeaIsLiked();

        } catch (e) {
            console.log(e)
        }
    }
    const checkIdeaIsLiked = async () => {
        try {
            const res = await Api().get(`/ideas/${ideaId}/like/is-exist`);
            // console.log(res.data)
            setIsLiked(res.data.isExist)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        checkIdeaIsLiked().then().catch();
    }, [])

    return (<>

        {isLiked ? (<>
            <Button onClick={handleUnLikeIdea} colorScheme='facebook' my='5' textAlign={"left"}>Unlike Idea</Button>
        </>) : (<>

            <Button onClick={handleLikeIdea} colorScheme='red' my='5' textAlign={"left"}>Like Idea</Button>
        </>)}

    </>)
}


export default LikeIdea