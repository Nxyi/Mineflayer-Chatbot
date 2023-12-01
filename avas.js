import mineflayer from 'mineflayer'
import { sendToSocket } from './thread.js';

const bot = mineflayer.createBot({
  host: '<server-ip>',
  port: 25565,
  username: '<bot-name>',
  auth: '<auth-type>'
})

export{ bot }

main()

async function main(){

  let asking = false;
  bot.on('chat', async (username, message) => {
    console.log(message)
    if(username == bot.username) return
    if(!message.includes(bot.username)) return;

    if(asking) return
    asking = true;

    sendToSocket(message)

    asking = false;
  })

  bot.once('spawn', function () {
    setInterval(() => {
      const entity = bot.nearestEntity()
      if (entity !== null) {
        if (entity.type === 'player') {
          bot.lookAt(entity.position.offset(0, 1.6, 0))
        } else if (entity.type === 'mob') {
          bot.lookAt(entity.position)
        }
      }
    }, 50)
  })

  bot.on('kicked', (err)=>{
    console.log(err)
    main()
  })
  bot.on('error', (err)=>{
    console.log(err)
    main()
  })

}

