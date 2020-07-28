import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import { Box, Text, Flex, Badge, Image } from "@chakra-ui/core"
import { MdStar } from 'react-icons/md';

const AirBnB = () => (
  <Box>
    <Image borderRadius="md" src="https://bit.ly/2k1H1t6" />
    <Flex align="baseline" mt={2}>
      <Badge colorScheme="pink">Plus</Badge>
      <Text
        ml={2}
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="bold"
        color="pink.800"
      >
        Verified &bull; Cape Town
    </Text>
    </Flex>
    <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
      Modern, Chic Penthouse with Mountain, City & Sea Views
  </Text>
    <Text mt={2}>$119/night</Text>
    <Flex mt={2} align="center">
      <Box as={MdStar} color="orange.400" />
      <Text ml={1} fontSize="sm"><b>4.84</b> (190)</Text>
    </Flex>
  </Box>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>

    <AirBnB />

  </Layout>
)

export default IndexPage
