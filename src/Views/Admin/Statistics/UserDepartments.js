import React, {useEffect, useState} from "react";
import Api from "../../../api/Api";
import {Center, Heading, VStack} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const UserDepartments = () => {
    const [data, setData] = useState([])

    //Methods
    const featchusersEachDeparment = async () => {
        try {
            const res = await Api().get('/admins/statistic/users');
            setData(res.data)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        featchusersEachDeparment().then()
    }, [])
    return (
        <>

            <Center mt={'10px'}>
                <VStack>
                    <Heading>Total users each department</Heading>
                    <BarChart
                        width={600}
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="department_name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="total_contributors" fill="#8884d8"/>
                    </BarChart>
                </VStack>
            </Center>
        </>
    ) 
}

export default UserDepartments