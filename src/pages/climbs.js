import React from "react"
import {Helmet} from "react-helmet"
import Link from "gatsby-link"
import styles from "../styles"
import presets from "../utils/presets"
import { rhythm, scale } from "../utils/typography"
import { VictoryChart, VictoryAxis, VictoryBar, VictoryStack }from "victory"


class ClimbsPageRoute extends React.Component {
  render() {
    let pitchCount = 0
    this.props.data.allClimbsJson.edges.map((climb) => {
      pitchCount += parseInt(climb.node.Pitches)
    })
    const routeCount = this.props.data.allClimbsJson.totalCount
    const startDate = this.props.data.allClimbsJson.edges[routeCount-1].node.Date

    const myDataset = [
      [
          {x: "a", y: 1},
          {x: "b", y: 2},
          {x: "c", y: 3},
          {x: "d", y: 2},
          {x: "e", y: 1}
      ],
      [
          {x: "a", y: 2},
          {x: "b", y: 3},
          {x: "c", y: 4},
          {x: "d", y: 5},
          {x: "e", y: 5}
      ],
      [
          {x: "a", y: 1},
          {x: "b", y: 2},
          {x: "c", y: 3},
          {x: "d", y: 4},
          {x: "e", y: 4}
      ]
    ]

  // This is an example of a function you might use to transform your data to make 100% data
    function transformData(dataset) {
      const totals = dataset[0].map((data, i) => {
        return dataset.reduce((memo, curr) => {
          return memo + curr[i].y;
        }, 0);
      });
      return dataset.map((data) => {
        return data.map((datum, i) => {
          return {x: datum.x, y: (datum.y / totals[i]) * 100};
        });
      });
    }



    const dataset = transformData(myDataset);

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

          <div>
            <VictoryChart height={400} width={400}
              domainPadding={{x: 30, y: 20}}
            >
                <VictoryStack
                  colorScale={["black", "blue", "tomato"]}
                >
                  {dataset.map((data, i) => {
                    return <VictoryBar data={data} key={i}/>;
                  })}
                </VictoryStack>
                <VictoryAxis dependentAxis
                  tickFormat={(tick) => `${tick}%`}
                />
                <VictoryAxis
                  tickFormat={["a", "b", "c", "d", "e"]}
                />
            </VictoryChart>
          </div>

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
