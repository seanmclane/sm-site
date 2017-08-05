import React from "react"
import {Helmet} from "react-helmet"
import Link from "gatsby-link"
import styles from "../styles"
import presets from "../utils/presets"
import { rhythm, scale } from "../utils/typography"


class ClimbsPageRoute extends React.Component {
  render() {
    let pitchCount = 0
    this.props.data.allClimbsJson.edges.map((climb) => {
      pitchCount += parseInt(climb.node.Pitches)
    })
    const routeCount = this.props.data.allClimbsJson.totalCount
    const startDate = this.props.data.allClimbsJson.edges[routeCount-1].node.Date

    return (
      <div>
        <Helmet>
          <title>Sean McLane | Climbs</title>
          <meta property="og:title" content="Sean McLane | Climbs"/>
          <meta property="og:site_name" content="Sean McLane"/>
          <meta property="og:description" content="Climbing statistics and analysis" />
        </Helmet>
        <div>
          <h1
            css={{
              ...scale(4 / 5),
              fontWeight: `800`,
              marginBottom: rhythm(2),
            }}
          >
            If you can't measure it, you can't improve it. I have climbed {` ${pitchCount} `} pitches and {` ${routeCount} `} routes since {` ${startDate}`}
          </h1>
        </div>
      </div>
    )
  }
}

export default ClimbsPageRoute

export const pageQuery = graphql`
  query ClimbsQuery {
    allClimbsJson {
      totalCount
      edges {
        node {
          Date
          Pitches
        }
      }
    }
  }
`
