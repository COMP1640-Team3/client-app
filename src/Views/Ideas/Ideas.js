import React, {useEffect, useState} from "react";
import {Link as ReachLink, useSearchParams} from "react-router-dom";
import Api from "../../api/Api";
import Pagination from "react-js-pagination";

// UI
import {Box, Input, Link, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

const Ideas = () => {
    const [ideas, setIdeas] = useState({});
    const [searchParams, setSearchParams] = useSearchParams()
    let title = searchParams.get('title');
    const [query, setQuery] = useState(title)

    const getIdeas = async (pageNumber = 1) => {
        try {
            if (query == null) {
                const response = await Api().get(`/ideas?page=${pageNumber}`);
                setIdeas(response.data);
            } else {
                if (query.length === 0) {
                    const response = await Api().get(`/ideas/?page=1`);
                    setIdeas(response.data);
                }
                const response = await Api().get(`/ideas?page=${pageNumber}&title=${query}`);
                setIdeas(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const changeTitle = (e) => {
        setQuery(e.target.value)
        setSearchParams({title: e.target.value})
    }

    useEffect(() => {
        getIdeas()
    }, [query]);

    return (<>
        <div>Idea page</div>

        {
            JSON.parse(localStorage.getItem('role')) === 'staff' &&
            <Link as={ReachLink} to="/post-idea" color="teal.500">
                Post New Idea <AddIcon mx="2px"/>
            </Link>

        }


        {/* List ideas */}
        <Stack mb='5'>
            <Box>
                <Input onChange={changeTitle} placeholder='Enter title to search ideas 💡' type='text'
                       value={searchParams.get('title')}
                />
            </Box>
        </Stack>
        <Table variant="simple" boxShadow='lg' p='6' rounded='md'
               bgGradient={[
                   'linear(to-tr, teal.300, yellow.400)',
                   'linear(to-t, blue.200, teal.500)',
                   'linear(to-b, orange.100, purple.300)',
               ]}>
            <TableCaption>Table of ideas</TableCaption>
            <Thead>
                <Tr>
                    <Th>No.</Th>
                    <Th>Title</Th>
                    <Th>Department</Th>
                    <Th>Category</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {ideas?.data?.map((idea, index) => {
                    return (<Tr key={index}>
                        <Td>{index}</Td>
                        <Td>{idea.title}</Td>
                        <Td>{idea.department.description}</Td>
                        <Td>{idea.category.name}</Td>
                        <Td>
                            <Link as={ReachLink} to={`${idea.id}`}>
                                View Detail
                            </Link>
                        </Td>
                    </Tr>);
                })}
            </Tbody>
        </Table>

        <Pagination
            activePage={ideas.current_page}
            itemsCountPerPage={ideas.per_page}
            totalItemsCount={ideas?.total ? ideas.total : 0}
            onChange={(pageNumber) => {
                getIdeas(pageNumber);
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Lage"
        />
    </>);
};

export default Ideas;
