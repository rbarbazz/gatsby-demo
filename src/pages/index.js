import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, Link as GatsbyLink } from "gatsby"
import * as React from "react"

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
          const { title, price } = product.frontmatter
          const { featuredImg } = product

          return (
            <Box
              key={title}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              margin="0 1rem 2rem"
            >
              <GatsbyLink to={product.fields.slug}>
                <Box width="16rem">
                  <Image
                    as={GatsbyImage}
                    alt={title}
                    image={featuredImg.childImageSharp.gatsbyImageData}
                  />
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
              </GatsbyLink>
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
        }
        featuredImg {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 80
            )
          }
        }
      }
    }
  }
`
