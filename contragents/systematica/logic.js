const data = require('./data.json')

const abSort = (a, b) => a.localeCompare(b);

module.exports = (bot) => {
  // Handle callback queries
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    let text = 'Sorry, in progress...';
    let options
    switch(action) {
      case 'systematica':
        text = 'Выберите материалы Systematica';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'systematica.info' }],
              [{ text: 'Logo', callback_data: 'systematica.logo' }],
              [{ text: 'Blanks', callback_data: 'systematica.blanks' }],
              [{ text: 'Profiles', callback_data: 'systematica.profiles' }],
              [{ text: 'Presentations', callback_data: 'systematica.presentations' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'systematica.info':
        text = data.systematica.info.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica.logo':
        text = data.systematica.logo.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica.blanks':
        text = data.systematica.blanks.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica.profiles':
        text = data.systematica.profiles.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica.presentations':
        text = data.systematica.presentations.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        return
    }
  });
}
