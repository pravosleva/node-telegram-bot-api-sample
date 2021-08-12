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
      case 'national_platform':
        text = 'Выберите материалы Национальная плптформа';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'national_platform.info' }],
              [{ text: 'Logo', callback_data: 'national_platform.logo' }],
              [{ text: 'Blanks', callback_data: 'national_platform.blanks' }],
              [{ text: 'Profiles', callback_data: 'national_platform.profiles' }],
              [{ text: 'Presentations', callback_data: 'national_platform.presentations' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'national_platform.info':
        text = data.national_platform.info.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'national_platform.logo':
        text = data.national_platform.logo.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'national_platform.blanks':
        text = data.national_platform.blanks.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'national_platform.profiles':
        text = data.national_platform.profiles.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'national_platform.presentations':
        text = data.national_platform.presentations.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        return
    }
  });
}
