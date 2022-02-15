import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import Api from "../../../api/Api";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";

const Categories = () => {
    const [categories, setCategories] = useState();
    const style = {
        cursor: "pointer",
    };
    const featchCategories = async () => {
        try {
            const res = await Api().get("/categories");
            //   console.log(res.data);
            setCategories(res.data);
        } catch (error) {
            console.log("Error featch categories: ", error);
        }
    };

    useEffect(() => {
        featchCategories();
    }, []);
    return (
        <>
            <Table size="md" mt={5} boxShadow="md" p="6" rounded="md" bg="gray.200">
                <Thead>
                    <Tr>
                        <Th>Category No</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Description</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories &&
                        categories.map((category, index) => (
                            <Tr key={index}>
                                <Td>{index}</Td>
                                <Td>{category.name}</Td>
                                <Td isNumeric>{category.description}</Td>
                                <Td
                                    textDecoration={"underline"}
                                    style={style}
                                    color={"whatsapp.600"}
                                >
                                    <Link to={`${category.id}`}>Modify</Link>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th>Total</Th>
                        <Th isNumeric>{categories ? categories.length : 0} records</Th>
                    </Tr>
                </Tfoot>
            </Table>


            <Outlet/>
        </>
    );
};

export default Categories;
