import React, {useEffect, useState} from "react";
import Pagination from "react-js-pagination";
import Api from "../../../api/Api";
// UI
import {Heading, Link, Table, TableCaption, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";

const UserIdeas = () => {
    const [ideas, setIdeas] = useState({});
    const getIdeas = async (pageNumber = 1) => {
        try {
            const response = await Api().get(`users/ideas?page=${pageNumber}`);
            setIdeas(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getIdeas().then().catch();
    }, []);

    return (<>
        <Heading>My Ideas</Heading>
        {/* List ideas */}

        <Table variant="simple" boxShadow='lg' p='6' rounded='md' bg={'gray.200'}>
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
                {ideas.data?.map((idea, index) => {
                    return (
                        <Tr key={index}>
                            <Td>{index}</Td>
                            <Td>{idea.title}</Td>
                            <Td>{idea.department.description}</Td>
                            <Td>{idea.category.name}</Td>
                            <Td>
                                <Link as={ReachLink} to={`/ideas/${idea.id}`}>
                                    View Detail
                                </Link>
                            </Td>
                        </Tr>
                    );
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
    </>)
}

export default UserIdeas