const API_URL = 'https://sdg-astro-api.herokuapp.com/api/'
let launches = []
const leftBtnClick = () => {
  console.log('left btn clicked')
  pageLoad()
}
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
  console.log(response)
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
    .then(response => {
      launches = response
    })
}
//left button
document
  .getElementById('left-arrow-btn')
  .addEventListener('click', leftBtnClick)
window.addEventListener('load', pageLoad)
//right button
