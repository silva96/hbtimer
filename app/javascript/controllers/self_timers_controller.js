import ApplicationController from './application_controller'

export default class extends ApplicationController {
  static targets = [ 'amp', 'hp', 'mp']

  disconnect() {
    this.clearIntervals()
  }

  connect() {
    super.connect();
    this.reflectAmp()
  }

  reflectAmp() {
    const secondsLeft = parseInt(this.ampTarget.innerText)
    Number.isNaN(secondsLeft) ? this.amped(-1) : this.amped(secondsLeft)
  }

  amped(secondsLeft) {
    clearInterval(this.ampTimer)
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
      if (secondsLeft < 0) {
        this.ampTarget.innerText = '--'
      }
    }, 1000)
  }

  hpRegen() {
    clearInterval(this.hpRegenTimer)
    let secondsLeft = 15
    this.hpTarget.innerText = secondsLeft.toString()
    this.hpRegenTimer = setInterval(()=>{
      secondsLeft -= 1
      this.hpTarget.innerText = secondsLeft.toString()
      if (secondsLeft < 1) {
        secondsLeft = 15
      }
    }, 1000)
  }

  mpRegen() {
    clearInterval(this.mpRegenTimer)
    let secondsLeft = 20
    this.mpTarget.innerText = secondsLeft.toString()
    this.mpRegenTimer = setInterval(()=>{
      secondsLeft -= 1
      this.mpTarget.innerText = secondsLeft.toString()
      if (secondsLeft < 1) {
        secondsLeft = 20
      }
    }, 1000)
  }


  clearIntervals() {
    if (this.ampTimer) {
      clearInterval(this.ampTimer)
    }
    if (this.hpRegenTimer) {
      clearInterval(this.hpRegenTimer)
    }
    if (this.mpRegenTimer) {
      clearInterval(this.mpRegenTimer)
    }
  }

  afterReflex(element, reflex) {
    super.afterReflex(element, reflex);
    this.reflectAmp()
  }
}
