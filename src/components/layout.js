import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box } from "@chakra-ui/core"
import Header from "./header.js"
import Footer from "./footer.js"

const Layout = ({ children }) => {
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
      <Header title={data.site.siteMetadata.title}/>
      <main>{children}</main>
      <Footer />
    </Box>
  )
}

export default Layout
