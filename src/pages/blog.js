import * as React from "react"
// import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import {
  Box,
  Container,
  Stack,
  // Avatar,
  // chakra,
  // Badge,
} from "@chakra-ui/core"
import Layout from "../components/layout"

// frontmatter > tags
function BlogEntries() {
  // const { allMdx } = useStaticQuery(graphql`
  //   query AllGuides {
  //     allMdx(filter: { slug: { glob: "blog/*" } }) {
  //       nodes {
  //         excerpt
  //         frontmatter {
  //           title
  //         }
  //         parent {
  //           ... on File {
  //             birthTime
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <Layout title="Blog" subtitle="A list of blog entries.">
      <Box>
        <Container>
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
  )
}

export default BlogEntries