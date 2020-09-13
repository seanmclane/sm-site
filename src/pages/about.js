import React from "react"
import { Helmet } from "react-helmet"
import { rhythm, scale } from "../utils/typography"
import { graphql } from 'gatsby'
import Layout from '../pages/components/layout'

import aboutImage from "./avatars/sean.jpg"

import i from "./instagram.png"
import m from "./mountainproject.png"
import g from "./github.png"

class AboutPageRoute extends React.Component {
  render () {
    const title = this.props.data.site.siteMetadata.title

    return (
      <Layout>
        <div>
          <Helmet>
            <title>Sean McLane | About</title>
            <meta property="og:title" content="Sean McLane | About" />
            <meta property="og:image" content={aboutImage} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content="Read all about Sean McLane" />
          </Helmet>
          <div>
            <h1
              css={{
                ...scale(4 / 5),
                fontWeight: `800`,
                marginBottom: rhythm(2),
              }}
            >
              I can't claim to be the fastest, the strongest, or the most badass. But every day I try to move one step closer.
          </h1>
            <img
              src={aboutImage}
              alt="about"
              css={{
                marginBottom: rhythm(2),
              }}
            />
            <ul
              css={{
                textDecoration: `none`,
                marginBottom: rhythm(2),
                marginLeft: `0`,
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-around`,
                listStyle: `none`,
              }}
            >
              <li>
                <a href="https://www.instagram.com/seanmshan/"><img width="32" height="32" src={i} alt="instagram" /></a>
              </li>
              <li>
                <a href="https://www.mountainproject.com/u/smm//108959833"><img width="32" height="32" src={m} alt="mountain project" /></a>
              </li>
              <li>
                <a href="https://github.com/seanmclane/sm-site"><img width="32" height="32" src={g} alt="github" /></a>
              </li>

            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutPageRoute

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
