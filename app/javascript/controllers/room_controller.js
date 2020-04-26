import ApplicationController from './application_controller'
import consumer from "../channels/consumer"


export default class extends ApplicationController {
  static targets = ['character']

  processData(data) {
    const character = this.characterTargets.find((char)=> {
      return char.dataset.name === data.character
    })
    if (character) {
      character.innerText = data.amp.toString()
    }
  }

  connect() {
    super.connect();
    let $this = this;
    this.subscription = consumer.subscriptions.create(
      { channel: "RoomsChannel", code: this.data.get('roomCode') }, {
      connected() {
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        $this.processData(data)
      }
    });
    this.pingInterval = setInterval(()=> { this.ping() }, 5000)
  }

  disconnect() {
    clearInterval(this.pingInterval)
  }

  ping() {
    this.subscription.send({
      character_id:  this.data.get('characterId')
    })
  }
}
