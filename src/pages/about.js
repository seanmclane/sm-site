import React from "react"
import Link from "gatsby-link"
import styles from "../styles"
import presets from "../utils/presets"
import { rhythm, scale } from "../utils/typography"

import aboutImage from "./posts/2017-01-18---taking-a-break-4/slab.jpg"

class AboutPageRoute extends React.Component {
  render() {
    const author = this.props.data.site.siteMetadata.author

    return (
      <div>
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

            css={{
              marginBottom: rhythm(2),
            }}
          />
          <ul
            css = {{
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
              <a href="https://www.instagram.com/seanmshan/"><img width="32" height="32" src="https://www.instagram.com/favicon.ico" /></a>
            </li>
            <li>
              <a href="https://www.mountainproject.com/u/smm//108959833"><img width="32" height="32" src="https://www.mountainproject.com/favicon.ico" /></a>
            </li>
            <li>
              <a href="https://github.com/seanmclane"><img width="32" height="32" src="https://www.github.com/favicon.ico" /></a>
            </li>

          </ul>

          <p>          
          In 2012, I happened into an expedition to a trekking peak in Nepal, the sort of guided, commercial tourist trap everyone likes to rag on. Without prior climbing experience, I found myself staring at Everest from 6119m. The euphoria lasted only a moment before the crackling and wheezing kicked in. "HAPE. Get down," I thought. My sherpa-diagnosed "head cold" did not fully recover until I walked into the medical clinic at Pheriche (4371m). "You probably had HAPE, but it cleared up on descent." "Great..." A sobering experience to be sure and a reminder that I could only truly rely on myself. But I couldn't get the thought out of my head...
          </p>
          <blockquote>
          I have to do this again.
          </blockquote>
          <p>          
            In the four years since, I've been back to altitude without issue in Peru, lead WI5 in Canada, onsighted 5.11 in the Creek, and soloed the Grand Teton in under six hours. I feel proud of those accomplishments as stepping stones to the aesthetic lines that fill my dreams.
          </p>
        </div>
      </div>
    )
  }
}

export default AboutPageRoute

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`
