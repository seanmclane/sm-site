const fs = require(`fs`)
const path = require(`path`)
const _ = require(`lodash`)

const file = path.resolve(`../src/data/climb-summary.json`)
const climbs = require(`../src/data/climbs.json`)

// rock grades
const group5easy = ['Easy 5th', '4th', '3rd']
const group54 = ['5.4-', '5.4+', '5.4']
const group55 = ['5.5-', '5.5+', '5.5']
const group56 = ['5.6-', '5.6+', '5.6']
const group57 = ['5.7-', '5.7+', '5.7']
const group58 = ['5.8-', '5.8+', '5.8']
const group59 = ['5.9-', '5.9+', '5.9']
const group510 = ['5.10', '5.10a', '5.10b', '5.10-', '5.10a/b', '5.10b/c', '5.10c/d', '5.10+', '5.10c', '5.10d']
const group511 = ['5.11', '5.11a', '5.11b', '5.11-', '5.11a/b', '5.11b/c', '5.11c/d', '5.11+', '5.11c', '5.11d']
const group512 = ['5.12', '5.12a', '5.12b', '5.12-', '5.12a/b', '5.12b/c', '5.12c/d', '5.12+', '5.12c', '5.12d']

// ice grades
const groupWI1 = ['WI1', 'WI1-', 'WI1+', 'AI1', 'AI1-', 'AI1+']
const groupWI2 = ['WI2', 'WI2-', 'WI2+', 'AI2', 'AI2-', 'AI2+']
const groupWI3 = ['WI3', 'WI3-', 'WI3+', 'AI3', 'AI3-', 'AI3+']
const groupWI4 = ['WI4', 'WI4-', 'WI4+', 'AI4', 'AI4-', 'AI4+']
const groupWI5 = ['WI5', 'WI5-', 'WI5+', 'AI5', 'AI5-', 'AI5+']
const groupWI6 = ['WI6', 'WI6-', 'WI6+', 'AI6', 'AI6-', 'AI6+']
const groupWI7 = ['WI7', 'WI7-', 'WI7+', 'AI7', 'AI7-', 'AI7+']

// mixed grades
const groupM1 = ['M1', 'M1-', 'M1+']
const groupM2 = ['M2', 'M2-', 'M2+']
const groupM3 = ['M3', 'M3-', 'M3+']
const groupM4 = ['M4', 'M4-', 'M4+']
const groupM5 = ['M5', 'M5-', 'M5+']
const groupM6 = ['M6', 'M6-', 'M6+']
const groupM7 = ['M7', 'M7-', 'M7+']
const groupM8 = ['M8', 'M8-', 'M8+']
const groupM9 = ['M9', 'M9-', 'M9+']
const groupM10 = ['M10', 'M10-', 'M10+']
const groupM11 = ['M11', 'M11-', 'M11+']
const groupM12 = ['M12', 'M12-', 'M12+']
const groupM13 = ['M13', 'M13-', 'M13+']
const groupM14 = ['M14', 'M14-', 'M14+']
const groupM15 = ['M15', 'M15-', 'M15+']

const climbGroups = [
  group5easy, group54, group55, group56, group57, group58, group59, group510, group511, group512,
  groupWI1, groupWI2, groupWI3, groupWI4, groupWI5, groupWI6, groupWI7,
  groupM1, groupM2, groupM3, groupM4, groupM5, groupM6, groupM7, groupM8, groupM9, groupM10, groupM11, groupM12, groupM13, groupM14, groupM15
]

const allGrades = [
  'Easy 5th', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '5.12',
  'WI1', 'WI2', 'WI3', 'WI4', 'WI5', 'WI6', 'WI7',
  'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15'
]

function countClimbsByYear (climbs, matcher) {
  return climbs.reduce((out, c) => {
    let year = c.Date.substr(0, 4)
    // let month = c.Date.substr(5,2)
    out[year] = out[year] || {}
    //out[year][month] = out[year][month]

    let g = c.Rating.match(matcher)

    let grade = ''
    if (g != null) {
      grade = g[0]
    }

    function groupGrades (group, grade, name) {
      if (_.includes(group, grade)) {
        out[year][name] = (out[year][name] || 0) + Number(c.Pitches)
      }
    }

    out[year] = out[year] || {}

    climbGroups.forEach((group, i) => {
      groupGrades(group, grade, allGrades[i])
    })

    return out
  },
    {})
}

rockClimbCountByYear = countClimbsByYear(climbs, /\d\.\d+\S?/g)
iceClimbCountByYear = countClimbsByYear(climbs, /WI\d\S?|AI\d\S?/g)
mixedClimbCountByYear = countClimbsByYear(climbs, /M\d\S?/g)

function makeClimbSummaryArray (climbCount) {
  let t = {}
  allGrades.forEach((grade) => {
    Object.keys(climbCount).forEach((year, i) => {
      t[grade] = t[grade] || []
      t[grade][i] = { 'year': year, 'count': climbCount[year][grade] || 0 }
    })
  })
  return t
}

let t = {
  rock: makeClimbSummaryArray(rockClimbCountByYear),
  ice: makeClimbSummaryArray(iceClimbCountByYear),
  mixed: makeClimbSummaryArray(mixedClimbCountByYear)
}

// new summary format = {rock: [{year: 2012, count: 150}], ice: [], mixed: []}
const json = JSON.stringify(t)
fs.writeFile(file, json, (e) => {
  if (e) throw e
})