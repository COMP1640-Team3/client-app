import React, {useEffect, useState} from "react";
import Api from "../../../api/Api";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Checkbox,
    CloseButton,
    Flex,
    FormControl,
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
    Text,
    useDisclosure
} from "@chakra-ui/react";


const PostIdeaPDF = () => {
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState(1);
    const [content, setContent] = useState("No content");
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isHiddenPost, setIsHiddenPost] = useState(false);
    const [resStatus, setResStatus] = useState(null);
    const [error, setError] = useState({});
    const {isOpen, onOpen, onClose} = useDisclosure();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    // const removeSelectedFile = async () => {
    //   setSelectedFile({})
    //   console.log('after remove', selectedFile)
    //   setIsFilePicked(false)
    // }

    const openSelectFile = () => {
        document.getElementById('filePDF').click();
    }

    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category_id", categoryId);
        formData.append("content", content)
        formData.append('is_hidden', Number(isHiddenPost))
        formData.append('file', selectedFile);
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        // return;
        try {
            await Api().post(`/staffs/ideas`, formData)
            setResStatus(201)
            setTitle('')
            setCategoryId(1)
            onClose()
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response);
                setError(error.response.data.errors);
                setResStatus(422);
            } else if (error.response.status === 403) {
                alert('You are not allowed!')
            }
            onClose() // close modal
        }
    };

    const handleFetchCategories = async () => {
        try {
            const res = await Api().get(`/categories`);
            setCategories(res.data);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        handleFetchCategories();
    }, []);

    return (<>
        <Box>
            <FormControl isRequired>
                <FormLabel>Title idea</FormLabel>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    type="text"
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="country">Category</FormLabel>
                <Select
                    id="category"
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                    }}
                    placeholder="Select category"
                >
                    {categories.map((e) => {
                        return (<option key={e.id} value={e.id}>
                            {e.name}
                        </option>);
                    })}
                </Select>
            </FormControl>
            <FormControl isRequired>
                <Input type='file' id='filePDF' display='none' onChange={changeHandler}/>
            </FormControl>

            {(isFilePicked && selectedFile) ? (<div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
                {/* <Button onClick={removeSelectedFile}>Remove file</Button> */}
            </div>) : (<p>Select a file to show details</p>)}
            <FormControl mt='2'>
                {isHiddenPost ? <Text color='red.500'>This post will hidden</Text> :
                    <Text color='green.500'>This post will visible</Text>}
                <div></div>
                <Checkbox value={isHiddenPost} onChange={() => {
                    setIsHiddenPost(!isHiddenPost)
                }} defaultIsChecked={isHiddenPost}>Is hidden post</Checkbox>
            </FormControl>
            <Button
                onClick={openSelectFile}
                mt={4}
                mr={4}
                colorScheme="blue"
            >
                Choose your file
            </Button>

            <Button colorScheme='twitter' onClick={onOpen} mt='4'>Submit</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Terms and Conditions</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        BY USING THE SERVICES, YOU ARE AGREEING, ON BEHALF OF YOURSELF AND THOSE YOU REPRESENT, TO
                        COMPLY WITH AND BE LEGALLY BOUND BY THESE TERMS AS WELL AS OUR PRIVACY POLICY AND ALL APPLICABLE
                        LAWS. IF YOU, FOR YOURSELF OR ON BEHALF OF THOSE YOU REPRESENT, DO NOT AGREE TO ANY PROVISION OF
                        THESE TERMS, YOU MUST, FOR YOURSELF AND ON BEHALF ANY SUCH PERSON(S), DISCONTINUE THE
                        REGISTRATION PROCESS, DISCONTINUE YOUR USE OF THE SERVICES, AND, IF YOU ARE ALREADY REGISTERED,
                        CANCEL YOUR ACCOUNT.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            No, close
                        </Button>
                        <Button variant='ghost' onClick={handleSubmission}>Yes, I agree</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {resStatus === 201 && (<Alert variant="solid" mt="2" status="success">
                <AlertIcon/>
                Post idea success
                <CloseButton
                    onClick={() => {
                        setResStatus(null);
                    }}
                    position="absolute"
                    right="8px"
                    top="8px"
                />
            </Alert>)}
            {resStatus === 422 && (<Alert mt="2" status="error">
                <AlertIcon/>
                <Flex direction='column' align='flex-start'>
                    <Box>{error && error?.title}</Box>
                    <Box>{error && error?.category_id}</Box>
                    <Box>{error && error?.file}</Box>
                </Flex>
                <CloseButton
                    onClick={() => {
                        setResStatus(null);
                    }}
                    position="absolute"
                    right="8px"
                    top="8px"
                />
            </Alert>)}
        </Box>
    </>);
};

export default PostIdeaPDF;
