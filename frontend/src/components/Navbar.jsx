import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaPlusSquare } from "react-icons/fa";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }
        }
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          color={colorMode === "light" ? "black" : "white"} 
          bgGradient="linear(to-r, cyan.400, blue.500)"
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
            <Button>
              <FaPlusSquare fontSize={20} />
            </Button>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20"/>}
            </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar