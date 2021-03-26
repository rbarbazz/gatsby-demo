import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Container, Heading, Text } from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProductTemplate = ({ data, location }) => {
  const product = data.markdownRemark
  const { title, description, price } = product.frontmatter
  const { featuredImg } = product

  return (
    <Layout>
      <SEO
        title={product.frontmatter.title}
        description={product.frontmatter.description}
      />
      <Heading as="h1" marginTop="2rem" textAlign="center">
        Product
      </Heading>
      <Container margin="2rem auto">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <GatsbyImage
            alt={title}
            image={featuredImg.childImageSharp.gatsbyImageData}
          />
          <Text
            display="flex"
            justifyContent="space-between"
            margin="1rem 2rem 0"
          >
            {title}
            <strong>{price}</strong>
          </Text>
          <Text margin="2rem">{description}</Text>
        </Box>
      </Container>
    </Layout>
  )
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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
          )
        }
      }
    }
  }
`
