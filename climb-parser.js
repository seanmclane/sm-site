const path = require(`path`)
const fs = require(`fs`)
const https = require(`https`)

const file = path.resolve(`src/data/climbs.json`)

https.get(`https://www.mountainproject.com/u/smm//108959833?action=ticks&&export=1`, (res) => {
  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk })
  res.on('end', () => {
    try {
      const lines = rawData.split(/\r?\n/)
      const parsedData = lines.map((l) => {
        return l.split('|')
      })

      // remove extra rows from top and bottom
      parsedData.splice(0,2)
      parsedData.splice(-2,2)

      const headers = parsedData.shift()
      const jsonData = parsedData.map((values) => {
        return headers.reduce((obj, key, index) => {
          obj[key] = values[index]
          return obj
        }, {})
      })
      const json = JSON.stringify(jsonData)
      fs.writeFile(file, json, (e) => {
        if (e) throw e
      })
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(e.message)
})