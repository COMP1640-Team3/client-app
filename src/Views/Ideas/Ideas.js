import React, { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import Api from "../../api/Api";
import Pagination from "react-js-pagination";

// UI
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Ideas = () => {
  const [ideas, setIdeas] = useState({});
  const getIdeas = async (pageNumber = 1) => {
    try {
      const response = await Api().get(`/ideas?page=${pageNumber}`);
      setIdeas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getIdeas();
  }, []);

  return (
    <>
      <div>Idea page</div>

      <Link as={ReachLink} to="/post-idea" color="teal.500">
        Post New Idea <AddIcon mx="2px" />
      </Link>

      {/* List ideas */}

      <Table variant="simple">
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
                  <Link as={ReachLink} to={`${idea.id}`}>
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
    </>
  );
};

export default Ideas;
