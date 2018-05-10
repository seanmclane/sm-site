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
    const rawClimbSummary = require("../data/climb-summary.json")
    const rawClimbs = require("../data/climbs.json")
    let dataset = []
    let totalPitches = 0
    rawClimbs.forEach((c) => {
      totalPitches += parseInt(c.Pitches)
      console.log(c.Pitches)
    })

    Object.keys(rawClimbSummary[0]).forEach((grade) => {
      let g = [rawClimbSummary[0][grade]]
      //for all years in data 2012-2018
      for (let i = 0; i < 7; i++) {
        g[0][i]['label'] = `${grade} (${g[0][i]['count']})`
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
                <Metric metric="Total Pitches" value={totalPitches}/>
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
                        width = {75}
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
                  tickFormat={['2012', '2013','2014','2015','2016','2017','2018']}
                  tickValues={[1,2,3,4,5,6,7]}
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
