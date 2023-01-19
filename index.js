const Mustache = require('mustache')
const fs = require('fs')
const MUSTACHE_MAIN_DIR = './main.mustache'
const thisYear = new Date().getFullYear()
const startTimeOfThisYear = new Date(
  `${thisYear}-01-01T00:00:00+00:00`
).getTime()
const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
const progressOfThisYear =
  (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)
const progressBarOfThisYear = generateProgressBar()
/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
  name: 'Jay',
  profession: 'Web3 Engineer',
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Madrid',
  }),
  yearProgress: `${progressBarOfThisYear} ${(progressOfThisYear * 100).toFixed(
    0
  )}`,
}

function generateProgressBar() {
  const progressBarCapacity = 30
  const passedProgressBarIndex = parseInt(
    progressOfThisYear * progressBarCapacity
  )
  const progressBar =
    '█'.repeat(passedProgressBarIndex) +
    '▁'.repeat(progressBarCapacity - passedProgressBarIndex)
  return `{ ${progressBar} }`
}

function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err
    const output = Mustache.render(data.toString(), DATA)
    fs.writeFileSync('README.md', output)
  })
}
generateReadMe()

// const readme = `\
// ### Hi there 👋
// ⏳ Year progress ${progressBarOfThisYear} ${(progressOfThisYear * 100).toFixed(
//   0
// )} %
// ---
// ⏰ Updated on ${new Date().toUTCString()}
// ![Progress Bar CI](https://github.com/jaymgonzalez/jaymgonzalez/workflows/Progress%20Bar%20CI/badge.svg)\
// `

// console.log(readme)
