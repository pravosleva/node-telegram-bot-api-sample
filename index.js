const TelegramBot = require('node-telegram-bot-api');
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, './.prod.env') })

const data = require('./data/main.json')
const { config } = require('./data/config.js')
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TG_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  console.log(msg)
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/baza/, function(msg) {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'ГКС', callback_data: 'gcs' }],
        [{ text: 'Триафлай', callback_data: 'triafly' }],
        [{ text: 'ДС', callback_data: 'ds' }]
      ]
    })
  };
  bot.sendMessage(msg.chat.id, "Добрый день, выберите файлы которые вас интересуют.", options);
})

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const userOpts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  const text = !!config[action] ? config[action].text : config['default'].text
  const options = !!config[action] ? config[action].options : config['default'].options
  const cb = !!config[action] ? config[action].cb : config['default'].cb

  switch(action) {
    case 'gcs':
      cb(bot, [msg.chat.id, text, options]);
      return
    case 'gcs.logo':
      cb(bot, [msg.chat.id, text, options]);
      return
    case 'gcs.logo.png':
      cb(bot, [msg.chat.id, data.gcs.logo.png.join('\n')]);
      return
    default:
      cb(bot, [`No action for ${action}`, userOpts])
      return
  }
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
