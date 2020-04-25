import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'amp', 'name']

  connect() {
    let secondsLeft = parseInt(this.ampTarget.innerText)
    secondsLeft = Number.isNaN(secondsLeft) ? -1 : secondsLeft
    this.amped(secondsLeft)
  }

  disconnect() {
    this.clearIntervals()
  }

  ampedEvent() {
    this.amped(60)
  }

  cancel() {
    this.amped(-1)
  }

  amped(secondsLeft) {
    clearInterval(this.ampTimer)
    if (secondsLeft < 0) {
      this.ampTarget.innerText = '--'
    }
    else {
      this.ampTarget.innerText = secondsLeft.toString()
    }
    this.ampTimer = setInterval(()=>{
      secondsLeft -= 1
      this.ampTarget.innerText = secondsLeft.toString()
      if (secondsLeft < 0) {
        clearInterval(this.ampTimer)
        this.ampTarget.innerText = '--'
      }
    }, 1000)
  }

  clearIntervals() {
    if (this.ampTimer) {
      clearInterval(this.ampTimer)
    }
  }
}
