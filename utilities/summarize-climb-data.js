const fs = require(`fs`)
const path = require(`path`)
const _ = require(`lodash`)

const file = path.resolve(`../src/data/climb-summary.json`)
const climbs = require(`../src/data/climbs.json`)

const group5easy = ['Easy 5th', '4th', '3rd']
const group54   = ['5.4-', '5.4+', '5.4']
const group55   = ['5.5-', '5.5+', '5.5']
const group56   = ['5.6-', '5.6+', '5.6']
const group57   = ['5.7-', '5.7+', '5.7']
const group58   = ['5.8-', '5.8+', '5.8']
const group59   = ['5.9-', '5.9+', '5.9']
const group510 = ['5.10', '5.10a', '5.10b', '5.10-', '5.10a/b', '5.10b/c', '5.10c/d', '5.10+', '5.10c', '5.10d'] 
const group511 = ['5.11', '5.11a', '5.11b', '5.11-', '5.11a/b', '5.11b/c', '5.11c/d', '5.11+', '5.11c', '5.11d'] 
const group512 = ['5.12', '5.12a', '5.12b', '5.12-', '5.12a/b', '5.12b/c', '5.12c/d', '5.12+', '5.12c', '5.12d'] 

const climbGroups = [group5easy, group54, group55, group56, group57, group58, group59, group510, group511, group512]

const allGrades = ['Easy 5th', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '5.12']

const climbCountByYear = climbs.reduce((out, c) => {
  let year = c.Date.substr(0,4)
  let month = c.Date.substr(5,2)
  out[year] = out[year] || {}
  //out[year][month] = out[year][month]

  let grade = c.Rating[0].YDS

  function groupGrades(group, grade, name) {
    if (_.includes(group, grade)) {
    out[year][name] = (out[year][name] || 0) + 1
    }
  }

  out[year] = out[year] || {}
  
  climbGroups.forEach((group, i) => {
    groupGrades(group, grade, allGrades[i])
  })
  
  return out
},
{})

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