import {
    Box,
    Flex,
    FormControl,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { dateFormatter } from "../util/dateFormatter";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PhishingAttempt {
    id: string
    email: string
    url: string
    status: string
    createdAt: string
}

interface PhishingAttemptPage {
    data: PhishingAttempt[]
    hasNext: boolean
}

export function Dashboard() {
    const [email, setEmail] = useState("");
    const [phishingAttempPage, setPhishingAttempPage] = useState<PhishingAttemptPage>({} as PhishingAttemptPage)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleEmailChange = (e: any) => setEmail(e.target.value);

    const handleLogout = () => {
        localStorage.removeItem("jwt")
        navigate('/')
    }

    const sendPhishingEmail = async () => {
        try {
            setLoading(true)
            let response = await axios.post(import.meta.env.VITE_BASE_URL + "/phishing", { email }, { headers: { "Authorization": localStorage.getItem("jwt") } })
            if (response && response.data) {
                setPhishingAttempPage(prevData => ({
                    ...prevData,
                    data: [response.data, ...prevData.data.slice(0, 9)],
                    hasNext: prevData.hasNext,
                }));
                setEmail("");
            }
            setLoading(false)
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("jwt")) navigate("/")
        axios.get<PhishingAttemptPage>(import.meta.env.VITE_BASE_URL + "/phishing?page=" + currentPage, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then(resp => setPhishingAttempPage(resp.data))
    }, [currentPage])

    const handleNextPage = () => {
        if (phishingAttempPage.hasNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            minHeight="100vh"
            bgGradient="linear(to-r, teal.400, blue.500)"
            p={6}
        >
            <Box
                bg="white"
                p={8}
                borderRadius="12px"
                boxShadow="lg"
                width="80%"
                maxWidth="1100px"
            >
                <Flex mb={6} justify="space-between" align="center">
                    <FormControl width="70%" mr={4}>
                        <Input
                            placeholder="Enter email to send"
                            value={email}
                            onChange={handleEmailChange}
                            p={4}
                            fontSize="16px"
                            borderRadius="8px"
                            border="2px solid teal"
                        />
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        onClick={sendPhishingEmail}
                        borderRadius="8px"
                        px={6}
                    >
                        Send Email
                    </Button>
                    <IoIosLogOut onClick={handleLogout} size="2em" cursor="pointer" />
                </Flex>

                <Table maxHeight="750px" variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Email</Th>
                            <Th>Status</Th>
                            <Th>URL</Th>
                        </Tr>
                    </Thead>
                    <Tbody maxHeight="700px" overflowY="auto">
                        {phishingAttempPage?.data?.map((attempt, index) => (
                            <Tr key={index}>
                                <Td>{dateFormatter(attempt.createdAt)}</Td>
                                <Td>{attempt.email}</Td>
                                <Td>
                                    <Text
                                        fontWeight="bold"
                                        color={
                                            attempt.status === "UnClicked"
                                                ? "green.500"
                                                : "red.500"
                                        }
                                    >
                                        {attempt.status}
                                    </Text>
                                </Td>
                                <Td>
                                    <a href={attempt.url} target="_blank" rel="noopener noreferrer">
                                        {attempt.url}
                                    </a>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                <Flex width="200px" mt={4} justify="space-between" align="center">
                    <Button
                        colorScheme="teal"
                        onClick={handlePreviousPage}
                        isDisabled={currentPage === 1 || loading}
                    >
                        Previous
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={handleNextPage}
                        isDisabled={!phishingAttempPage.hasNext || loading}
                    >
                        Next
                    </Button>
                </Flex>
            </Box>
        </Flex>
    )
}


