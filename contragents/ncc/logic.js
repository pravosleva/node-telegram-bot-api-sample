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
      case 'ncc':
        text = 'Выберите материалы Tops BI';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'ncc.info' }],
              [{ text: 'Logo', callback_data: 'ncc.logo' }],
              [{ text: 'Blanks', callback_data: 'ncc.blanks' }],
              [{ text: 'Profiles', callback_data: 'ncc.profiles' }],
              [{ text: 'Presentations', callback_data: 'ncc.presentations' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'ncc.info':
        text = data.ncc.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ncc.logo':
        text = data.ncc.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ncc.blanks':
        text = data.ncc.blanks.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ncc.profiles':
        text = data.ncc.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'ncc.presentations':
        text = data.ncc.presentations.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
