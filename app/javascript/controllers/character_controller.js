import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static targets = [ 'amp', 'name']

  connect() {
    super.connect();
    this.reflectAmp()
  }

  reflectAmp() {
    const secondsLeft = parseInt(this.ampTarget.innerText)
    Number.isNaN(secondsLeft) ? this.amped(-1) : this.amped(secondsLeft)
  }

  disconnect() {
    this.clearIntervals()
  }

  amped(secondsLeft) {
    this.clearIntervals()
    this.paintClass(secondsLeft)
    if (secondsLeft < 0 || Number.isNaN(secondsLeft)) {
      this.ampTarget.innerText = '--'
    }
    else {
      this.ampTarget.innerText = secondsLeft.toString()
    }
    this.ampTimer = setInterval(()=>{
      secondsLeft = parseInt(this.ampTarget.innerText)
      if (Number.isNaN(secondsLeft)) { return }
      secondsLeft -= 1
      this.ampTarget.innerText = secondsLeft.toString()
      this.paintClass(secondsLeft)
      if (secondsLeft < 0) {
        this.ampTarget.innerText = '--'
      }
    }, 1000)
  }

  paintClass(secondsLeft) {
    const time = this.ampTarget.closest('.time')
    time.classList.remove('has-text-success', 'has-text-danger', 'has-text-warning')
    if(secondsLeft < 5) {
      time.classList.add('has-text-danger')
    } else if (secondsLeft < 15) {
      time.classList.add('has-text-warning')
    }
    else {
      time.classList.add('has-text-success')
    }
  }

  clearIntervals() {
    if (this.ampTimer) {
      clearInterval(this.ampTimer)
    }
  }

  afterReflex(element, reflex) {
    super.afterReflex(element, reflex);
    this.reflectAmp()
  }
}
