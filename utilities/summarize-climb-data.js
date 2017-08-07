const climbs = require(`../src/data/climbs.json`)

const climbCountByGrade = climbs.reduce((out, c) => {
  c.Rating.map((ratings) => {
    out.sum[ratings.type] = out.sum[ratings.type] || {}
    out.sum[ratings.type][ratings.grade] = (out.sum[ratings.type][ratings.grade] || 0) + 1
  })
  return out
},
{'sum': {}})

//map ewbanks to yds? to order climbs... or just make an ordering table

console.log(climbCountByGrade)


