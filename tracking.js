let canTracking, iris, eyeBall;
window.onload = () => {
  setTimeout(() => {
    canTracking = true
    Lightbulbs.matter()
  }, 6000)
  iris = document.querySelector('.iris')
  eyeBall = document.querySelector('.ball')
  const container = document.body
  const containerPos = container.getBoundingClientRect()

  let posX = 0
  let posY = 0
  let previousX = 0
  let previousY = 0

  container.onmousemove = (e) => {
    iris.style.transition = 'transform 0.1s ease-out'
    previousX = posX
    previousY = posY
    posX = e.clientX
    posY = e.clientY

    if (canTracking) {
      const posBall = eyeBall.getBoundingClientRect()
      const x = e.clientX - posBall.x - (eyeBall.clientWidth / 2)
      const y = e.clientY - posBall.y - (eyeBall.clientHeight / 2)
      const rapportX = Math.abs(x / (posBall.x - containerPos.x + (eyeBall.clientWidth / 2)))
      const rapportY = Math.abs(y / (posBall.y - containerPos.y + (eyeBall.clientHeight / 2)))
      // const rapportX = Math.abs(x / (posBall.x + (eyeBall.clientWidth / 2)))
      // const rapportY = Math.abs(y / (posBall.y + (eyeBall.clientHeight / 2)))
      const isVertical = Math.abs(posY-previousY) < Math.abs(posX-previousX)
      // console.log(rapportX, rapportY)

      if (x < 0 && y < 0) { // coin supérieur gauche
        iris.style.transform =
          `translateX(-${68*rapportX}px) translateY(-${60*rapportY}px) skewX(-${15 * (isVertical ? rapportX : rapportY)}deg) skewY(${2*rapportY}deg)`
      } else if (x > 0 && y < 0) { // coin supérieur droite
        iris.style.transform =
          `translateX(${68*rapportX}px) translateY(-${60*rapportY}px) skewX(${15* (isVertical ? rapportX : rapportY)}deg) skewY(${2*rapportY}deg)`
      } else if (x < 0 && y > 0) { // coin inférieur gauche
        iris.style.transform =
          `translateX(-${68*rapportX}px) translateY(${60*rapportY}px) skewX(${15* (isVertical ? rapportX : rapportY)}deg) skewY(-${2*rapportY}deg) scale(0.95)`
      } else if (x > 0 && y > 0) { // coin inférieur droite
        iris.style.transform =
          `translateX(${68*rapportX}px) translateY(${60*rapportY}px) skewX(-${15* (isVertical ? rapportX : rapportY)}deg) skewY(-${2*rapportY}deg) scale(0.95)`
      }
    }
  }

  container.onmouseleave = () => {
    iris.style.transition = 'transform 0.3s ease-out'
    iris.style.transform = 'none'
  }
}
