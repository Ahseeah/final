const API_URL = 'https://sdg-astro-api.herokuapp.com/api/'
let launches = []
let launchIndex = 0
let missionName = document.getElementById('mission-name')
let missionInfo = document.getElementById('mission-info')
let loc = document.getElementById('loc')
let counter = document.getElementById('counter')
const pageLoad = () => {
  getLaunchInfo()
  getHeroImage()
}
const getHeroImage = () => {
  fetch(`${API_URL}Nasa/apod`)
    .then(response => response.json())
    .then(response => updateHeroImage(response))
}
const updateHeroImage = response => {
  const heroImage = document.querySelector('.hero-image')
  heroImage.style.backgroundImage = `url(${response.url})`
  const imageTitle = document.querySelector('.image-title')
  imageTitle.innerHTML = response.title
  const copyright = document.querySelector('.copyright')
  if (response.copyright === null) {
    copyright.innerHTML = 'no copyright'
  } else {
    copyright.innerHTML = response.copyright
  }
}
const getLaunchInfo = () => {
  fetch(`${API_URL}spacex/launches/upcoming`)
    .then(response => response.json())
    .then(response => updateLaunches(response))
}
const updateLaunches = response => {
  launches = response
}
//page load, create index at 0
// display launch at 0 to the document
//left button
// when the left button is clicked
// check if index > 0
// - 1 from index if it is
// else set to launch.length -1
// then we update the document
const leftBtnClick = () => {
  if (launchIndex > 0) {
    launchIndex--
  } else {
    launchIndex = launches.length - 1
  }
  console.log(launchIndex)
  updatePage()
}
const rightBtnClick = () => {
  if (launchIndex < launches.length - 1) {
    launchIndex++
  } else {
    launchIndex = 0
  }
  console.log(launchIndex)
  updatePage()
}
//right button
// when the right button is clicked
// check if index < launch.length - 1
//  index + 1
// else set to 0
// then we update the document
const updatePage = () => {
  console.log(launches[launchIndex])
}
document
  .getElementById('left-arrow-btn')
  .addEventListener('click', leftBtnClick)
document
  .getElementById('right-arrow-btn')
  .addEventListener('click', rightBtnClick)
window.addEventListener('load', pageLoad)
