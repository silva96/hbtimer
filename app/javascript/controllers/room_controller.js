import ApplicationController from './application_controller'
import consumer from "../channels/consumer"


export default class extends ApplicationController {
  static targets = ['character', 'newCharacter']

  processData(data) {
    const character = this.characterTargets.find((char)=> {
      return char.dataset.name === data.character
    })
    if (character) {
      character.innerText = data.amp.toString()
    }
    else {
      this.stimulate('RoomReflex#repaint')
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
    this.pingInterval = setInterval(()=> { this.ping() }, 20000)
  }

  disconnect() {
    clearInterval(this.pingInterval)
  }

  ping() {
    this.subscription.send({
      character_id:  this.data.get('characterId')
    })
  }

  addFriend() {
    const data = {
      name: this.newCharacterTarget.value,
      room_id: this.data.get('roomId'),
      enemy: false
    }
    this.stimulate('RoomReflex#add', data)
  }

  addEnemy() {
    const data = {
      name: this.newCharacterTarget.value,
      room_id: this.data.get('roomId'),
      enemy: true
    }
    this.stimulate('RoomReflex#add', data)
  }
}
