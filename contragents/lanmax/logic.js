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
      case 'lanmax':
        text = 'Выберите материалы Tops BI';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'lanmax.info' }],
              [{ text: 'Logo', callback_data: 'lanmax.logo' }],
              [{ text: 'Profiles', callback_data: 'lanmax.profiles' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'lanmax.info':
        text = data.lanmax.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'lanmax.logo':
        text = data.lanmax.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'lanmax.profiles':
        text = data.lanmax.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
