const data = require('./data.json')

const abSort = (a, b) => a.localeCompare(b);

module.exports = (bot) => {
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
      case 'ensys':
        text = 'Выберите материалы Ensys';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'ensys.info' }],
              [{ text: 'Logo', callback_data: 'ensys.logo' }],
              [{ text: 'Blanks', callback_data: 'ensys.blanks' }],
              [{ text: 'Presentations', callback_data: 'ensys.presentations' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'ensys.info':
        text = data.ensys.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ensys.logo':
        text = data.ensys.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ensys.blanks':
        text = data.ensys.blanks.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ensys.presentations':
        text = data.ensys.presentations.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}