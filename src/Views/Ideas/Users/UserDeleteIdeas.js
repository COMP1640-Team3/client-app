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
    useToast
} from "@chakra-ui/react";
import Api from "../../../api/Api";
import {useNavigate} from "react-router-dom";

const UserDeleteIdeas = ({ideaId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate()
    const toast = useToast()

    const handleDeleteIdea = async () => {
        try {
            ideaId = Number(ideaId);
            const res = await Api().delete(`/users/ideas/${ideaId}`)
            if (res) {
                toast({
                    position: 'top-right',
                    title: 'Delete success',
                    status: 'success',
                    isClosable: true,
                })
                onClose()
                navigate('/users/ideas')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Button onClick={onOpen} colorScheme={'red'}>Delete</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Are you sure want to delete this idea</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Click agree to delete idea!
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='whatsapp' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteIdea} colorScheme={'facebook'}>Agree</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default UserDeleteIdeas