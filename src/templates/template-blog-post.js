import React from "react"
import { Helmet } from "react-helmet"
import Link from "gatsby-link"
import styles from "../styles"
import { rhythm, scale } from "../utils/typography"
import { graphql } from 'gatsby'
import Layout from '../pages/components/layout'

class BlogPostRoute extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const author = this.props.data.authorYaml

    let tags
    let tagsSection
    if (post.fields.tagSlugs) {
      const tagsArray = post.fields.tagSlugs
      tags = tagsArray.map((tag, i) => {
        const divider = i < tagsArray.length - 1 && <span>{`, `}</span>
        return (
          <span key={tag}>
            <Link to={tag}>
              {post.frontmatter.tags[i]}
            </Link>
            {divider}
          </span>
        )
      })
      tagsSection = (
        <span
          css={{
            fontStyle: `normal`,
            textAlign: `left`,
          }}
        >
          tagged {tags}
        </span>
      )
    }

    return (
      <Layout>
        <div
          css={{
            maxWidth: rhythm(26),
          }}
        >
          <Helmet>
            <title>{`Sean McLane | ${post.frontmatter.title}`}</title>
            <meta property="og:title" content={`Sean McLane | ${post.frontmatter.title}`} />
            <meta property="og:site_name" content="Sean McLane" />
            <meta property="og:description" content={post.excerpt} />
          </Helmet>

          <header>
            <h1
              css={{
                marginBottom: rhythm(1 / 6),
                color: post.frontmatter.shadow,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              css={{
                ...scale(-1 / 5),
                display: `block`,
                color: `${styles.colors.light}`,
              }}
            >
              {post.timeToRead} min read &middot; {tagsSection}
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
          <hr
            css={{
              marginBottom: rhythm(1),
              marginTop: rhythm(2),
            }}
          />
          <p
            css={{
              marginBottom: rhythm(4 / 4),
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <Link
              to="/about"
              css={{
                minWidth: `60px`,
              }}
            >
              <img
                alt={`Avatar of ${author.id}`}
                src={
                  author.avatar.children[0].fixed
                    .src
                }
                srcSet={
                  author.avatar.children[0].fixed
                    .srcSet
                }
                css={{
                  borderRadius: `100%`,
                  float: `left`,
                  marginRight: rhythm(3 / 4),
                  marginBottom: 0,
                }}
              />
            </Link>
            <span
              css={{
                color: styles.colors.light,
                ...scale(-1 / 5),
              }}
            >
              <Link to="/about">
                <small
                  css={{
                    fontWeight: `bold`,
                    color: styles.colors.text,
                    textTransform: `uppercase`,
                  }}
                >
                  {author.id}
                </small>
              </Link>
              {` `}
              {author.bio}
            </span>
          </p>
        </div>
      </Layout>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
    authorYaml {
      id
      bio
      avatar {
        children {
          ... on ImageSharp {
            fixed(
              width: 50
              height: 50
              quality: 75
              grayscale: true
            ) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
