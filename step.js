let actualStep = 0, isRollback
const ball = document.querySelector('.ball')
const container = document.querySelector('.container')

ball.addEventListener('click', () => {
  if (isRollback || (!canTracking && actualStep === 0)) return
  // Bouncing effect
  ball.style.animation = 'bubble-anim 1s ease-in-out'
  setTimeout(() => {
    if(!isRollback) ball.style.animation = 'nothing 0s'
  }, 1000)
  if (isBlackout) return
  // Change state
  if (actualStep < 3) {
    container.classList.remove(`-step${actualStep}`)
    actualStep++;
    container.classList.add(`-step${actualStep}`)
  } else if (actualStep === 3) {
    container.classList.remove(`-step${actualStep}`)
    actualStep++;
    canTracking = false
    litBulb.render.visible = false
    iris.style.transform = ''
    container.classList.add('-green')
    document.body.style.background = 'var(--gradient-black)'
    setTimeout(rollback, 8000)
  }
})

function rollback() {
  isRollback = true
  ball.style.animation = 'rollback 5s cubic-bezier(0.65, 1.49, 0.76, 1.37)'
  setTimeout(() => {
    document.body.style.background = 'var(--gradient-white)'
    litBulb.render.visible = true
    container.classList.remove('-green')
    ball.style.animation = 'introEyes 5s cubic-bezier(0.65, 1.49, 0.76, 1.37)'
    setTimeout(() => {
      canTracking = true
      actualStep = 0
      isRollback = false
    }, 6000)
  }, 5000)
}
