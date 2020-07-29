import React from "react"
import { 
  Flex, 
  Spacer, 
  HStack, 
  Center 
} from "@chakra-ui/core"

const Footer = () => (
  <Flex as="header" fontSize="xs" mt="8">
    <Center pr="2">
    © {new Date().getFullYear()}
    </Center>
    <Spacer />
    <HStack spacing="4" textTransform="uppercase">
      <Center>
        Privacy Policy
      </Center>
      <Center>
        Impressum
      </Center>
    </HStack>
  </Flex>
)

export default Footer;