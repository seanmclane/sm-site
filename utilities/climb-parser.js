const path = require(`path`)
const fs = require(`fs`)
const https = require(`https`)

const file = path.resolve(`../src/data/climbs.json`)

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

      let headers = parsedData.shift()
      headers = headers.map((value) => {
        return value.replace(/\s/g, `_`)
      })
      const jsonData = parsedData.map((values) => {
        return headers.reduce((obj, key, index) => {
          obj[key] = values[index]
          return obj
        }, {})
      })

      //match rating types and grades
      const regex = /(?:class='rate)(\w+)(?:'>)(.+?)(?:<)/g
      let matches = []

      //replace ratings in jsonData with parsed ratings
      Object.keys(jsonData).forEach((index) => {
        let ratings = []
        while (matches = regex.exec(jsonData[index].Rating)) {
        let rating = {'type': matches[1], 'grade': matches[2]}
        ratings.push(rating)
        }
        if (ratings.length > 0) {
          jsonData[index].Rating = ratings
        } else {
          jsonData[index].Rating = [{
            'type': 'Ice/Mixed',
            'grade': jsonData[index].Rating
          }]
        }
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
