import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link } from "@chakra-ui/react"

const Layout = ({ children }) => (
  <div>
    <header style={{ margin: "2rem 0 0 4rem" }}>
      <Link>
        <GatsbyLink to="/">Catalog</GatsbyLink>
      </Link>
    </header>
    <main>{children}</main>
    <footer style={{ textAlign: "center" }}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
  </div>
)

export default Layout
