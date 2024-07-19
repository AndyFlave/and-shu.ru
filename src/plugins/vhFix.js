export default ({ app }, inject) => {
  if (process.client) {
    const setVhProperty = () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVhProperty()

    window.addEventListener('resize', setVhProperty)
  }
}
