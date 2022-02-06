import React, {useEffect, useState} from "react";
import {Link} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {Link as ReachLink} from "react-router-dom";
import {Outlet} from "react-router-dom";
import Api from "../../api/Api";

const Ideas = () => {
    const [ideas, setIdeas] = useState([])
    const [page, setPage] = useState(1)
    const handleGetIdeas = async (page) => {
        try {
            const response = await Api().get(`/ideas?page=${page}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleGetIdeas()
    }, [page])

    return (<>
        <div>Idea page</div>

        <Link as={ReachLink} to="post-idea" color="teal.500">
            Post New Idea <AddIcon mx="2px"/>
        </Link>

        <Outlet/>
    </>);
};

export default Ideas;
