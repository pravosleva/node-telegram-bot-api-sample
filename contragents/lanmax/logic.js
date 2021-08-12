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
        text = data.lanmax.info.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'lanmax.logo':
        text = data.lanmax.logo.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'lanmax.profiles':
        text = data.lanmax.profiles.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return

      default:
        return
    }
  });
}
