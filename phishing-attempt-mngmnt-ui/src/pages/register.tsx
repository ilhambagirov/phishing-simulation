import { useState } from 'react';
import axios, { AxiosError } from "axios"
import { Box, Button, Flex, FormControl, Input, Link } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../util/errorResponse';

interface LoginRepsonse {
    token: string;
}

function Register() {
    const [errorText, setError] = useState<string | undefined>(undefined)
    const [formData, setFormData] = useState({
        username: '', password: ''
    });

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError("Fill the form.")
            return
        }

        let register = {
            username: formData.username,
            password: formData.password,
        }

        axios.post<LoginRepsonse>(import.meta.env.VITE_BASE_URL + "/auth/register", register)
            .then(x => {
                window.localStorage.setItem("jwt", x.data.token)
                navigate('/')
                setFormData({ username: '', password: '' });
            })
            .catch((err: AxiosError<ErrorResponse, any>) => { setError(err.response?.data.message) })
    };

    return (
            <>
                <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    minHeight="100vh"
                    bgGradient="linear(to-r, teal.500, blue.500)"
                    p={6}
                >
                    <Flex
                        direction="column"
                        gap={4}
                        p={8}
                        bg="white"
                        borderRadius="xl"
                        boxShadow="2xl"
                        maxWidth="400px"
                        width="100%"
                        textAlign="center"
                    >
                        <Box fontSize="2xl" fontWeight="bold" color="teal.600" mb={4}>
                            Register new Account
                        </Box>
    
                        {errorText && (
                            <Box
                                mb={4}
                                color="red.600"
                                fontWeight="bold"
                                bg="red.100"
                                px={4}
                                py={2}
                                borderRadius="md"
                                border="1px solid"
                                borderColor="red.300"
                            >
                                {errorText}
                            </Box>
                        )}
                        <form onSubmit={handleSubmit}>
                            <FormControl mb={4}>
                                <Input
                                    height="50px"
                                    fontSize="16px"
                                    borderRadius="8px"
                                    placeholder="Username"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    bg="gray.50"
                                    border="1px solid"
                                    borderColor="teal.400"
                                    focusBorderColor="teal.600"
                                    _placeholder={{ color: "gray.400" }}
                                />
                            </FormControl>
    
                            <FormControl mb={4}>
                                <Input
                                    type="password"
                                    height="50px"
                                    fontSize="16px"
                                    borderRadius="8px"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    bg="gray.50"
                                    border="1px solid"
                                    borderColor="blue.400"
                                    focusBorderColor="blue.600"
                                    _placeholder={{ color: "gray.400" }}
                                />
                            </FormControl>
    
                            <Flex justify="space-between" align="center" mt={4}>
                                <Link
                                    as={RouterLink}
                                    to="/"
                                    color="blue.500"
                                    fontWeight="medium"
                                    _hover={{ color: "blue.300", textDecoration: "underline" }}
                                >
                                    Login
                                </Link>
                                <Button
                                    type="submit"
                                    height="50px"
                                    width="120px"
                                    bgGradient="linear(to-r, teal.400, blue.400)"
                                    color="white"
                                    fontWeight="bold"
                                    borderRadius="8px"
                                    _hover={{ bgGradient: "linear(to-r, teal.600, blue.600)" }}
                                >
                                    Register
                                </Button>
                            </Flex>
                        </form>
                    </Flex>
                </Flex>
            </>
    )
}

export default Register