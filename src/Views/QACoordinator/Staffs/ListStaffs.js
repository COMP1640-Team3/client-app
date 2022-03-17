import React, {useEffect, useState} from "react";
import Api from "../../../api/Api";
import {Box, Input, Link, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {Link as ReachLink, useSearchParams} from "react-router-dom";
import Pagination from "react-js-pagination";

const ListStaffs = () => {
    const [users, setUsers] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    let email = searchParams.get('email');
    const [query, setQuery] = useState(email)

    const fetchUsers = async (pageNumber) => {
        try {
            if (query == null) {
                const res = await Api().get(`/qa-coordinators/staffs?page=${pageNumber}`)
                setUsers(res.data);
            } else {
                if (query.length === 0) {
                    const response = await Api().get(`/qa-coordinators/staffs?page=1`);
                    setUsers(response.data);
                } else {
                    const response = await Api().get(`/qa-coordinators/staffs?page=${pageNumber}&email=${query}`);
                    setUsers(response.data);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    const changeEmail = (e) => {
        setQuery(e.target.value)
        setSearchParams({email: e.target.value})
    }

    useEffect(() => {
        fetchUsers().then()
    }, [email])

    return (<>
        {/* List staffs */}
        <Stack my='5'>
            <Box>
                <Input onChange={changeEmail} placeholder='Enter email to search user 💡' type='text'
                       value={searchParams.get('email')}
                />
            </Box>
        </Stack>
        <Table variant="simple" boxShadow='base' p='6' rounded='md'
               bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'>
            <TableCaption color='facebook.600'>Table of staffs in system</TableCaption>
            <Thead>
                <Tr>
                    <Th>No.</Th>
                    <Th>Email</Th>
                    <Th>Department</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users?.data?.map((user, index) => {
                    return (<Tr key={index}>
                        <Td>{index}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user?.department?.name}</Td>
                        <Td>
                            <Link as={ReachLink} to={`${user.id}`}>
                                Edit permissions
                            </Link>
                        </Td>
                    </Tr>);
                })}
            </Tbody>
        </Table>

        <Pagination
            activePage={users && users.current_page}
            itemsCountPerPage={users && users.per_page}
            totalItemsCount={users && (users?.total ? users.total : 0)}
            onChange={(pageNumber) => {
                fetchUsers(pageNumber);
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Lage"
        />
    </>)
}

export default ListStaffs