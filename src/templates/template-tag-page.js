import React from "react"
import { Helmet } from "react-helmet"
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import Layout from '../pages/components/layout'

class TagRoute extends React.Component {
  render () {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post =>
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          {post.node.frontmatter.title}
        </Link>
      </li>
    )

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`Sean McLane | Posts tagged with “${this.props.pageContext.tag}”`}</title>
          </Helmet>
          <h1>
            {this.props.data.allMarkdownRemark.totalCount}
            {` `}posts tagged with “{this.props.pageContext.tag}”
        </h1>
          <ul>
            {postLinks}
          </ul>
          <p>
            <Link to="/tags/">Browse all tags</Link>
          </p>
        </div>
      </Layout>
    )
  }
}

export default TagRoute

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
