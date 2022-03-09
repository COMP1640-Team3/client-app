import Api from "../../api/Api";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import {useDispatch} from "react-redux";
import {getCommentOfIdea} from "../../app/reducers/ideasSlice";

const DeleteComment = ({ideaId, comment}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const dispatch = useDispatch()

    const handleDeleteComment = async () => {
        try {
            await Api().delete(`/users/comments/${comment.id}`);
            dispatch(getCommentOfIdea(ideaId)) // call action fetch comment idea from redux
            onClose() // close the dialog
        } catch (e) {
            console.log('Delete comment error', e)
        }
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme={'red'}>Delete</Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Notification</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Are you sure to delete this comment?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            No, close
                        </Button>
                        <Button onClick={handleDeleteComment} variant='ghost'>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteComment