import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import {useDispatch} from "react-redux";
import Api from "../../api/Api";
import {getCommentOfIdea} from "../../app/reducers/ideasSlice";
import {useState} from "react";

const EditComments = ({comment, ideaId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [content, setContent] = useState()
    const [error, setError] = useState({})
    const dispatch = useDispatch()
    const toast = useToast()
    // Methods
    const handleEditComments = async () => {
        Api().put(`users/comments/${comment.id}`, {content})
            .then((response) => {
                toast({
                    'title': 'Notification',
                    'description': response.data,
                    'status': 'success',
                    'duration': 9000,
                    'isClosable': true,
                    'position': "top-right",
                })
                dispatch(getCommentOfIdea(ideaId)) // Update list of comment of idea
                onClose()// close dialog
            }).catch((error) => {
            toast({
                'title': 'Notification',
                'description': "Error for update your comment!",
                'status': 'error',
                'duration': 9000,
                'isClosable': true,
                'position': "top-right",
            })
            if (error.response.status === 422) {
                setError(error.response.data)
            }
        })
    }
    const changeContentInput = (event) => {
        setContent(event.target.value)
    }

    return (
        <>
            <Button onClick={onOpen} m={3} colorScheme={'facebook'}>Edit</Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit comment</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {/* input content  */}
                        <FormControl>
                            <FormLabel>Enter your content</FormLabel>
                        </FormControl>
                        <Textarea
                            value={content}
                            onChange={changeContentInput}
                            placeholder='Here is a sample placeholder'
                            size='sm'
                        />
                        <Text fontSize={'small'} color={'red'}>{error && error?.content}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={handleEditComments} variant='ghost'>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default EditComments