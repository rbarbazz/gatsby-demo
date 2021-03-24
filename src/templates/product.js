import * as React from "react"
import { graphql } from "gatsby"

import { Box, Container, Heading, Image, Text } from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProductTemplate = ({ data, location }) => {
  const product = data.markdownRemark
  const { title, description, price, image } = product.frontmatter

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
          <Image src={image} alt={title} />
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
        image
      }
    }
  }
`
