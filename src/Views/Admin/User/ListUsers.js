import React, {useEffect, useState} from "react";
import Api from "../../../api/Api";
import {FormControl, FormLabel, Link, Select, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {Link as ReachLink, useSearchParams} from "react-router-dom";
import Pagination from "react-js-pagination";

const ListUsers = () => {
    const [users, setUsers] = useState()
    const [roleId, setRoleId] = useState(4)
    const [roles, setRoles] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const changeRoleId = (event) => {
        setRoleId(event.target.value)
        let index = event.nativeEvent.target.selectedIndex;

        setSearchParams({'role-name': event.nativeEvent.target[index].text})
        fetchUsers().then()
    }
    const fetchUsers = async (pageNumber) => {
        try {
            const res = await Api().get(`admins/users?page=${pageNumber}&&roleId=${roleId}`)
            // console.log(res)
            setUsers(res.data);
        } catch (e) {
            console.log(e)
        }
    }
    const fetchRoles = async () => {
        try {
            const res = await Api().get('admins/roles')
            // console.log(res.data)
            setRoles(res.data)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        fetchUsers().then()
        fetchRoles().then()
    }, [roleId])

    return (<>
        <FormControl my={'5px'}>
            <FormLabel>Choose role name</FormLabel>
            <Select onChange={changeRoleId} value={roleId} size={'md'}>
                {roles && roles.map((e) => {
                    return (<option key={e.id} value={e.id}>
                        {e.name}
                    </option>);
                })}
            </Select>
        </FormControl>

        <Table variant="simple" boxShadow='base' p='6' rounded='md'
               bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'>
            <TableCaption color='facebook.600'>Table of users in system</TableCaption>
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
                                View Detail
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
                fetchUsers(pageNumber)
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Lage"
        />
    </>)
}

export default ListUsers