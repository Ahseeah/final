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
  let launch = launches[launchIndex]
  missionName.innerText = launch.mission_name
  //missionInfo.innerText = launches[launchIndex].details
  if (launch.details != null) {
    missionInfo.innerText = launch.details
  } else {
    missionInfo.innerText = 'No description available yet.'
  }
  loc.innerText = launch.launch_site.site_name_long
  countdown(launch.launch_date_local)
}

let interval

const countdown = endDate => {
  let days, hours, minutes, seconds

  endDate = new Date(endDate).getTime()

  if (isNaN(endDate)) {
    return
  }

  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(calculate, 1000)

  function calculate() {
    let startDate = new Date()
    startDate = startDate.getTime()

    let timeRemaining = parseInt((endDate - startDate) / 1000)
    console.log(startDate)

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400)
      timeRemaining = timeRemaining % 86400

      hours = parseInt(timeRemaining / 3600)
      timeRemaining = timeRemaining % 3600

      minutes = parseInt(timeRemaining / 60)
      timeRemaining = timeRemaining % 60

      seconds = parseInt(timeRemaining)
      // how to get this counter to show up
      // create an html tag in your html file (like h1, p, h3)
      // give it a class
      // then in your JS file (right below here)
      // you will call doc getby id then setting the innerhtml
      // set it to an interpolated string
      let countdownTimer = `${days} days, ${('0' + hours).slice(-2)} hours, ${(
        '0' + minutes
      ).slice(-2)} mins, ${('0' + seconds).slice(-2)} seconds`
      counter.innerText = countdownTimer
      // document.getElementById('days').innerHTML = parseInt(days, 10)
      // document.getElementById('hours').innerHTML = ('0' + hours).slice(-2)
      //document.getElementById('minutes').innerHTML = ('0' + minutes).slice(-2)
      //document.getElementById('seconds').innerHTML = ('0' + seconds).slice(-2)
    } else {
      return
    }
  }
}
document
  .getElementById('left-arrow-btn')
  .addEventListener('click', leftBtnClick)
document
  .getElementById('right-arrow-btn')
  .addEventListener('click', rightBtnClick)
window.addEventListener('load', pageLoad)
