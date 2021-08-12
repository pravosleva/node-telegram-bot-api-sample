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
      case 'systematica_consulting':
        text = 'Выберите материалы Систематика Консалтинг';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'systematica_consulting.info' }],
              [{ text: 'Logo', callback_data: 'systematica_consulting.logo' }],
              [{ text: 'Blanks', callback_data: 'systematica_consulting.blanks' }],
              [{ text: 'Profiles', callback_data: 'systematica_consulting.profiles' }],
              [{ text: 'Presentations', callback_data: 'systematica_consulting.presentations' }],
              [{ text: 'Materials', callback_data: 'systematica_consulting.materials' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'systematica_consulting.info':
        text = data.systematica_consulting.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica_consulting.logo':
        text = data.systematica_consulting.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica_consulting.blanks':
        text = data.systematica_consulting.blanks.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica_consulting.profiles':
        text = data.systematica_consulting.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica_consulting.presentations':
        text = 'Выберите презентации';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'General', callback_data: 'systematica_consulting.presentations.general' }],
              [{ text: 'Industry', callback_data: 'systematica_consulting.presentations.industry' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'systematica_consulting.presentations.general':
        text = data.systematica_consulting.presentations.general.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'systematica_consulting.presentations.industry':
        text = data.systematica_consulting.presentations.industry.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return

      case 'systematica_consulting.materials':
        text = data.systematica_consulting.materials.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        return
    }
  });
}
