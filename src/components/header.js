import React from "react"
import { 
  Flex, 
  Spacer, 
  HStack, 
  Center 
} from "@chakra-ui/core"

const Header = ({ title }) => (
  <Flex as="header" mb="8">
    <Center fontSize="3xl" fontWeight="bold" pr="2">
      {title}
    </Center>
    <Spacer />
    <HStack spacing="4" textTransform="uppercase">
      <Center>
        Blog
      </Center>
      <Center>
        About
      </Center>
    </HStack>
  </Flex>
)

export default Header;