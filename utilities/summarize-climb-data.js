const climbs = require(`../src/data/climbs.json`)

const climbCountByGrade = climbs.reduce((out, c) => {
  c.Rating.map((rating) => {
   Object.keys(rating).forEach((key) => {
    out[key] = out[key] || {}
    out[key][rating[key]] = (out[key][rating[key]] || 0) + 1
   })
  })
  return out
},
{})

console.log(climbCountByGrade)

const ydsOrder = climbs.reduce((out, c) => {
  //I know this is fragile
  if (c.Rating.length > 2) {
    out[(c.Rating[2].Ewbanks)] = c.Rating[0].YDS
  }
  return out
},
{})

console.log(ydsOrder)
