const fs = require(`fs`)
const path = require(`path`)
const _ = require(`lodash`)

const file = path.resolve(`../src/data/climb-summary.json`)
const climbs = require(`../src/data/climbs.json`)

/*
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

const ydsOrder = climbs.reduce((out, c) => {
  //I know this is fragile
  if (c.Rating.length > 2) {
    out[(c.Rating[2].Ewbanks)] = c.Rating[0].YDS
  }
  return out
},
{})

const c = climbCountByGrade.YDS
const o = Object.values(ydsOrder)
let orderedClimbCountByGrade = []

o.forEach((grade) => {
  orderedClimbCountByGrade.push({'grade': grade, 'count': c[grade]})
})
*/


const climbCountByYear = climbs.reduce((out, c) => {
  let year = c.Date.substr(0,4)
  let month = c.Date.substr(5,2)
  out[year] = out[year] || {}
  //out[year][month] = out[year][month]

  let grade = c.Rating[0].YDS

  const group5   = ['5.4', '5.5', '5.6', '5.7', '5.8', '5.9']
  const group510 = ['5.10', '5.10a', '5.10b', '5.10-', '5.10a/b', '5.10b/c', '5.10c/d', '5.10+', '5.10c', '5.10d'] 
  const group511 = ['5.11', '5.11a', '5.11b', '5.11-', '5.11a/b', '5.11b/c', '5.11c/d', '5.11+', '5.11c', '5.11d'] 
  const group512 = ['5.12', '5.12a', '5.12b', '5.12-', '5.12a/b', '5.12b/c', '5.12c/d', '5.12+', '5.12c', '5.12d'] 
  
  out[year] = out[year] || {}
  
  group5.forEach((g) => {
    if (grade === g) {
      out[year][g] = (out[year][g] || 0) + 1
    }
  })
  if (_.includes(group510, grade)) {
    out[year]['5.10'] = (out[year]['5.10'] || 0) + 1
  }
  if (_.includes(group511, grade)) {
    out[year]['5.11'] = (out[year]['5.11'] || 0) + 1
  }
  if (_.includes(group512, grade)) {
    out[year]['5.12'] = (out[year]['5.12'] || 0) + 1
  }
  
  return out
},
{})

const allGrades = ['5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '5.12']

let t = {}
allGrades.forEach((grade) => {
  Object.keys(climbCountByYear).forEach((year, i) => {
    t[grade] = t[grade] || []
    t[grade][i] = {'year': year, 'count': climbCountByYear[year][grade] || 0}
  })
})

const json = JSON.stringify([t])
  fs.writeFile(file, json, (e) => {
    if (e) throw e
  })