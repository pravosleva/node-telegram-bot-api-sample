const data = require('./data.json')

function abSort(a, b) {
  return a.localeCompare(b);
}

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
      case 'landata':
        text = 'Выберите материалы Landata';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'landata.info' }],
              [{ text: 'Logo', callback_data: 'landata.logo' }],
              [{ text: 'Blanks', callback_data: 'landata.blanks' }],
              [{ text: 'Profiles', callback_data: 'landata.profiles' }],
              [{ text: 'Presentations', callback_data: 'landata.presentations' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'landata.info':
        text = data.landata.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'landata.logo':
        text = data.landata.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'landata.blanks':
        text = data.landata.blanks.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'landata.profiles':
        text = data.landata.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'landata.presentations':
        text = data.landata.presentations.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
