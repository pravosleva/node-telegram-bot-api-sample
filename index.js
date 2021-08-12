const TelegramBot = require('node-telegram-bot-api')
const path = require('path')
const axios = require('axios')
const { Base64 } = require('js-base64')

require('dotenv').config({ path: path.join(__dirname, './.prod.env') })
const abSort = (a, b) => a.localeCompare(b)

// const getGreeting = () => {
//   const data = [
//     [0, 4, "Доброй ночи"], 
//     [5, 11, "Доброе утро"],          //Store messages in an array
//     [12, 17, "Добрый день"],
//     [18, 24, "Добрый вечер"]
//   ];
//   const hrs = new Date().getHours();
//   let result = data[1][2];

//   for (let i = 0, max = data.length; i < max; i++) {
//     if (hrs >= data[i][0] && hr <= data[i][1]) result = data[i][2];
//   }
//   return result;
// }

// CONTRAGENTS:
const gksLogic = require('./contragents/gcs/logic')
const systematicaLogic = require('./contragents/systematica/logic')
const slLogic = require('./contragents/step_logic/logic')
const hpLogic = require('./contragents/haed_point/logic')
const landataLogic = require('./contragents/landata/logic')
const ensysLogic = require('./contragents/ensys/logic')
const rstLogic = require('./contragents/rst/logic')
const scLogic = require('./contragents/systematica_consulting/logic');
const dsLogic = require('./contragents/doverennay_sreda/logic');
const topsBILogic = require('./contragents/tops_bi/logic');
const lanmaxLogic = require('./contragents/lanmax/logic');
const systematica_belLogic = require('./contragents/systematica_bel/logic');
const nccLogic = require('./contragents/ncc/logic');
const aquariusLogic = require('./contragents/aquarius/logic');
const national_platformLogic = require('./contragents/national_platform/logic');
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
        [{ text: 'Systematica', callback_data: 'systematica' }, { text: 'STEP LOGIC', callback_data: 'step_logic' }],
        [{ text: 'HaedPoint', callback_data: 'haed_point' }, { text: 'Landata', callback_data: 'landata' }],
        [{ text: 'Ensys', callback_data: 'ensys' }, { text: 'Systematica Consulting', callback_data: 'systematica_consulting' }],
        [{ text: 'Doverennay_sreda', callback_data: 'doverennay_sreda' }, { text: 'Tops BI', callback_data: 'tops_bi' }],
        [{ text: 'Lanmax', callback_data: 'lanmax' }, { text: 'SystematicaBel', callback_data: 'systematica_bel' }],
        [{ text: 'NCC', callback_data: 'ncc' }, { text: 'AQUARIUS', callback_data: 'aquarius' }],
        [{ text: 'National_platform', callback_data: 'national_platform' }],
      ],
    })
  };
  usersMap.set(msg.chat.username, msg.chat)
  axios.post(Base64.decode('aHR0cDovL3ByYXZvc2xldmEucnUvZXhwcmVzcy1oZWxwZXIvZ2NzL2FkZC11c2Vy'), {
    userName: msg.chat.username,
    chatData: msg.chat,
  })
  bot.sendMessage(msg.chat.id, 'Добрый день, выберите компанию', options);
})
gksLogic(bot)
systematicaLogic(bot)
slLogic(bot)
hpLogic(bot)
landataLogic(bot)
ensysLogic(bot)
rstLogic(bot)
scLogic(bot)
dsLogic(bot)
topsBILogic(bot)
lanmaxLogic(bot)
systematica_belLogic(bot)
nccLogic(bot)
aquariusLogic(bot)
national_platformLogic(bot)

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
      bot.sendMessage(msg.chat.id, `${usersMap.size} пользователей (с момента последней перезагрузки бота)`);
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
        bot.sendMessage(msg.chat.id, '__No users yet__', { parse_mode: "Markdown" });
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

bot.onText(/\/location/, (msg) => {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Location', request_location: true }],
        [{ text: 'Contact', request_contact: true }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
});
bot.on('location', (msg) => {
  console.log(msg.location.latitude);
  console.log(msg.location.longitude);
  axios.post(Base64.decode('aHR0cDovL3ByYXZvc2xldmEucnUvZXhwcmVzcy1oZWxwZXIvZ2NzL2FkZC11c2Vy'), {
    userName: msg.chat.username,
    chatData: { ...msg.chat, location: msg.location },
  })
});

if (hasDevSupport) {
  // Matches "/wtf [whatever]"
  bot.onText(/\/wtf (.+)/, function (msg, match) {
    const senderChatId = msg.chat.id
    const message = match[1] // the captured "whatever"

    // const res = await axios.get(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?text=${msg}&chat_id=${DEVELOPER_CHAT_ID}`)

    bot.sendMessage(Number(DEVELOPER_CHAT_ID), `ℹ️ **New Entry** from @${msg.chat.username}:` + '\n' + message, { parse_mode: "Markdown" })
    bot.sendMessage(senderChatId, `✅ Ok ${msg.chat.first_name}. __Your msg sent to ${DEVELOPER_NAME}__`, { parse_mode: "Markdown" })
  })
}

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', function (msg) {
//   const chatId = msg.chat.id

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message")
// })
