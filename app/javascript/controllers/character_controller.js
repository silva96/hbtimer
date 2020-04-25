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
    this.paintClass(secondsLeft)
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
}
