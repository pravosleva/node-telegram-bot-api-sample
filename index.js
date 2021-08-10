const TelegramBot = require('node-telegram-bot-api')
const path = require('path')
// const axios = require('axios')

require('dotenv').config({ path: path.join(__dirname, './.prod.env') })
const abSort = (a, b) => a.localeCompare(b)

// CONTRAGENTS:
const gksLogic = require('./contragents/gcs/logic')
// Others...

const usersMap = new Map()

// replace the value below with the Telegram token you receive from @BotFather
const {
  TG_BOT_TOKEN,
  DEVELOPER_NAME,
  DEVELOPER_CHAT_ID,
} = process.env

let hasDevSupport = false
if (!Number.isNaN(Number(DEVELOPER_CHAT_ID)) && !!DEVELOPER_CHAT_ID) hasDevSupport = true // throw new Error('Check process.env.DEVELOPER_CHAT_ID')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true })

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp)
})

bot.onText(/(baza|gcs)/, function(msg) {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'ГКС', callback_data: 'gcs' }],
        // [{ text: 'Триафлай', callback_data: 'triafly' }],
        // [{ text: 'ДС', callback_data: 'ds' }]
      ]
    })
  };
  usersMap.set(msg.chat.username, msg.chat)
  bot.sendMessage(msg.chat.id, "Добрый день, выберите компанию", options);
})
gksLogic(bot)

bot.onText(/\/total/, function(msg) {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Users counter', callback_data: 'total-users-counter' }],
        [{ text: 'User names', callback_data: 'total-user-names' }],
      ]
    })
  };
  bot.sendMessage(msg.chat.id, "А?", options);
})
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;

  switch (action) {
    case 'total-users-counter':
      bot.sendMessage(msg.chat.id, String(usersMap.size));
      return
    case 'total-user-names':
      if (usersMap.size > 0) {
        // const names = [...usersMap.keys()]
        const result = []
        for (let [userName, chatData] of usersMap) {
          result.push(`@${userName}, ${chatData.id}`)
        }
        
        bot.sendMessage(msg.chat.id, result.sort(abSort).join('\n'));
      } else {
        bot.sendMessage(msg.chat.id, 'No users yet');
      }
      return
    default:
      return
  }
})

bot.onText(/\/get_chat (.+)/, function(msg, match) {
  const userName = match[1]
  const chatData = usersMap.get(userName)
  if (!!chatData) {
    bot.sendMessage(msg.chat.id, JSON.stringify(chatData, null, 2));
  } else {
    bot.sendMessage(msg.chat.id, 'Not found');
  }
})

if (hasDevSupport) {
  // Matches "/wtf [whatever]"
  bot.onText(/\/wtf (.+)/, function (msg, match) {
    const senderChatId = msg.chat.id
    const message = match[1] // the captured "whatever"

    // const res = await axios.get(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?text=${msg}&chat_id=${DEVELOPER_CHAT_ID}`)

    bot.sendMessage(Number(DEVELOPER_CHAT_ID), `New Entry from @${msg.chat.username}:` + '\n\n' + message)
    bot.sendMessage(senderChatId, `Ok ${msg.chat.first_name}, your msg sent to ${DEVELOPER_NAME}`)
  })
}

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', function (msg) {
//   const chatId = msg.chat.id

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message")
// })
