import React from "react"
import { Helmet } from "react-helmet"
import Link from "gatsby-link"
import { rhythm, scale } from "../../utils/typography"
import styles from "../../styles"
import presets from "../../utils/presets"

import "typeface-space-mono"
import "typeface-spectral"

import f16 from "../../favicon-16x16.png"
import f32 from "../../favicon-32x32.png"
import f96 from "../../favicon-96x96.png"

import shan from "./shan-icon.png"

class DefaultLayout extends React.Component {
  render () {
    return (
      <div>
        <Helmet>
          <link
            rel="preload"
            href={`/static/spectral-latin-400.bc2de9de.woff2`}
            as="font"
            crossOrigin
          />
          <link
            rel="preload"
            href={`/static/spectral-latin-800.53eca5bf.woff2`}
            as="font"
            crossOrigin
          />
          <link
            rel="prefetch"
            href={`/static/spectral-latin-400italic.b0c97eb5.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/spectral-latin-700.601f0e2d.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/spectral-latin-700italic.64a7de98.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/space-mono-latin-400.a8338881.woff2`}
          />
          <link
            rel="prefetch"
            href={`/static/space-mono-latin-700.eadcd2d5.woff2`}
          />
          <title>Sean McLane</title>
          <link rel="icon" type="image/png" sizes="32x32" href={f32} />
          <link rel="icon" type="image/png" sizes="96x96" href={f96} />
          <link rel="icon" type="image/png" sizes="16x16" href={f16} />
        </Helmet>
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
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
