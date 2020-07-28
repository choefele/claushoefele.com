import * as React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Avatar,
  chakra,
  Badge,
} from "@chakra-ui/core"
import Layout from "../components/layout"

// frontmatter > tags
function BlogEntries() {
  const { allMdx } = useStaticQuery(graphql`
    query AllGuides {
      allMdx(filter: { slug: { glob: "blog/*" } }) {
        nodes {
          excerpt
          frontmatter {
            title
          }
          parent {
            ... on File {
              birthTime
            }
          }
        }
      }
    }
  `)

  return (
    <>
    <Layout>
      <Box>
        <Box>
          <Container maxWidth="md">
            <Heading as="h1" size="xl" mb="3">
              Blog
            </Heading>
            <Text>A list of guides for using Chakra UI with any project.</Text>
          </Container>
        </Box>
        <Container maxWidth="md">
          <Stack spacing="4rem">
            {/* {allMdx.nodes.map(
              ({
                fields: { createdAt, contributors, slug },
                frontmatter: { title, tags },
                parent: { birthTime },
                excerpt,
              }) => (
                <GuidePreview
                  key={title}
                  url={slug}
                  title={title}
                  birthTime={birthTime}
                  createdAt={createdAt}
                  contributors={contributors}
                  tags={tags}
                >
                  {excerpt}
                </GuidePreview>
              ),
            )} */}
          </Stack>
        </Container>
      </Box>
      </Layout>
    </>
  )
}

export default BlogEntries