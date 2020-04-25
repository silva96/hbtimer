import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'amp', 'hp', 'mp']

  disconnect() {
    this.clearIntervals()
  }

  amped() {
    clearInterval(this.ampTimer)
    let secondsLeft = 60
    this.ampTarget.innerText = secondsLeft.toString()
    this.ampTimer = setInterval(()=>{
      secondsLeft -= 1
      this.ampTarget.innerText = secondsLeft.toString()
      if (secondsLeft < 0) {
        clearInterval(this.ampTimer)
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
}
