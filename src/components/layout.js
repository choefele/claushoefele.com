import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/core"
import Header from "./header.js"
import Footer from "./footer.js"

const Layout = ({ title, subtitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Box maxW="960px" mx="auto" p="16px">
      <Header title={data.site.siteMetadata.title} />
      <main>
        {title &&
          <Heading as="h1" size="xl" mb="3">{title}</Heading>
        }
        {subtitle &&
          <Text>{subtitle}</Text>
        }
        {children}
      </main>
      <Footer />
    </Box>
  )
}

export default Layout
