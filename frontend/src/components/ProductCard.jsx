import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useColorMode } from "./ui/color-mode";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, useDisclosure, VStack, } from "@chakra-ui/react"
import { useProductStore } from "../store/product";
import { useToast } from '@chakra-ui/react';
import { useState } from "react";


const ProductCard = ({ product }) => {
    const { colorMode } = useColorMode()
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const deleteProduct = useProductStore(state => state.deleteProduct)
    const updateProduct = useProductStore(state => state.updateProduct)

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async (pid, productData) => {
        const { success, message } = await updateProduct(pid, productData)
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        onClose()
    }

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl", }}
            bg={colorMode === "light" ? "gray.800" : "white"}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"lg"} fontWeight={"bold"} color={colorMode === "light" ? "white" : "gray.800"}>{product.name}</Heading>
                <Text fontSize={"xl"} color={colorMode === "light" ? "white" : "gray.800"} >${product.price}</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalContent bg={colorMode === "light" ? "gray.800" : "white"}
                    color={colorMode === "light" ? "white" : "gray.800"}>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder="Product Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={"blue"}
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button
                            color={colorMode === "light" ? "white" : "gray.800"}
                            variant={"ghost"}
                            mr={3}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
};

export default ProductCard