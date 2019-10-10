import React, { Fragment } from "react"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

class HTML extends React.Component {
  render () {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    return (
      <html lang="en">
        <head>
          {this.props.headComponents}
          {css}
          <style>
            {`
            .gatsby-resp-image-image {
              left: auto;
              width: auto;
              max-width: inherit;
            }
            .gatsby-resp-image-wrapper + em {
              font-size: 1rem;
              line-height: 1.4;
              font-family: Spectral, serif;
              display: block;
              text-align: right;
              margin-top: 0.8rem;
              margin-bottom: 1.6rem;
              color: hsla(291, 0%, 18%,0.4);
            }
            `}
          </style>
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

export default HTML
