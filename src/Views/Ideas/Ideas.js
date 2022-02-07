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
  const [state, setData] = useState({
    ideas: "",
  });

  const fetchData = async (pageNumber = 1) => {
    try {
      const response = await Api().get(`/ideas?page=${pageNumber}`);
      setData({
        ideas: response.data,
      });
      // console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
          {state?.ideas?.data?.map((idea, index) => (
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
          ))}
        </Tbody>
      </Table>

      <Pagination
        activePage={state?.ideas?.current_page ? state?.ideas?.current_page : 0}
        itemsCountPerPage={state?.ideas?.per_page ? state?.ideas?.per_page : 0}
        totalItemsCount={state?.ideas?.total ? state?.ideas?.total : 0}
        onChange={(pageNumber) => {
          fetchData(pageNumber);
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
