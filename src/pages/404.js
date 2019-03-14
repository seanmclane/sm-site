import React from "react"
import { Helmet } from "react-helmet"
import Link from "gatsby-link"
import styles from "../styles"
import presets from "../utils/presets"
import { rhythm, scale } from "../utils/typography"
import { graphql } from 'gatsby'
import Layout from '../pages/components/layout'

import shan from "./components/shan-icon.png"

class NotFound extends React.Component {
  render () {
    const author = this.props.data.site.siteMetadata.author
    const title = this.props.data.site.siteMetadata.title
    const description = this.props.data.site.siteMetadata.description
    const pathname = this.props.location.pathname

    return (
      <Layout>
        <div>
          <Helmet>
            <meta property="og:title" content="404" />
            <meta property="og:image" content={shan} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
          </Helmet>
          <div>
            <h1
              css={{
                ...scale(13 / 5)
              }}
            >
              404
          </h1>
            <p>
              {`We couldn't find a page at `}
              <code>{pathname}</code>
              {`... Let's go back to the `}
              <Link
                to="/"
              >
                homepage.
            </Link>
            </p>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFound

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
  }
`