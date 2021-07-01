var TelegramBot = require('node-telegram-bot-api');

const path = require('path')

require('dotenv').config({ path: path.join(__dirname, './.prod.env') })

const data = require('./data/main.json')

// replace the value below with the Telegram token you receive from @BotFather
var token = process.env.TG_BOT_TOKEN;

console.log(token)

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  console.log(msg)
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/baza/, function(msg) {
  console.log(msg)

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
  let text = 'Sorry, in progress...';
  let options
  switch(action) {
    case 'gcs':
      text = 'Какие файлы вас интересуют?';
      options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Презентации', callback_data: 'gcs.pres' }],
            [{ text: 'Логотипы', callback_data: 'gcs.logo' }],
            [{ text: 'Маркетинговые материалы', callback_data: 'gcs.marketing' }],
            [{ text: 'Видеоролики', callback_data: 'gcs.video' }]
          ]
        })
      };
      bot.sendMessage(msg.chat.id, text, options);
      return
    case 'gcs.logo':
      text = 'В каком формате интересуют логотипы?';
      options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'PNG', callback_data: 'gcs.logo.png' }],
            [{ text: 'JPG', callback_data: 'gcs.logo.jpg' }]
          ]
        })
      };
      bot.sendMessage(msg.chat.id, text, options);
      return
    case 'gcs.logo.png':
      text = data.gcs.logo.png.join('\n');
      bot.sendMessage(msg.chat.id, text);
      return
    default:
      bot.editMessageText(text, userOpts)
      return
  }
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
