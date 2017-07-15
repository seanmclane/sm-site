import React from "react"
import Link from "gatsby-link"
import { rhythm, scale } from "../utils/typography"
import styles from "../styles"
import presets from "../utils/presets"

import "typeface-space-mono"
import "typeface-spectral"

import shan from "./shan-icon.png"

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <div {...styles.container} {...styles.verticalPadding}>
          <Link
            to="/"
            css={{
              display: `inline-block`,
              textDecoration: `none`,
            }}
          >
            <img 
              src={shan}
              height="50"
              width="50"
              css={{
                display: `inline-block`,
                margin: `0px`,
              }}
              />
          </Link>
        </div>
        <div {...styles.container} {...styles.verticalPadding}>
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
