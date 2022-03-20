import {
    Box,
    Button,
    ButtonGroup,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    StackDivider,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";

import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../api/Api";

// Init state
const initInputState = {
    name: '', description: ''
}

const CategoryDetail = () => {
    const [{name, description}, setInputState] = useState(initInputState)
    const {categoryId} = useParams()
    const [category, setCategory] = useState({})
    const [responseStatus, setResponseStatus] = useState(0);
    const toast = useToast()
    const [error, setError] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate()

    const onChangeInput = (e) => {
        // console.log(e.target.name)
        let {name, value} = e.target

        // Delete each error with input name
        if (name) {
            setError((prevState => ({
                ...prevState, [name]: ''
            })))
        }
        // Set new state for each input
        setInputState((prevState => ({
            ...prevState, [name]: value
        })))
    }

    // Reset input state
    const resetStateInput = () => {
        setInputState({...initInputState})
        setError({})
    }

    const fetchCategory = async () => {
        try {
            const res = await Api().get(`categories/${categoryId}`)
            setCategory(res.data)
            setResponseStatus(0)
        } catch (e) {
            console.log('error category', e);
            if (e) {
                if (e?.response.status === 404) {
                    setResponseStatus(404)
                    toast({
                        title: `Category not found`, position: 'top-right', isClosable: true,
                    })
                    navigate(-1);
                }
            }
        }
    }

    // Update category
    const handleUpdateCategory = async () => {
        try {
            let formData = {name, description}
            const res = await Api().put(`qa-managers/categories/${categoryId}`, formData);
            if (res) {
                toast({
                    title: `Update category success`,
                    status: 'success',
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                setError({})
                await fetchCategory()
            }
        } catch (e) {
            if (e) {
                if (e.response.status === 422) {
                    setError(e.response.data)
                }
            }
        }
    }
    const handleDeleteCategory = async () => {
        try {
            const res = await Api().delete(`qa-managers/categories/${categoryId}`)
            toast({
                title: res.data, status: 'success', variant: 'top-accent', position: 'top-right', isClosable: true,
            })
            // navigate to category page after 2 seconds
            onClose(); // close modal
            navigate('/qa-managers/categories', 2000);
        } catch (e) {
            if (e) {
                toast({
                    title: e.response.data,
                    status: 'error',
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
            }
            onClose(); // close modal
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [categoryId])

    return (<>
        <Center>
            {(responseStatus === 404) ? 'Not found category' : (<>
                <VStack
                    boxShadow='inner' m={5} p='6' rounded='md' bg='gray.100'
                    divider={<StackDivider borderColor='gray.200'/>}
                    spacing={4}
                    align='stretch'
                >
                    <Box h='40px'>
                        Detail Category
                    </Box>
                    <Box h='40px'>
                        Name: {category && category.name}
                    </Box>
                    <Box h='40px'>
                        Description: {category && category.description}
                    </Box>
                </VStack>


                <Box
                    w='50%'
                    boxShadow={'inner'}
                    p={'6'}
                    m={'5'}
                    rounded={'md'}
                    bg={'facebook.50'}
                >
                    <Heading size={'md'}>Modify this category</Heading>
                    <FormControl>
                        <FormLabel htmlFor='name'>Category Name</FormLabel>
                        <Input onChange={onChangeInput} id='name' name='name' value={name} type='text'/>
                        <FormHelperText textAlign={'left'} color={'red.500'}>{error && error?.name}</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='description'>Description</FormLabel>
                        <Input onChange={onChangeInput} value={description} id='description' name='description'
                               type='text'/>
                        <FormHelperText textAlign={'left'}
                                        color={'red.500'}>{error && error?.description}</FormHelperText>
                    </FormControl>

                    <ButtonGroup mt={5}>
                        <Button onClick={resetStateInput} colorScheme='twitter'>Clear input</Button>
                        <Button onClick={handleUpdateCategory} colorScheme='messenger'>Update</Button>
                        <Button onClick={onOpen} colorScheme={'red'}>Delete this category</Button>
                    </ButtonGroup>


                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Are your sure delete this category?</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                Click yes if you want to delete!
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleDeleteCategory} colorScheme='whatsapp'
                                        variant='ghost'>Yes</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </>)}
        </Center>
    </>)
}

export default CategoryDetail