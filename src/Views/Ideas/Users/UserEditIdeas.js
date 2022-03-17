import React, {useEffect, useState} from "react";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import Api from "../../../api/Api";
import {useDispatch} from "react-redux";
import {getDetailIdea} from "../../../app/reducers/ideasSlice";

const initState = {title: '', content: '', category_id: null}
const UserEditIdeas = ({ideaId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [{title, content, category_id}, setIdea] = useState(initState)
    const [categories, setCategories] = useState([])
    const toast = useToast()
    const [error, setError] = useState({})
    // Method
    const dispatch = useDispatch()

    const fetchCategories = async () => {
        try {
            const res = await Api().get('/categories');
            // console.log(res.data)
            setCategories(res.data);
        } catch (e) {
            console.log(e)
            if (e) {
                if (e.response.status === 422) {
                    console.log(e.response.data)
                    setError(e.response.data)
                }
            }
        }
    }

    const onChange = (e) => {
        let {name, value} = e.target

        // Delete each error with input name
        if (name) {
            setError((prevState => ({
                ...prevState, [name]: ''
            })))
        }

        setIdea((prevState => ({...prevState, [name]: value})))
    }
    const resetState = () => {
        setIdea({...initState})
    }

    const handleConfirmChange = async () => {
        let formData = {title, content, category_id}
        console.log(formData)
        try {
            const res = await Api().put(`users/ideas/${ideaId}`, formData)
            console.log(res.data)
            // return;
            dispatch(getDetailIdea(ideaId))
            toast({
                title: 'Update idea success.',
                description: "OK",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            // Then close modal
            onClose()
        } catch (e) {
            if (e) {
                toast({
                    title: 'Update idea failed.',
                    description: "Please try again!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                if (e.response.status === 422) {
                    setError(e.response.data)
                }
            }
        }
    }

    useEffect(() => {
        fetchCategories().then().catch()
    }, [])

    return (
        <>
            <Button onClick={onOpen} colorScheme={'whatsapp'}>Edit</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit your idea</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Idea title</FormLabel>
                            <Input onChange={onChange} value={title} type={'text'} name='title'
                                   placeholder={'Change title here'}/>
                            <FormHelperText textAlign={'left'}
                                            color={'red.500'}>{error && error?.title}</FormHelperText>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Content</FormLabel>
                            <Textarea onChange={onChange} value={content} placeholder={'Change content here'}
                                      name={'content'}/>
                            <FormHelperText textAlign={'left'}
                                            color={'red.500'}>{error && error?.content}</FormHelperText>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='category'>Category</FormLabel>
                            <Select onChange={onChange} id='category' name='category_id' value={category_id}
                                    placeholder='Select category'>
                                {
                                    categories && categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }

                            </Select>
                            <FormHelperText textAlign={'left'}
                                            color={'red.500'}>{error && error?.category_id}</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={resetState} colorScheme={'whatsapp'}>Clear input</Button>
                        <Button onClick={handleConfirmChange} variant='ghost' colorScheme={'green'}>Confirm
                            change</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserEditIdeas