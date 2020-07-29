import React from "react"
import {
  Flex,
  Spacer,
  HStack,
  Center,
  Link,
  // useColorModeValue,
} from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"

const TitleLink = ({ to, children, ...props }) => (
  <Link
    as={GatsbyLink}
    to={to}
    _hover=""
    _active={{bg: "gray.400"}}
    {...props}
  >
    {children}
  </Link>
)

const NavLink = ({ to, children, ...props }) => (
  <Link
    as={GatsbyLink}
    to={to}
    _hover={{ 
      borderRadius: "4px", 
      // bg: useColorModeValue("gray.100", "whiteAlpha.100")
      fontWeight: "semibold",
    }}
    {...props}
  >
    {children}
  </Link>
)

const Header = ({ title }) => (
  <Flex as="header" mb="8">
    <Center fontSize="3xl" fontWeight="bold" pr="2">
      <TitleLink to="/">{title}</TitleLink>
    </Center>
    <Spacer />
    <HStack spacing="4" textTransform="uppercase">
      <Center bg="yellow.100">
        <NavLink as={GatsbyLink} to="/blog">Blog</NavLink>
      </Center>
      <Center bg="yellow.100">
        <NavLink as={GatsbyLink} to="/about">About</NavLink>
      </Center>
    </HStack>
  </Flex>
)

export default Header;