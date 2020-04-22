// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'code', 'name' ]

  connect() {
    console.log('rooms_controller#connected')
  }

  join(event) {
    event.preventDefault()
    alert(this.name)
  }

  get name() {
    return this.nameTarget.value
  }

  get code() {
    return this.codeTarget.value
  }
}
