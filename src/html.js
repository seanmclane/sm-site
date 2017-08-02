import React from "react"

import f16 from "./favicon-16x16.png"
import f32 from "./favicon-32x32.png"
import f96 from "./favicon-96x96.png"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

class HTML extends React.Component {
  render() {
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
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" sizes="32x32" href={f32}/>
          <link rel="icon" type="image/png" sizes="96x96" href={f96}/>
          <link rel="icon" type="image/png" sizes="16x16" href={f16}/>
          {this.props.headComponents}
          {css}
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
