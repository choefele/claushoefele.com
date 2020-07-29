import * as React from "react"
import { useStaticQuery, Link } from "gatsby"
import {
  VStack,
} from "@chakra-ui/core"
import Layout from "../components/layout"

// frontmatter > tags
function BlogEntries() {
  const { allMdx } = useStaticQuery(graphql`
    query {
      allMdx(filter: {fileAbsolutePath: {glob: "**/blog/*"}}) {
        nodes {
          fileAbsolutePath
          slug
          frontmatter {
            title
          }
        }
      }
    }      
  `)

  return (
    <Layout title="Blog" subtitle="A list of blog entries.">
      <VStack align="left" spacing="0">
        {allMdx.nodes.map(
          ({
            // fields: { createdAt, contributors, slug },
            frontmatter: { title },
            // parent: { birthTime },
            // excerpt,
            slug
          }) => (
            <Link to={slug}>{title}</Link>
          ),
        )}
      </VStack>
    </Layout>
  )
}

export default BlogEntries