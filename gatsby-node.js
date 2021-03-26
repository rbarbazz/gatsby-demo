const path = require(`path`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for product
  const product = path.resolve(`./src/templates/product.js`)

  // Get all markdown products sorted by title
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___title], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your products`,
      result.errors
    )
    return
  }

  const products = result.data.allMarkdownRemark.nodes

  // Create products pages
  // But only if there's at least one markdown file found at "content/products" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (products.length > 0) {
    products.forEach((post, index) => {
      const previousPostId = index === 0 ? null : products[index - 1].id
      const nextPostId =
        index === products.length - 1 ? null : products[index + 1].id

      createPage({
        path: post.fields.slug,
        component: product,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = async ({
  actions,
  cache,
  createNodeId,
  getNode,
  node,
  store,
}) => {
  const { createNode, createNodeField } = actions

  if (
    node.internal.type === `MarkdownRemark` &&
    node.frontmatter.image !== null
  ) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    let fileNode = await createRemoteFileNode({
      url: `${node.frontmatter.image}&text=${value}`, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
    })

    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // products are stored inside "content/products" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
      fields: Fields
    }

    type Frontmatter {
      title: String
      price: String
      description: String
      image: String
    }

    type Fields {
      slug: String
    }
  `)
}
