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
    useToast
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Api from "../../../api/Api";

// Init state
const initInputState = {
    name: '', description: ''
}

const NewCategory = () => {
    const toast = useToast()
    const [error, setError] = useState({})
    const [{name, description}, setInputState] = useState(initInputState)

    const navigate = useNavigate()

    const onChangeInput = (e) => {
        // console.log(e.target.name, e.target.value)
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

    const createCategory = async () => {
        try {
            let formData = {
                name, description
            }
            const res = await Api().post('/qa-managers/categories', formData)
            let categoryId = res?.data?.categoryId
            navigate(`/qa-managers/categories/${categoryId}`)
            toast({
                title: `Create category success`,
                status: 'success',
                variant: 'top-accent',
                position: 'top-right',
                isClosable: true,
            })
        } catch (e) {
            if (e) {
                toast({
                    title: `Failed to create new category`,
                    description: 'Please try again',
                    status: 'error',
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
            }
            if (e.response.status === 422) {
                setError(e.response.data)
            }
        }
    }

    return (<>
        <Center>
            <Box
                w='50%'
                boxShadow={'inner'}
                p={'6'}
                m={'5'}
                rounded={'md'}
                bg={'facebook.50'}
            >
                <Heading size={'md'}>Create new category</Heading>
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
                    <Button onClick={createCategory} colorScheme='messenger'>Create</Button>
                </ButtonGroup>
            </Box>
        </Center>
    </>)
}

export default NewCategory