import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useColorMode } from "../components/ui/color-mode";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";


const HomePage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { fetchProducts, products } = useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  console.log(products)
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          color={colorMode === "light" ? "black" : "white"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
          spacing={10}
          w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
          No products found
          <Link to={"/create"}>
            <Text as={"text"} color={colorMode === "light" ? "black" : "white"} _hover={{ textDecoration: "underline" }} paddingLeft={2}>
              Create a new product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container >
  )
}

export default HomePage