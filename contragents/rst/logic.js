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
      case 'rst':
        text = 'Выберите материалы RST';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'rst.info' }],
              [{ text: 'Logo', callback_data: 'rst.logo' }],
              [{ text: 'Blanks', callback_data: 'rst.blanks' }],
              [{ text: 'Profiles', callback_data: 'rst.profiles' }],
              [{ text: 'Presentations', callback_data: 'rst.presentations' }],
              [{ text: 'Materials', callback_data: 'rst.materials' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'rst.info':
        text = data.rst.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'rst.logo':
        text = data.rst.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'rst.blanks':
        text = data.rst.blanks.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'rst.profiles':
        text = data.rst.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'rst.presentations':
        text = data.rst.presentations.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'rst.materials':
        text = data.rst.materials.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
