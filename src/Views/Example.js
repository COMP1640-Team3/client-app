import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Api from "../api/Api";

const Example = () => {
  const [state, setData] = useState({
    ideas: "",
  });

  // const fetchData = async (pageNumber = 1) => {
  //   const api = await fetch(
  //     `http://127.0.0.1:8000/api/ideas?page=${pageNumber}`
  //   );
  //   setData({
  //     ideas: await api.json(),
  //   });
  // };
  const fetchData = async (pageNumber = 1) => {
    try {
      const response = Api().get(`/ideas?page=${pageNumber}`);
      setData({
        ideas: (await response).data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ul>
        {state?.ideas?.data
          ? state?.ideas?.data?.map((idea) => (
              <li key={idea.id}>{idea?.title}</li>
            ))
          : "Loading..."}
      </ul>

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

export default Example;
