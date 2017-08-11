import React from "react"
import {Helmet} from "react-helmet"
import Link from "gatsby-link"
import styles from "../styles"
import presets from "../utils/presets"
import { rhythm, scale } from "../utils/typography"
import { VictoryChart, VictoryAxis, VictoryBar, VictoryStack, VictoryLegend, VictoryTooltip, VictoryLabel, VictoryPortal }from "victory"
import theme from "../styles/chart"


class Metric extends React.Component {
  render() {
    return (
      <div>
        <h5
          css={{
            fontSize: `0.8em`,
            fontWeight: `400`,
            textTransform: `uppercase`,
            textAlign: `center`,
            color: styles.colors.link,
            marginBottom: rhythm(1/5)
          }}
        >
        {this.props.metric}
        </h5>
        <h2
          css={{
            textAlign: `center`
          }}
        >
        {this.props.value}
        </h2>
      </div>
      )
  }
}


class ClimbsPageRoute extends React.Component {
  render() {
    let rawClimbSummary = require("../data/climb-summary.json")
    let dataset = []

    Object.keys(rawClimbSummary[0]).forEach((grade) => {
      let g = [rawClimbSummary[0][grade]]
      //for six years 2012-2017
      for (let i = 1; i < 6; i++) {
        g[0][i]['label'] = grade
      } 
      dataset.push(g)
    })

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
            If you can't measure it, you can't improve it. Here's how my climbs stack up.
          </h1>

          <div>
          <hr></hr>
            <ul
              css = {{
                textDecoration: `none`,
                marginBottom: rhythm(1/5),
                marginLeft: `0`,
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-around`,
                listStyle: `none`,
              }}
            >
              <li>
                <Metric metric="Best Onsight" value="5.11c"/>
              </li>
              <li>
                <Metric metric="6000m+ Peaks" value="2"/>
              </li>
              <li>
                <Metric metric="First Ascents" value="1"/>
              </li>

            </ul>
            <hr
              css={{
                marginBottom: `0`,
              }}
            ></hr>
          </div>

          <div>
            <VictoryChart theme={theme} height={400} width={400}
              domainPadding={{x: 30, y: 20}}
            >
                <VictoryStack>
                  {dataset.map((data, i) => {
                    return <VictoryBar
                      data={data[0]}
                      x="year"
                      y="count"
                      key={i}
                      labelComponent={
                        <VictoryTooltip 
                        cornerRadius={0}
                        flyoutStyle={{fill: "white"}}/>
                       }
                      />;
                  })}
                </VictoryStack>
                <VictoryAxis dependentAxis
                  tickFormat={(count) => count}
                />
                <VictoryAxis
                  tickFormat={['2012', '2013','2014','2015','2016','2017']}
                  tickValues={[1,2,3,4,5,6]}
                />
            </VictoryChart>
            <h3
            css={{
                textAlign: `center`,
                marginBottom: rhythm(1/5),
              }}
            >
              Count of Climbs by Grade by Year
            </h3>
          </div>

        </div>
      </div>
    )
  }
}

export default ClimbsPageRoute
