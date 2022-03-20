import React, {useEffect, useState} from "react";
import Api from "../../../api/Api";
import {Center, Link, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import Pagination from "react-js-pagination";
import {Link as ReachLink} from "react-router-dom";

const IdeaWithoutComments = () => {
    const [ideas, setIdeas] = useState({})

    const fetchIdeas = async (pageNumber = 1) => {
        try {
            const res = await Api().get(`/admins/ideas-without-comments?page=${pageNumber}`)
            console.log(res.data)
            setIdeas(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchIdeas().then()
    }, [])

    // Template
    return (<>
        <Center>
            <Table variant='simple' boxShadow='base' p='6' rounded='md' my={'5'} bg='floralwhite'>
                <TableCaption>Table of ideas without comment</TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric>No.</Th>
                        <Th>Title</Th>
                        <Th>Content</Th>
                        <Th>Detail</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ideas?.data?.map((idea, index) => {
                        return (<Tr key={index}>
                            <Td isNumeric>{index}</Td>
                            <Td>{idea.title}</Td>
                            <Td><Text noOfLines={[1, 2, 3]}>{idea.content}</Text></Td>
                            <Td>
                                <Link as={ReachLink} to={`${idea.id}`}>
                                    View Detail
                                </Link>
                            </Td>
                        </Tr>);
                    })}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th isNumeric>Total {ideas && ideas.total} Records</Th>
                    </Tr>
                </Tfoot>
            </Table>


        </Center>

        <Pagination
            activePage={ideas?.current_page}
            itemsCountPerPage={ideas?.per_page}
            totalItemsCount={ideas?.total ? ideas.total : 0}
            onChange={(pageNumber) => {
                fetchIdeas(pageNumber);
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Lage"
        />
    </>)
}

export default IdeaWithoutComments