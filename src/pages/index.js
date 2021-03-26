import * as React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"

import { Box, Flex, Heading, Image } from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SiteIndex = ({ data, location }) => {
  const products = data.allMarkdownRemark.nodes
  const pageTitle = "Catalog"

  if (products.length === 0) {
    return (
      <Layout>
        <SEO title={pageTitle} />
        <p>
          No products found. Add markdown products to "content/products" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading as="h1" marginTop="2rem" textAlign="center">
        {pageTitle}
      </Heading>
      <SEO title={pageTitle} />
      <Flex justifyContent="space-around" margin="2rem auto" wrap="wrap">
        {products.map(product => {
          const { title, price, image } = product.frontmatter

          return (
            <Box
              maxW="24rem"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              margin="0 1rem 2rem"
            >
              <Box as={GatsbyLink} to={product.fields.slug}>
                <Image src={image} alt={title} />
                <Box p="6">
                  <Box>{title}</Box>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {price}
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Flex>
    </Layout>
  )
}

export default SiteIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          price
          description
          image
        }
      }
    }
  }
`
